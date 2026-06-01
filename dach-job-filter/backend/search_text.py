"""Consulta de texto libre sobre ofertas normalizadas (sin motor full-text externo)."""

from __future__ import annotations

import re
import unicodedata
from typing import Any

_MAX_TOKENS = 12
_MAX_QUERY_LEN = 220


def fold_ascii(s: str) -> str:
    """Minúsculas y sin marcas diacríticas (ü → u) para coincidencias flexibles."""
    if not s:
        return ""
    n = unicodedata.normalize("NFKD", s)
    return "".join(c for c in n if not unicodedata.combining(c)).lower()


def parse_search_query(q: str | None) -> list[str]:
    if not q:
        return []
    s = q.strip()[:_MAX_QUERY_LEN]
    if not s:
        return []
    raw = re.findall(
        r"[a-zA-Z0-9äöüÄÖÜßáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛçÇ\-]+",
        s,
    )
    tokens: list[str] = []
    for w in raw:
        t = fold_ascii(w)
        if len(t) < 2:
            continue
        tokens.append(t)
        if len(tokens) >= _MAX_TOKENS:
            break
    return tokens


def job_searchable_blob(job: dict[str, Any]) -> str:
    parts = [
        str(job.get("title") or ""),
        str(job.get("company") or ""),
        str(job.get("region") or ""),
        str(job.get("raw_location") or ""),
        str(job.get("category") or ""),
    ]
    return fold_ascii(" ".join(parts))


def passes_text_filter(job: dict[str, Any], tokens: list[str]) -> bool:
    if not tokens:
        return True
    hay = job_searchable_blob(job)
    return all(t in hay for t in tokens)


def text_match_score(job: dict[str, Any], tokens: list[str]) -> float:
    """Mayor puntuación si más tokens aparecen en el título del puesto."""
    if not tokens:
        return 100.0
    title = fold_ascii(str(job.get("title") or ""))
    in_title = sum(1 for t in tokens if t in title)
    if in_title == len(tokens):
        return 100.0
    if in_title > 0:
        return 52.0 + 48.0 * (in_title / len(tokens))
    return 48.0
