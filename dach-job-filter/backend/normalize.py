"""Map Arbeitnow-style payloads into DACH Job Filter schema."""

from __future__ import annotations

import hashlib
import re
from typing import Any

CATEGORIES = [
    "IT Support",
    "System Administration",
    "Cybersecurity",
    "Helpdesk",
    "Administrative",
]

DE_SIGNALS = (
    "germany",
    "deutschland",
    "bundesland",
    "nrw",
    "bavaria",
    "bayern",
    "baden-württemberg",
    "baden-wuerttemberg",
    "berlin",
    "hamburg",
    "münchen",
    "munich",
    "frankfurt",
    "köln",
    "cologne",
    "stuttgart",
    "düsseldorf",
    "dortmund",
    "essen",
    "leipzig",
    "dresden",
    "nürnberg",
    "nuremberg",
    "mannheim",
    "karlsruhe",
    "bonn",
    "wiesbaden",
    "münster",
    "chemnitz",
    "aachen",
    "braunschweig",
    "kiel",
    "heidelberg",
    "erfurt",
    "rostock",
    "freiburg",
    "lübeck",
    "lubeck",
    "oberhausen",
    "reutlingen",
    "heilbronn",
    "saarbrücken",
    "saarbrucken",
    "pforzheim",
    "ulm",
    "darmstadt",
    "regensburg",
    "ingolstadt",
    "würzburg",
    "wuerzburg",
    "fürth",
    "furth",
    "wolfsburg",
    "offenbach",
    "balingen",
    "bielefeld",
    "hannover",
    "magdeburg",
    "halle",
    "jena",
    "potsdam",
)

CH_SIGNALS = (
    "switzerland",
    "schweiz",
    "suisse",
    "svizzera",
    "zürich",
    "zurich",
    "basel",
    "bern",
    "berne",
    "geneva",
    "genf",
    "genève",
    "lausanne",
    "winterthur",
    "st. gallen",
    "st.gallen",
    "lugano",
    "schaffhausen",
    "fribourg",
    "neuchâtel",
    "neuchatel",
    "sion",
    "chur",
    "aargau",
    "zug",
    "luzern",
    "lucerne",
    "biel",
    "thun",
    "ticino",
    "graubünden",
    "grisons",
    "valais",
    "vaud",
)

AT_SIGNALS = (
    "austria",
    "österreich",
    "oesterreich",
    "vienna",
    "wien",
    "salzburg",
    "graz",
    "linz",
    "innsbruck",
    "klagenfurt",
    "villach",
    "tyrol",
    "tirol",
    "styria",
    "steiermark",
)


def _lower_blob(raw: dict[str, Any]) -> str:
    parts = [
        str(raw.get("title") or ""),
        str(raw.get("description") or ""),
        " ".join(raw.get("tags") or []),
        str(raw.get("location") or ""),
    ]
    return " ".join(parts).lower()


def _signal_hit(combined: str, sig: str) -> bool:
    """Evita falsos positivos en palabras cortas (p. ej. 'bern' dentro de otro token)."""
    s = sig.lower()
    if " " in s or "." in s:
        return s in combined
    if len(s) <= 4:
        return (
            re.search(rf"(?<![a-z0-9äöüß]){re.escape(s)}(?![a-z0-9äöüß])", combined)
            is not None
        )
    return s in combined


def _country_detection_text(raw: dict[str, Any]) -> str:
    """Incluye empresa y ubicación: Arbeitnow a veces no repite ciudad en el título."""
    parts = [
        str(raw.get("location") or ""),
        str(raw.get("title") or ""),
        str(raw.get("description") or ""),
        " ".join(raw.get("tags") or []),
        str(raw.get("company_name") or ""),
    ]
    return " ".join(parts).lower()


def detect_country(raw: dict[str, Any]) -> str | None:
    """Suiza primero (ciudad/región), luego AT, luego DE; así Heidelberg/Mannheim no son CH."""
    combined = _country_detection_text(raw)
    for sig in CH_SIGNALS:
        if _signal_hit(combined, sig):
            return "CH"
    for sig in AT_SIGNALS:
        if _signal_hit(combined, sig):
            return "AT"
    for sig in DE_SIGNALS:
        if _signal_hit(combined, sig):
            return "DE"
    return None


def infer_work_model(raw: dict[str, Any], blob: str) -> str:
    remote_val = raw.get("remote")
    is_remote = remote_val is True or (
        isinstance(remote_val, str) and remote_val.lower() in ("true", "1", "yes")
    )
    loc = str(raw.get("location") or "").lower()
    if "remote" in loc or "remote" in blob:
        is_remote = True
    if "hybrid" in blob or "hybrid" in loc:
        return "hybrid"
    if is_remote:
        return "remote"
    return "onsite"


def infer_percentage(blob: str, job_types: list[str]) -> int | None:
    m = re.search(r"(\d{1,3})\s*%", blob)
    if m:
        val = int(m.group(1))
        if 10 <= val <= 100:
            return val
    if re.search(r"\b(vollzeit|full[\s-]?time)\b", blob):
        return 100
    if re.search(r"\b(teilzeit|part[\s-]?time|50\s*%|half)\b", blob):
        return 50
    jt = " ".join(job_types).lower()
    if "part" in jt:
        return 50
    return None


def _matches_keyword(blob: str, key: str) -> bool:
    if len(key) <= 4:
        return re.search(rf"\b{re.escape(key)}\b", blob) is not None
    return key in blob


def infer_category(blob: str) -> str:
    rules: list[tuple[str, tuple[str, ...]]] = [
        ("Cybersecurity", ("security", "cybersecurity", "infosec", "penetration")),
        ("System Administration", ("sysadmin", "system administrator", "linux admin", "network admin", "devops")),
        ("Helpdesk", ("helpdesk", "help desk", "service desk")),
        ("IT Support", ("it support", "technical support", "desktop support", "support engineer")),
        ("Administrative", ("administrative", "office admin", "secretary", "coordinator", "back office")),
    ]
    for label, keys in rules:
        if any(_matches_keyword(blob, k) for k in keys):
            return label
    if any(_matches_keyword(blob, k) for k in ("engineer", "developer", "support")):
        return "IT Support"
    return "Administrative"


def infer_languages(blob: str) -> list[str]:
    langs: list[str] = []
    if "german" in blob or "deutsch" in blob:
        langs.append("german")
    if "english" in blob or "englisch" in blob:
        langs.append("english")
    if not langs:
        langs.append("english")
    return list(dict.fromkeys(langs))


def region_label(location: str) -> str:
    loc = location.strip() or "Unknown"
    if "," in loc:
        return loc.split(",")[0].strip()
    return loc


def normalize_job(raw: dict[str, Any]) -> dict[str, Any] | None:
    location = str(raw.get("location") or "").strip()
    blob = _lower_blob(raw)
    country = detect_country(raw)
    if country is None:
        return None
    pct = infer_percentage(blob, [str(x) for x in (raw.get("job_types") or [])])
    work_model = infer_work_model(raw, blob)
    category = infer_category(blob)
    languages = infer_languages(blob)
    portal = str(raw.get("_source_portal") or "Arbeitnow")
    slug = str(raw.get("slug") or "").strip()
    url = str(raw.get("url") or "").strip()
    if slug:
        jid = f"{portal}:{slug}"
    else:
        digest = hashlib.sha256(f"{portal}|{url}|{blob[:500]}".encode()).hexdigest()[:16]
        jid = f"{portal}:{digest}"

    return {
        "id": jid,
        "company": str(raw.get("company_name") or "Company"),
        "title": str(raw.get("title") or "Role"),
        "region": region_label(location),
        "country": country,
        "work_model": work_model,
        "work_percentage": pct,
        "category": category,
        "languages": languages,
        "apply_url": str(raw.get("url") or "#"),
        "raw_location": location,
        "source_portal": portal,
    }
