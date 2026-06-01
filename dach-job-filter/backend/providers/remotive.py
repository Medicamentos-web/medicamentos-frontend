"""Cliente Remotive (empleo remoto; filtrado DACH en normalización)."""

from __future__ import annotations

import logging
from typing import Any

import requests

logger = logging.getLogger(__name__)

URL = "https://remotive.com/api/remote-jobs"


def fetch_remotive_jobs(limit: int = 120, timeout: float = 25.0) -> list[dict[str, Any]]:
    try:
        resp = requests.get(URL, params={"limit": limit}, timeout=timeout)
        resp.raise_for_status()
        payload = resp.json()
    except (requests.RequestException, ValueError) as exc:
        logger.warning("Remotive: %s", exc)
        return []

    jobs = payload.get("jobs") or []
    out: list[dict[str, Any]] = []
    for j in jobs:
        loc = (j.get("candidate_required_location") or "").strip() or "Remote"
        jid = j.get("id")
        out.append(
            {
                "slug": f"remotive-{jid}",
                "company_name": j.get("company_name") or "Company",
                "title": j.get("title") or "Role",
                "description": str(j.get("description") or ""),
                "remote": True,
                "url": str(j.get("url") or "#"),
                "tags": [str(t) for t in (j.get("tags") or []) if t],
                "job_types": [str(j.get("job_type") or "full-time")],
                "location": loc,
                "created_at": str(j.get("publication_date") or ""),
                "_source_portal": "Remotive",
            }
        )
    return out
