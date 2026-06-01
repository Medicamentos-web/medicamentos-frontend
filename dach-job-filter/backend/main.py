"""DACH Job Filter API."""

from __future__ import annotations

import logging
import os
import time
from typing import Any

from fastapi import FastAPI, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from mock_data import MOCK_JOBS_RAW
from normalize import normalize_job
from providers.aggregate import fetch_all_raw_jobs
from providers.portals_catalog import KNOWN_PORTALS, LIVE_JSON_FEEDS
from providers.swiss_portals import CATEGORY_LABELS_ES, SWISS_PORTALS
from scoring import LANG_MAP, compute_match
from search_text import fold_ascii, parse_search_query, passes_text_filter

# IDs en query ?sources= — etiquetas en cada job normalizado (`source_portal`)
JSON_FEED_SOURCE_IDS: dict[str, str] = {
    "arbeitnow": "Arbeitnow",
    "remotive": "Remotive",
    "jobicy": "Jobicy",
    "himalayas": "Himalayas",
}

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

CACHE_TTL_SEC = 90
_cache_ts: float = 0.0
_cache_jobs: list[dict[str, Any]] = []

app = FastAPI(title="DACH Job Filter API", version="0.1.0")


def _cors_allow_origins() -> list[str]:
    """Local por defecto + URLs extra (p. ej. https://tu-app.vercel.app)."""
    defaults = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://[::1]:3000",
    ]
    raw = os.getenv("CORS_ORIGINS", "").strip()
    if not raw:
        return defaults
    extra = [o.strip() for o in raw.split(",") if o.strip()]
    # Sin duplicados, orden estable
    seen: set[str] = set()
    out: list[str] = []
    for o in defaults + extra:
        if o not in seen:
            seen.add(o)
            out.append(o)
    return out


app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_allow_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class JobOut(BaseModel):
    id: str
    company: str
    title: str
    region: str
    country: str
    work_model: str
    work_percentage: int | None = None
    category: str
    languages: list[str]
    apply_url: str
    source_portal: str = "Arbeitnow"
    match_score: int | None = None


class HealthOut(BaseModel):
    status: str
    source: str


def _normalize_all(raw_list: list[dict[str, Any]]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for raw in raw_list:
        job = normalize_job(raw)
        if job:
            out.append(job)
    return out


def load_jobs(force_refresh: bool = False) -> tuple[list[dict[str, Any]], str]:
    """Return (jobs, source_label). Uses cache unless stale or force_refresh."""
    global _cache_ts, _cache_jobs
    now = time.time()
    if not force_refresh and _cache_jobs and (now - _cache_ts) < CACHE_TTL_SEC:
        return _cache_jobs, "cache"

    raw: list[dict[str, Any]] = []
    source = "multi_feed"
    try:
        raw = fetch_all_raw_jobs(arbeitnow_pages=4)
        if not raw:
            raise ValueError("empty response")
    except Exception as exc:
        logger.warning("Using mock data: %s", exc)
        raw = list(MOCK_JOBS_RAW)
        source = "mock"

    jobs = _normalize_all(raw)
    if not jobs:
        logger.warning("No DACH jobs after normalize; using mock")
        jobs = _normalize_all(list(MOCK_JOBS_RAW))
        source = "mock"

    _cache_jobs = jobs
    _cache_ts = now
    return jobs, source


def _pct_bounds(band: str | None, pct_min: int | None, pct_max: int | None) -> tuple[int, int]:
    if band:
        parts = band.replace("%", "").split("-")
        if len(parts) == 2:
            return int(parts[0].strip()), int(parts[1].strip())
    if pct_min is not None and pct_max is not None:
        return pct_min, pct_max
    return 20, 100


def _source_labels_from_query(s: str | None) -> set[str] | None:
    """None = todas las fuentes. set() vacío = ninguna coincidencia en query."""
    if not s or not str(s).strip():
        return None
    labels: set[str] = set()
    for part in str(s).split(","):
        key = part.strip().lower()
        if key in JSON_FEED_SOURCE_IDS:
            labels.add(JSON_FEED_SOURCE_IDS[key])
    return labels


def _filter_by_sources(jobs: list[dict[str, Any]], labels: set[str] | None) -> list[dict[str, Any]]:
    if labels is None:
        return jobs
    if not labels:
        return []
    return [
        j
        for j in jobs
        if j.get("source_portal") in labels or j.get("source_portal") == "Datos demo"
    ]


def _passes_hard_filters(job: dict[str, Any], f: dict[str, Any]) -> bool:
    if job["country"] != f["country"]:
        return False
    region = f.get("region")
    if region and region.strip().lower() not in ("", "all regions"):
        needle = fold_ascii(region)
        hay = fold_ascii(f"{job['region']} {job.get('raw_location', '')}")
        if needle not in hay:
            return False
    jp = job.get("work_percentage")
    if jp is not None and not (f["pct_min"] <= jp <= f["pct_max"]):
        return False
    if f.get("category") and job["category"] != f["category"]:
        return False
    if f.get("languages"):
        needed = {_map_lang(x) for x in f["languages"]}
        job_set = set(job.get("languages") or [])
        if not (needed & job_set):
            return False
    if f.get("work_model") and job["work_model"] != f["work_model"]:
        return False
    return True


@app.get("/")
def root(response: Response):
    """Evita 404 al abrir la raíz del servidor en el navegador."""
    response.headers["Cache-Control"] = "no-store, no-cache, max-age=0"
    response.headers["Pragma"] = "no-cache"
    return {
        "service": "DACH Job Filter API",
        "version": "0.2",
        "deploy_marker": "dach-job-filter-backend-repo",
        "docs": "/docs",
        "routes": [
            "/health",
            "/jobs",
            "/jobs/search",
            "/portals",
            "/portals/switzerland",
        ],
    }


@app.get("/portals")
def portals_catalog():
    """Portales DACH conocidos + feeds JSON activos en este MVP."""
    return {
        "known_portals_ch_de_at": KNOWN_PORTALS,
        "live_json_feeds_in_app": LIVE_JSON_FEEDS,
        "note": "Los portales listados suelen requerir partner/API propia; la app consume agregadores públicos.",
    }


@app.get("/portals/switzerland")
def portals_switzerland():
    """Directorio orientativo de sitios para buscar trabajo en Suiza."""
    return {
        "country": "CH",
        "category_labels": CATEGORY_LABELS_ES,
        "portals": SWISS_PORTALS,
        "count": len(SWISS_PORTALS),
        "disclaimer": "Directorio informativo con enlaces a terceros; puede haber cambios en URLs y ofertas. "
        "La integración masiva de anuncios depende de las condiciones legales y técnicas de cada portal.",
    }


@app.get("/health", response_model=HealthOut)
def health():
    return HealthOut(status="ok", source="dach-job-filter")


@app.get("/jobs", response_model=list[JobOut])
def list_jobs(
    refresh: bool = Query(False),
    sources: str | None = Query(
        None,
        description="Fuentes JSON activas, separadas por coma: arbeitnow,remotive,jobicy,himalayas",
    ),
):
    jobs, _src = load_jobs(force_refresh=refresh)
    jobs = _filter_by_sources(jobs, _source_labels_from_query(sources))
    return [JobOut(**{**j, "match_score": None}) for j in jobs]


@app.get("/jobs/search", response_model=list[JobOut])
def search_jobs(
    country: str = Query(..., pattern="^(CH|DE|AT)$"),
    region: str | None = None,
    pct_band: str | None = Query(None, description="e.g. 40-60"),
    pct_min: int | None = None,
    pct_max: int | None = None,
    category: str | None = None,
    languages: str | None = Query(None, description="comma-separated codes"),
    work_model: str | None = Query(None, pattern="^(remote|hybrid|onsite)$"),
    q: str | None = Query(
        None,
        max_length=220,
        description="Palabras en título, empresa o ubicación (todas deben coincidir).",
    ),
    sources: str | None = Query(
        None,
        description="Fuentes JSON (comma): arbeitnow,remotive,jobicy,himalayas",
    ),
):
    jobs, _ = load_jobs()
    jobs = _filter_by_sources(jobs, _source_labels_from_query(sources))
    pmin, pmax = _pct_bounds(pct_band, pct_min, pct_max)
    lang_list = [x.strip() for x in languages.split(",")] if languages else []
    lang_list = [x for x in lang_list if x]
    text_tokens = parse_search_query(q)

    filters: dict[str, Any] = {
        "country": country,
        "region": region,
        "pct_min": pmin,
        "pct_max": pmax,
        "category": category,
        "languages": lang_list,
        "work_model": work_model,
        "text_tokens": text_tokens,
    }

    filtered = [
        j
        for j in jobs
        if _passes_hard_filters(j, filters) and passes_text_filter(j, text_tokens)
    ]
    scored: list[dict[str, Any]] = []
    for j in filtered:
        score = compute_match(j, filters)
        row = dict(j)
        row["match_score"] = score
        scored.append(row)
    scored.sort(key=lambda x: x["match_score"], reverse=True)
    return [JobOut(**x) for x in scored]
