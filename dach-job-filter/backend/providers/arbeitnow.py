"""Arbeitnow Job Board API client."""

from __future__ import annotations

import logging
from typing import Any

import requests

logger = logging.getLogger(__name__)

BASE_URL = "https://arbeitnow.com/api/job-board-api"


def fetch_arbeitnow_jobs(max_pages: int = 4, timeout: float = 20.0) -> list[dict[str, Any]]:
    """Fetch paginated raw job payloads from Arbeitnow."""
    jobs: list[dict[str, Any]] = []
    url = f"{BASE_URL}?page=1"
    for page in range(max_pages):
        try:
            resp = requests.get(url, timeout=timeout)
            resp.raise_for_status()
            payload = resp.json()
        except (requests.RequestException, ValueError) as exc:
            logger.warning("Arbeitnow fetch failed at page %s: %s", page + 1, exc)
            break
        batch = payload.get("data") or []
        jobs.extend(batch)
        next_url = (payload.get("links") or {}).get("next")
        if not next_url:
            break
        url = next_url
    return jobs
