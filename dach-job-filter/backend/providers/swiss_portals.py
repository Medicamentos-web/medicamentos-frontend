"""
Directorio de portales y sitios orientativos para buscar empleo en Suiza.

Referencias públicas / mercado (2025–2026). Las URLs son enlaces externos;
la mayoría no exponen API abierta gratuita para esta app.

Opcionalmente cada entrada puede incluir ``search_url_template``: URL de resultados
con marcadores: ``{q}``, ``{qq}``, ``{loc}``, ``{locLi}``, y ``{g:dominio}`` (búsqueda
Google acotada al sitio si no hay URL de resultados fiable).
"""

from __future__ import annotations

from typing import Any

# Etiquetas de categoría (UI en español).
CATEGORY_LABELS_ES: dict[str, str] = {
    "general": "Portales generales y anuncios",
    "tech": "Tecnología, datos e IT",
    "staffing": "Selección, temporal y consultoría RH",
    "international": "Plataformas internacionales (filtro Suiza)",
    "public_info": "Información pública y orientación profesional",
    "education": "Universidades y ciencia",
}

SWISS_PORTALS: list[dict[str, Any]] = [
    # — Portales generales (Suiza) —
    {
        "id": "jobcloud-jobs-ch",
        "name": "jobs.ch (JobCloud)",
        "url": "https://www.jobs.ch",
        "category": "general",
        "focus": "Bolsa líder en Suiza; anuncios en DE/FR/IT/EN.",
        "search_url_template": "https://www.jobs.ch/en/vacancies/?keyword={qq}",
    },
    {
        "id": "jobup-ch",
        "name": "Jobup.ch",
        "url": "https://www.jobup.ch",
        "category": "general",
        "focus": "Grupo JobCloud; perfiles variados.",
        "search_url_template": "https://www.jobup.ch/en/jobseekers?q={qq}",
    },
    {
        "id": "jobscout24-ch",
        "name": "Jobscout24 Schweiz",
        "url": "https://www.jobscout24.ch",
        "category": "general",
        "focus": "Anuncios clasificados y empleo.",
        "search_url_template": "https://www.google.com/search?q={g:jobscout24.ch}",
    },
    {
        "id": "alpha-ch",
        "name": "Alpha.ch",
        "url": "https://www.alpha.ch",
        "category": "general",
        "focus": "Portal suizo de empleo.",
        "search_url_template": "https://www.google.com/search?q={g:alpha.ch}",
    },
    {
        "id": "stellen24",
        "name": "Stellen24",
        "url": "https://www.stellen24.ch",
        "category": "general",
        "focus": "Ofertas en Suiza; búsqueda por región y sector.",
        "search_url_template": "https://www.google.com/search?q={g:stellen24.ch}",
    },
    {
        "id": "jobtic",
        "name": "Jobtic",
        "url": "https://jobtic.ch",
        "category": "general",
        "focus": "Portal multilingüe (FR/DE/IT/EN) orientado a Suiza.",
        "search_url_template": "https://www.google.com/search?q={g:jobtic.ch}",
    },
    {
        "id": "topjobs",
        "name": "Topjobs.ch",
        "url": "https://topjobs.ch",
        "category": "general",
        "focus": "Mercado online orientado a perfiles especialistas y mandos.",
        "search_url_template": "https://www.google.com/search?q={g:topjobs.ch}",
    },
    {
        "id": "suissetalent",
        "name": "SuisseTalent",
        "url": "https://www.suissetalent.ch",
        "category": "general",
        "focus": "Agregación de ofertas y empresas en Suiza.",
        "search_url_template": "https://www.google.com/search?q={g:suissetalent.ch}",
    },
    {
        "id": "jobfile",
        "name": "Jobfile.ch",
        "url": "https://www.jobfile.ch",
        "category": "general",
        "focus": "Base de datos orientada también a agencias de personal.",
        "search_url_template": "https://www.google.com/search?q={g:jobfile.ch}",
    },
    # — IT / tech —
    {
        "id": "swissdevjobs",
        "name": "SwissDevJobs",
        "url": "https://swissdevjobs.ch",
        "category": "tech",
        "focus": "Empleo tech en Suiza; foco transparencia salarial/tecnologías.",
        "search_url_template": "https://www.google.com/search?q={g:swissdevjobs.ch}",
    },
    {
        "id": "ictjob",
        "name": "ictjob.ch",
        "url": "https://ictjob.ch",
        "category": "tech",
        "focus": "Ofertas IT en Suiza.",
        "search_url_template": "https://www.google.com/search?q={g:ictjob.ch}",
    },
    {
        "id": "ictjobs",
        "name": "ictjobs.ch",
        "url": "https://www.ictjobs.ch",
        "category": "tech",
        "focus": "Plataforma IT / categorías técnicas.",
        "search_url_template": "https://www.google.com/search?q={g:ictjobs.ch}",
    },
    # — Staffing —
    {
        "id": "adecco-ch",
        "name": "Adecco Suiza",
        "url": "https://www.adecco.ch",
        "category": "staffing",
        "focus": "Temporal y selección multinacional.",
        "search_url_template": "https://www.google.com/search?q={g:adecco.ch}",
    },
    {
        "id": "randstad-ch",
        "name": "Randstad Suiza",
        "url": "https://www.randstad.ch",
        "category": "staffing",
        "focus": "Agencia de empleo y proyectos.",
        "search_url_template": "https://www.google.com/search?q={g:randstad.ch}",
    },
    {
        "id": "manpower-ch",
        "name": "Manpower Suiza",
        "url": "https://www.manpower.ch",
        "category": "staffing",
        "focus": "Temporal y recruitment.",
        "search_url_template": "https://www.google.com/search?q={g:manpower.ch}",
    },
    {
        "id": "kelly-ch",
        "name": "Kelly Services Suiza",
        "url": "https://www.kellyservices.ch",
        "category": "staffing",
        "focus": "Selección y staffing especializado.",
        "search_url_template": "https://www.google.com/search?q={g:kellyservices.ch}",
    },
    {
        "id": "experis-ch",
        "name": "Experis Suiza",
        "url": "https://www.experis.ch",
        "category": "staffing",
        "focus": "IT y perfiles técnicos.",
        "search_url_template": "https://www.google.com/search?q={g:experis.ch}",
    },
    {
        "id": "roberthalf-ch",
        "name": "Robert Half Suiza",
        "url": "https://www.roberthalf.ch",
        "category": "staffing",
        "focus": "Finanzas, administración y tecnología.",
        "search_url_template": "https://www.google.com/search?q={g:roberthalf.ch}",
    },
    # — Internacional con cobertura CH —
    {
        "id": "linkedin-jobs",
        "name": "LinkedIn Empleos",
        "url": "https://www.linkedin.com/jobs/",
        "category": "international",
        "focus": "Filtrar ubicación «Switzerland» o ciudad suiza.",
        "search_url_template": "https://www.linkedin.com/jobs/search/?keywords={q}&location={locLi}",
    },
    {
        "id": "indeed-ch",
        "name": "Indeed Suiza",
        "url": "https://ch.indeed.com",
        "category": "international",
        "focus": "Meta-buscador; seleccionar país Suiza.",
        "search_url_template": "https://ch.indeed.com/jobs?q={q}&l={loc}",
    },
    {
        "id": "glassdoor-ch",
        "name": "Glassdoor Suiza",
        "url": "https://www.glassdoor.com/Country/Switzerland-Jobs.htm",
        "category": "international",
        "focus": "Ofertas + opiniones sobre empresas.",
        "search_url_template": "https://www.glassdoor.com/Job/jobs.htm?sc.keyword={qq}&locT=N&locId=238084",
    },
    {
        "id": "xing-jobs",
        "name": "XING Stellenmarkt",
        "url": "https://www.xing.com/jobs",
        "category": "international",
        "focus": "Mercado DACH; muchos anuncios en Suiza.",
        "search_url_template": "https://www.xing.com/jobs?q={qq}",
    },
    # — Público / orientación —
    {
        "id": "work-swiss",
        "name": "Work.swiss (SECO)",
        "url": "https://www.work.swiss",
        "category": "public_info",
        "focus": "Portal oficial (Secretaría de Estado SECO): desempleo, Job‑Room, centros regionales de empleo (RAV) y servicios digitales.",
        "search_url_template": "https://www.google.com/search?q={g:work.swiss}",
    },
    {
        "id": "job-room-ch-de",
        "name": "Job‑Room (frontera CH–DE)",
        "url": "https://www.job-room.ch",
        "category": "public_info",
        "focus": "Información cruce fronterizo Alemania–Suiza (SECO / BA).",
        "search_url_template": "https://www.google.com/search?q={g:job-room.ch}",
    },
    # — Educación / ciencia —
    {
        "id": "eth-jobs",
        "name": "ETH Zurich · Careers",
        "url": "https://jobs.ethz.ch",
        "category": "education",
        "focus": "Puestos científicos, técnico y administración ETH.",
        "search_url_template": "https://www.google.com/search?q={g:jobs.ethz.ch}",
    },
    {
        "id": "epfl-careers",
        "name": "EPFL · Careers",
        "url": "https://careers.epfl.ch",
        "category": "education",
        "focus": "Empleo EPFL Lausanne.",
        "search_url_template": "https://www.google.com/search?q={g:careers.epfl.ch}",
    },
    {
        "id": "uzh-jobs",
        "name": "Universität Zürich · Jobs",
        "url": "https://www.uzh.ch/cmsssl/de/about/work/jobs.html",
        "category": "education",
        "focus": "Vacantes académicas y administrativas UZH.",
        "search_url_template": "https://www.google.com/search?q={g:uzh.ch}",
    },
    {
        "id": "unige-jobs",
        "name": "Université de Genève · Emplois",
        "url": "https://www.unige.ch/emplois/",
        "category": "education",
        "focus": "Universidad de Ginebra.",
        "search_url_template": "https://www.google.com/search?q={g:unige.ch}",
    },
    {
        "id": "unibas-jobs",
        "name": "Universität Basel · Jobs",
        "url": "https://www.unibas.ch/de/universitaet/administration/personal/offene-stellen.html",
        "category": "education",
        "focus": "Universidad de Basilea.",
        "search_url_template": "https://www.google.com/search?q={g:unibas.ch}",
    },
]
