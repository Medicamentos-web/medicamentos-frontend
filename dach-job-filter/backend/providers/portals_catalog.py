"""
Catálogo de portales de empleo conocidos en CH / DE / AT.

La mayoría no ofrecen API REST pública gratuita; las ofertas pueden llegar
indirectamente vía agregadores (p. ej. Arbeitnow) o requerirán integraciones
oficiales / scraping autorizado en el futuro.
"""

from __future__ import annotations

from typing import Any

# Portales y job boards relevantes para la región DACH (nombre mostrado + URL).
KNOWN_PORTALS: list[dict[str, Any]] = [
    # Suiza
    {
        "name": "jobs.ch / JobCloud",
        "countries": ["CH"],
        "website": "https://www.jobs.ch",
        "integration": "sin_api_publica",
        "notes": "Mercado líder en Suiza; API comercial / partner.",
    },
    {
        "name": "Jobup.ch",
        "countries": ["CH"],
        "website": "https://www.jobup.ch",
        "integration": "sin_api_publica",
        "notes": "Operado por JobCloud; mismo ecosistema que jobs.ch.",
    },
    {
        "name": "Jobscout24 Schweiz",
        "countries": ["CH"],
        "website": "https://www.jobscout24.ch",
        "integration": "sin_api_publica",
        "notes": "Clasificados empleo.",
    },
    {
        "name": "Alpha.ch",
        "countries": ["CH"],
        "website": "https://www.alpha.ch",
        "integration": "sin_api_publica",
        "notes": "Portal suizo de empleo.",
    },
    {
        "name": "Universitäre Stellen / ETH / EPFL",
        "countries": ["CH"],
        "website": "https://jobs.ethz.ch",
        "integration": "manual_por_sitio",
        "notes": "Universidades publican en sus propios sitios/RSS.",
    },
    # Alemania
    {
        "name": "StepStone Deutschland",
        "countries": ["DE"],
        "website": "https://www.stepstone.de",
        "integration": "sin_api_publica",
        "notes": "Feeds XML/API para partners; no uso masivo sin contrato.",
    },
    {
        "name": "Indeed Deutschland",
        "countries": ["DE"],
        "website": "https://de.indeed.com",
        "integration": "sin_api_publica",
        "notes": "API Indeed solo con programa autorizado.",
    },
    {
        "name": "Bundesagentur für Arbeit (Jobbörse)",
        "countries": ["DE"],
        "website": "https://www.arbeitsagentur.de",
        "integration": "datos_abiertos_parciales",
        "notes": "Datos institucionales; integración propia posible (formatos XML/API específicos).",
    },
    {
        "name": "XING Jobs",
        "countries": ["DE", "CH", "AT"],
        "website": "https://www.xing.com/jobs",
        "integration": "sin_api_publica",
        "notes": "Plataforma cerrada; sin feed público simple.",
    },
    {
        "name": "LinkedIn Jobs",
        "countries": ["DE", "CH", "AT"],
        "website": "https://www.linkedin.com/jobs",
        "integration": "sin_api_publica",
        "notes": "API oficial restringida; scraping contra TOS.",
    },
    {
        "name": "Kimeta",
        "countries": ["DE"],
        "website": "https://www.kimeta.de",
        "integration": "sin_api_publica",
        "notes": "Meta-buscador alemán.",
    },
    {
        "name": "Jobware",
        "countries": ["DE"],
        "website": "https://www.jobware.de",
        "integration": "sin_api_publica",
        "notes": "Portal profesional DE.",
    },
    {
        "name": "Stellenanzeigen.de",
        "countries": ["DE"],
        "website": "https://www.stellenanzeigen.de",
        "integration": "sin_api_publica",
        "notes": "Clasificados.",
    },
    # Austria
    {
        "name": "karriere.at",
        "countries": ["AT"],
        "website": "https://www.karriere.at",
        "integration": "sin_api_publica",
        "notes": "Líder AT; sin JSON público documentado para MVP.",
    },
    {
        "name": "AMS Jobroom",
        "countries": ["AT"],
        "website": "https://jobroom.ams.gv.at",
        "integration": "institucional",
        "notes": "Servicio público empleo AT; API/documentación oficial revisable.",
    },
    {
        "name": "StepStone Österreich",
        "countries": ["AT"],
        "website": "https://www.stepstone.at",
        "integration": "sin_api_publica",
        "notes": "Misma familia que StepStone DE.",
    },
]

# Fuentes que el backend consulta hoy (JSON público, sin API key en MVP).
LIVE_JSON_FEEDS: list[dict[str, Any]] = [
    {
        "id": "arbeitnow",
        "label": "Arbeitnow",
        "endpoint": "https://arbeitnow.com/api/job-board-api",
        "role": "Agregador ATS (Greenhouse, Recruitee, SmartRecruiters, etc.)",
    },
    {
        "id": "remotive",
        "label": "Remotive",
        "endpoint": "https://remotive.com/api/remote-jobs",
        "role": "Empleo remoto global (filtrado por texto DACH)",
    },
    {
        "id": "jobicy",
        "label": "Jobicy",
        "endpoint": "https://jobicy.com/api/v2/remote-jobs",
        "role": "Remoto global (filtrado por texto DACH)",
    },
    {
        "id": "himalayas",
        "label": "Himalayas",
        "endpoint": "https://himalayas.app/jobs/api",
        "role": "Remoto / restricciones ubicación (filtrado DACH)",
    },
]
