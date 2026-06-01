"""Une todas las fuentes JSON configuradas y deduplica por URL."""

from __future__ import annotations

import logging
from typing import Any, Callable

from providers.arbeitnow import fetch_arbeitnow_jobs
from providers.himalayas import fetch_himalayas_jobs
from providers.jobicy import fetch_jobicy_jobs
from providers.remotive import fetch_remotive_jobs

logger = logging.getLogger(__name__)


def _dedupe_key(raw: dict[str, Any]) -> str:
    url = str(raw.get("url") or "").split("?")[0].strip().lower()
    if url and url != "#":
        return url
    return str(raw.get("slug") or "")


def fetch_all_raw_jobs(
    arbeitnow_pages: int = 4,
    timeout: float = 25.0,
) -> list[dict[str, Any]]:
    flat: list[dict[str, Any]] = []

    try:
        an = fetch_arbeitnow_jobs(max_pages=arbeitnow_pages, timeout=timeout)
        for row in an:
            r = dict(row)
            r["_source_portal"] = "Arbeitnow"
            flat.append(r)
    except Exception as exc:
        logger.warning("Arbeitnow aggregate: %s", exc)

    extra_fetchers: list[Callable[[], list[dict[str, Any]]]] = [
        lambda: fetch_remotive_jobs(limit=120, timeout=timeout),
        lambda: fetch_jobicy_jobs(count=50, timeout=timeout),
        lambda: fetch_himalayas_jobs(max_jobs=40, timeout=timeout),
    ]
    for fn in extra_fetchers:
        try:
            flat.extend(fn())
        except Exception as exc:
            logger.warning("Extra provider %s: %s", getattr(fn, "__name__", fn), exc)

    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for raw in flat:
        key = _dedupe_key(raw)
        if not key:
            key = str(id(raw))
        if key in seen:
            continue
        seen.add(key)
        unique.append(raw)
    return unique
