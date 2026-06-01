import type { SwissPortalRow } from "@/lib/types-portals";

/**
 * Filtros opcionales para enlaces de búsqueda en portales externos.
 * Los sitios no exponen un modelo común: ciudad y pensum se mapean lo mejor posible.
 */
export type PortalSearchFilters = {
  keywords: string;
  /** Ciudad o región (ej. Zürich). Vacío → toda Suiza en Indeed/LinkedIn. */
  city?: string;
  /** Pensum 1–100. Muchos portales solo lo interpretan como texto en la consulta. */
  workPct?: number | null;
};

/**
 * Metadatos mínimos si falla GET /portals/switzerland (mismo orden que el catálogo).
 */
const PORTAL_FALLBACK_INFO: Record<
  string,
  { name: string; url: string; category: string }
> = {
  "jobcloud-jobs-ch": {
    name: "jobs.ch (JobCloud)",
    url: "https://www.jobs.ch",
    category: "general",
  },
  "jobup-ch": {
    name: "Jobup.ch",
    url: "https://www.jobup.ch",
    category: "general",
  },
  "jobscout24-ch": {
    name: "Jobscout24 Schweiz",
    url: "https://www.jobscout24.ch",
    category: "general",
  },
  "alpha-ch": {
    name: "Alpha.ch",
    url: "https://www.alpha.ch",
    category: "general",
  },
  stellen24: {
    name: "Stellen24",
    url: "https://www.stellen24.ch",
    category: "general",
  },
  jobtic: {
    name: "Jobtic",
    url: "https://jobtic.ch",
    category: "general",
  },
  topjobs: {
    name: "Topjobs.ch",
    url: "https://topjobs.ch",
    category: "general",
  },
  suissetalent: {
    name: "SuisseTalent",
    url: "https://www.suissetalent.ch",
    category: "general",
  },
  jobfile: {
    name: "Jobfile.ch",
    url: "https://www.jobfile.ch",
    category: "general",
  },
  swissdevjobs: {
    name: "SwissDevJobs",
    url: "https://swissdevjobs.ch",
    category: "tech",
  },
  ictjob: {
    name: "ictjob.ch",
    url: "https://ictjob.ch",
    category: "tech",
  },
  ictjobs: {
    name: "ictjobs.ch",
    url: "https://www.ictjobs.ch",
    category: "tech",
  },
  "adecco-ch": {
    name: "Adecco Suiza",
    url: "https://www.adecco.ch",
    category: "staffing",
  },
  "randstad-ch": {
    name: "Randstad Suiza",
    url: "https://www.randstad.ch",
    category: "staffing",
  },
  "manpower-ch": {
    name: "Manpower Suiza",
    url: "https://www.manpower.ch",
    category: "staffing",
  },
  "kelly-ch": {
    name: "Kelly Services Suiza",
    url: "https://www.kellyservices.ch",
    category: "staffing",
  },
  "experis-ch": {
    name: "Experis Suiza",
    url: "https://www.experis.ch",
    category: "staffing",
  },
  "roberthalf-ch": {
    name: "Robert Half Suiza",
    url: "https://www.roberthalf.ch",
    category: "staffing",
  },
  "linkedin-jobs": {
    name: "LinkedIn Empleos",
    url: "https://www.linkedin.com/jobs/",
    category: "international",
  },
  "indeed-ch": {
    name: "Indeed Suiza",
    url: "https://ch.indeed.com",
    category: "international",
  },
  "glassdoor-ch": {
    name: "Glassdoor Suiza",
    url: "https://www.glassdoor.com/Country/Switzerland-Jobs.htm",
    category: "international",
  },
  "xing-jobs": {
    name: "XING Stellenmarkt",
    url: "https://www.xing.com/jobs",
    category: "international",
  },
  "work-swiss": {
    name: "Work.swiss (SECO)",
    url: "https://www.work.swiss",
    category: "public_info",
  },
  "job-room-ch-de": {
    name: "Job‑Room (frontera CH–DE)",
    url: "https://www.job-room.ch",
    category: "public_info",
  },
  "eth-jobs": {
    name: "ETH Zurich · Careers",
    url: "https://jobs.ethz.ch",
    category: "education",
  },
  "epfl-careers": {
    name: "EPFL · Careers",
    url: "https://careers.epfl.ch",
    category: "education",
  },
  "uzh-jobs": {
    name: "Universität Zürich · Jobs",
    url: "https://www.uzh.ch/cmsssl/de/about/work/jobs.html",
    category: "education",
  },
  "unige-jobs": {
    name: "Université de Genève · Emplois",
    url: "https://www.unige.ch/emplois/",
    category: "education",
  },
  "unibas-jobs": {
    name: "Universität Basel · Jobs",
    url: "https://www.unibas.ch/de/universitaet/administration/personal/offene-stellen.html",
    category: "education",
  },
};

/**
 * Plantillas alineadas con `backend/providers/swiss_portals.py`.
 * `{g:dominio}` → búsqueda Google acotada `site:dominio` + consulta (sin API propia fiable).
 */
export const PORTAL_SEARCH_TEMPLATE_BY_ID: Record<string, string> = {
  "jobcloud-jobs-ch":
    "https://www.jobs.ch/en/vacancies/?keyword={qq}",
  "jobup-ch": "https://www.jobup.ch/en/jobseekers?q={qq}",
  "jobscout24-ch":
    "https://www.google.com/search?q={g:jobscout24.ch}",
  "alpha-ch": "https://www.google.com/search?q={g:alpha.ch}",
  stellen24: "https://www.google.com/search?q={g:stellen24.ch}",
  jobtic: "https://www.google.com/search?q={g:jobtic.ch}",
  topjobs: "https://www.google.com/search?q={g:topjobs.ch}",
  suissetalent: "https://www.google.com/search?q={g:suissetalent.ch}",
  jobfile: "https://www.google.com/search?q={g:jobfile.ch}",
  swissdevjobs: "https://www.google.com/search?q={g:swissdevjobs.ch}",
  ictjob: "https://www.google.com/search?q={g:ictjob.ch}",
  ictjobs: "https://www.google.com/search?q={g:ictjobs.ch}",
  "adecco-ch": "https://www.google.com/search?q={g:adecco.ch}",
  "randstad-ch": "https://www.google.com/search?q={g:randstad.ch}",
  "manpower-ch": "https://www.google.com/search?q={g:manpower.ch}",
  "kelly-ch": "https://www.google.com/search?q={g:kellyservices.ch}",
  "experis-ch": "https://www.google.com/search?q={g:experis.ch}",
  "roberthalf-ch": "https://www.google.com/search?q={g:roberthalf.ch}",
  "linkedin-jobs":
    "https://www.linkedin.com/jobs/search/?keywords={q}&location={locLi}",
  "indeed-ch": "https://ch.indeed.com/jobs?q={q}&l={loc}",
  "glassdoor-ch":
    "https://www.glassdoor.com/Job/jobs.htm?sc.keyword={qq}&locT=N&locId=238084",
  "xing-jobs": "https://www.xing.com/jobs?q={qq}",
  "work-swiss": "https://www.google.com/search?q={g:work.swiss}",
  "job-room-ch-de": "https://www.google.com/search?q={g:job-room.ch}",
  "eth-jobs": "https://www.google.com/search?q={g:jobs.ethz.ch}",
  "epfl-careers": "https://www.google.com/search?q={g:careers.epfl.ch}",
  "uzh-jobs": "https://www.google.com/search?q={g:uzh.ch}",
  "unige-jobs": "https://www.google.com/search?q={g:unige.ch}",
  "unibas-jobs": "https://www.google.com/search?q={g:unibas.ch}",
};

function buildFallbackPortalsFromTemplates(): SwissPortalRow[] {
  return Object.keys(PORTAL_SEARCH_TEMPLATE_BY_ID).map((id) => {
    const meta = PORTAL_FALLBACK_INFO[id];
    return {
      id,
      name: meta?.name ?? id,
      url: meta?.url ?? "https://www.google.com",
      category: meta?.category ?? "general",
      focus: "",
      search_url_template: PORTAL_SEARCH_TEMPLATE_BY_ID[id],
    };
  });
}

function coerceFilters(input: string | PortalSearchFilters): PortalSearchFilters {
  if (typeof input === "string") {
    return { keywords: input };
  }
  return input;
}

function normalizePct(pct: number | null | undefined): number | null {
  if (pct == null || Number.isNaN(pct)) return null;
  if (pct < 1 || pct > 100) return null;
  return Math.round(pct);
}

/**
 * Sustituye marcadores en la plantilla. Acepta solo palabras clave (string) o filtros completos.
 */
export function buildPortalSearchUrl(
  template: string | undefined,
  filters: string | PortalSearchFilters,
): string | null {
  if (!template?.trim()) return null;
  const f = coerceFilters(filters);
  const kw = f.keywords.trim();
  if (!kw) return null;
  const city = f.city?.trim() ?? "";
  const pct = normalizePct(f.workPct ?? null);
  const pctPart = pct != null ? `${pct}%` : "";
  const qBase = [kw, pctPart].filter(Boolean).join(" ").trim();
  const qq = [kw, city, pctPart].filter(Boolean).join(" ").trim();
  const loc = city || "Switzerland";
  const locLi = city ? `${city}, Switzerland` : "Switzerland";
  const hasSplitLoc = template.includes("{loc}") || template.includes("{locLi}");

  let out = template;
  out = out.replace(/\{g:([^}]+)\}/g, (_, host: string) =>
    encodeURIComponent(`site:${String(host).trim()} ${qq}`),
  );
  if (out.includes("{qq}")) out = out.replaceAll("{qq}", encodeURIComponent(qq));
  if (out.includes("{locLi}")) {
    out = out.replaceAll("{locLi}", encodeURIComponent(locLi));
  }
  if (out.includes("{loc}")) out = out.replaceAll("{loc}", encodeURIComponent(loc));
  if (out.includes("{q}")) {
    const qEnc = encodeURIComponent(hasSplitLoc ? qBase : qq);
    out = out.replaceAll("{q}", qEnc);
  }
  return out;
}

/** Usa la plantilla canónica por `id` cuando existe (URLs y marcadores actualizados). */
export function mergePortalSearchTemplates(portals: SwissPortalRow[]): SwissPortalRow[] {
  return portals.map((p) => {
    const canonical = PORTAL_SEARCH_TEMPLATE_BY_ID[p.id];
    if (canonical) {
      return { ...p, search_url_template: canonical };
    }
    const t = p.search_url_template;
    if (
      typeof t === "string" &&
      (t.includes("{q}") || t.includes("{qq}") || t.includes("{g:"))
    ) {
      return p;
    }
    return p;
  });
}

export function portalsWithSearchTemplate(portals: SwissPortalRow[]): SwissPortalRow[] {
  return portals.filter((p) => typeof p.search_url_template === "string");
}

/** Portales para «Abrir en N portales»: catálogo API enriquecido o respaldo local. */
export function portalsForMultiOpenSearch(portals: SwissPortalRow[]): SwissPortalRow[] {
  const merged = mergePortalSearchTemplates(portals);
  const fromApi = portalsWithSearchTemplate(merged);
  if (fromApi.length > 0) return fromApi;
  return buildFallbackPortalsFromTemplates();
}

export type PortalSearchLink = { name: string; url: string };

/** Enlaces listos para `<a target="_blank">` (cada clic del usuario evita el bloqueador). */
export function multiOpenSearchLinks(
  portals: SwissPortalRow[],
  filters: string | PortalSearchFilters,
): PortalSearchLink[] {
  const f = coerceFilters(filters);
  if (!f.keywords.trim()) return [];
  const out: PortalSearchLink[] = [];
  for (const p of portalsWithSearchTemplate(portals)) {
    const url = buildPortalSearchUrl(p.search_url_template, f);
    if (url) out.push({ name: p.name, url });
  }
  return out;
}

export type OpenPortalTabsResult = {
  items: PortalSearchLink[];
  /** Ventanas/pestañas que el navegador llegó a abrir (null = bloqueadas). */
  opened: number;
};

/**
 * Intenta abrir todas las pestañas en un solo clic. Muchos navegadores solo
 * dejan una (`window.open`); si `opened < items.length`, usar los enlaces
 * manuales que devuelve `items`.
 */
export function openPortalSearchTabs(
  portals: SwissPortalRow[],
  filters: string | PortalSearchFilters,
): OpenPortalTabsResult {
  const items = multiOpenSearchLinks(portals, filters);
  let opened = 0;
  for (const { url } of items) {
    const w = window.open(url, "_blank");
    if (w != null) opened += 1;
  }
  return { items, opened };
}
