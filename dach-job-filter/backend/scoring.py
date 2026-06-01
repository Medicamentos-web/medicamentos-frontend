"""Match score 0–100 from user filters vs normalized job."""

from __future__ import annotations

from typing import Any

from search_text import fold_ascii, text_match_score

LANG_MAP = {
    "german_b1": "german",
    "german_b2": "german",
    "german_c1": "german",
    "english": "english",
}


def _pct_score(job_pct: int | None, pmin: int, pmax: int) -> float:
    if job_pct is None:
        return 70.0
    if pmin <= job_pct <= pmax:
        return 100.0
    dist = min(abs(job_pct - pmin), abs(job_pct - pmax))
    return max(40.0, 100.0 - dist * 1.5)


def _region_score(region_filter: str | None, job_region: str, raw_loc: str) -> float:
    if not region_filter or region_filter.lower() == "all regions":
        return 100.0
    needle = fold_ascii(region_filter)
    hay = fold_ascii(f"{job_region} {raw_loc}")
    return 100.0 if needle in hay else 25.0


def _category_score(selected: str | None, job_cat: str) -> float:
    if not selected:
        return 100.0
    return 100.0 if selected == job_cat else 35.0


def _language_score(selected: list[str], job_langs: list[str]) -> float:
    if not selected:
        return 100.0
    needed = {LANG_MAP.get(s, s) for s in selected}
    job_set = set(job_langs)
    overlap = needed & job_set
    if overlap:
        return min(100.0, 60.0 + 40.0 * len(overlap) / len(needed))
    return 30.0


def _work_model_score(selected: str | None, job_model: str) -> float:
    if not selected:
        return 100.0
    return 100.0 if selected == job_model else 40.0


def compute_match(job: dict[str, Any], filters: dict[str, Any]) -> int:
    pct = _pct_score(
        job.get("work_percentage"),
        int(filters["pct_min"]),
        int(filters["pct_max"]),
    )
    reg = _region_score(filters.get("region"), job["region"], job.get("raw_location", ""))
    cat = _category_score(filters.get("category"), job["category"])
    lang = _language_score(filters.get("languages") or [], job.get("languages") or [])
    wm = _work_model_score(filters.get("work_model"), job["work_model"])
    tok = filters.get("text_tokens") or []
    txt = text_match_score(job, tok)
    parts = [pct, reg, cat, lang, wm]
    if tok:
        parts.append(txt)
    total = sum(parts) / float(len(parts))
    return int(round(min(100, max(0, total))))
