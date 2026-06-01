import type { JsonFeedId } from "@/lib/json-feeds";
import { ALL_JSON_FEED_IDS } from "@/lib/json-feeds";

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8765";

export type CountryCode = "CH" | "DE" | "AT";

export type JobDto = {
  id: string;
  company: string;
  title: string;
  region: string;
  country: CountryCode;
  work_model: "remote" | "hybrid" | "onsite";
  work_percentage: number | null;
  category: string;
  languages: string[];
  apply_url: string;
  source_portal: string;
  match_score: number | null;
};

function coerceJob(raw: unknown): JobDto | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const c = r.country;
  const country: CountryCode =
    c === "CH" || c === "DE" || c === "AT" ? c : "DE";
  const wm = r.work_model;
  const work_model: JobDto["work_model"] =
    wm === "remote" || wm === "hybrid" || wm === "onsite" ? wm : "onsite";
  const pct = r.work_percentage;
  const ms = r.match_score;
  return {
    id: String(r.id ?? ""),
    company: String(r.company ?? ""),
    title: String(r.title ?? ""),
    region: String(r.region ?? ""),
    country,
    work_model,
    work_percentage: typeof pct === "number" ? pct : null,
    category: String(r.category ?? ""),
    languages: Array.isArray(r.languages)
      ? (r.languages as unknown[]).map(String)
      : [],
    apply_url: String(r.apply_url ?? "#"),
    source_portal: String(r.source_portal ?? "—"),
    match_score: typeof ms === "number" ? ms : null,
  };
}

function coerceJobList(payload: unknown): JobDto[] {
  if (!Array.isArray(payload)) return [];
  return payload.map(coerceJob).filter(Boolean) as JobDto[];
}

/** Si indicas menos feeds que el total, se envía `sources=` al API. */
function appendSourcesQuery(q: URLSearchParams, feedIds?: readonly JsonFeedId[]) {
  if (!feedIds?.length || feedIds.length >= ALL_JSON_FEED_IDS.length) return;
  q.set(
    "sources",
    [...feedIds].sort((a, b) => ALL_JSON_FEED_IDS.indexOf(a) - ALL_JSON_FEED_IDS.indexOf(b)).join(","),
  );
}

export async function fetchAllJobs(feedIds?: readonly JsonFeedId[]): Promise<JobDto[]> {
  const q = new URLSearchParams();
  appendSourcesQuery(q, feedIds);
  const qs = q.toString();
  const url = qs ? `${BASE}/jobs?${qs}` : `${BASE}/jobs`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudieron cargar los empleos");
  const data: unknown = await res.json();
  return coerceJobList(data);
}

export type SearchParams = {
  country: CountryCode;
  region: string | null;
  pct_band: string;
  category: string | null;
  languages: string[];
  work_model: string | null;
  /** Palabras en título, empresa o ubicación (API `q`). */
  keywords?: string | null;
  /** Subconjunto de feeds JSON (`arbeitnow`, …). Omitir = todos. */
  sources?: readonly JsonFeedId[];
};

export async function searchJobs(params: SearchParams): Promise<JobDto[]> {
  const q = new URLSearchParams();
  q.set("country", params.country);
  q.set("pct_band", params.pct_band);
  if (params.region && params.region !== "All regions") {
    q.set("region", params.region);
  }
  if (params.category) q.set("category", params.category);
  if (params.work_model) q.set("work_model", params.work_model);
  if (params.languages.length > 0) {
    q.set("languages", params.languages.join(","));
  }
  if (params.keywords?.trim()) {
    q.set("q", params.keywords.trim());
  }
  appendSourcesQuery(q, params.sources);

  const res = await fetch(`${BASE}/jobs/search?${q.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("La búsqueda ha fallado");
  const data: unknown = await res.json();
  return coerceJobList(data);
}
