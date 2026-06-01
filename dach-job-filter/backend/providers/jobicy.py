"""Cliente Jobicy API v2."""

from __future__ import annotations

import logging
from typing import Any

import requests

logger = logging.getLogger(__name__)

URL = "https://jobicy.com/api/v2/remote-jobs"


def fetch_jobicy_jobs(count: int = 50, timeout: float = 25.0) -> list[dict[str, Any]]:
    try:
        resp = requests.get(URL, params={"count": min(count, 50)}, timeout=timeout)
        resp.raise_for_status()
        payload = resp.json()
    except (requests.RequestException, ValueError) as exc:
        logger.warning("Jobicy: %s", exc)
        return []

    jobs = payload.get("jobs") or []
    out: list[dict[str, Any]] = []
    for j in jobs:
        geo = j.get("jobGeo")
        loc = str(geo).strip() if geo else "Remote"
        jid = j.get("id")
        excerpt = str(j.get("jobExcerpt") or "")
        body = str(j.get("jobDescription") or "")
        desc = f"{excerpt}\n{body}" if excerpt else body
        out.append(
            {
                "slug": f"jobicy-{jid}",
                "company_name": j.get("companyName") or "Company",
                "title": j.get("jobTitle") or "Role",
                "description": desc,
                "remote": True,
                "url": str(j.get("url") or "#"),
                "tags": [str(j.get("jobIndustry") or "")] if j.get("jobIndustry") else [],
                "job_types": [str(j.get("jobType") or "full-time")],
                "location": loc,
                "created_at": str(j.get("pubDate") or ""),
                "_source_portal": "Jobicy",
            }
        )
    return out
