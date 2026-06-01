"""Cliente público Himalayas (paginado)."""

from __future__ import annotations

import logging
import re
from html import unescape
from typing import Any

import requests

logger = logging.getLogger(__name__)

BASE = "https://himalayas.app/jobs/api"


def _strip_html(html: str) -> str:
    if not html:
        return ""
    text = re.sub(r"<[^>]+>", " ", html)
    return unescape(re.sub(r"\s+", " ", text).strip())


def fetch_himalayas_jobs(max_jobs: int = 40, timeout: float = 25.0) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    offset = 0
    page_size = 20
    while len(out) < max_jobs:
        try:
            resp = requests.get(
                BASE,
                params={"limit": page_size, "offset": offset},
                timeout=timeout,
            )
            resp.raise_for_status()
            payload = resp.json()
        except (requests.RequestException, ValueError) as exc:
            logger.warning("Himalayas: %s", exc)
            break
        batch = payload.get("jobs") or []
        if not batch:
            break
        for j in batch:
            locs = j.get("locationRestrictions") or []
            loc_str = ", ".join(str(x) for x in locs) if isinstance(locs, list) else str(locs)
            guid = str(j.get("guid") or j.get("applicationLink") or "")
            slug_base = guid.replace("https://", "").replace("/", "-")[:80]
            desc_html = str(j.get("description") or "")
            cats = j.get("categories") or []
            tags = [str(c) for c in cats] if isinstance(cats, list) else []
            out.append(
                {
                    "slug": f"himalayas-{slug_base}"[:120],
                    "company_name": j.get("companyName") or "Company",
                    "title": j.get("title") or "Role",
                    "description": _strip_html(desc_html),
                    "remote": True,
                    "url": str(j.get("applicationLink") or j.get("guid") or "#"),
                    "tags": tags,
                    "job_types": [str(j.get("employmentType") or "full-time")],
                    "location": loc_str or "Remote",
                    "created_at": "",
                    "_source_portal": "Himalayas",
                }
            )
            if len(out) >= max_jobs:
                break
        offset += page_size
    return out
