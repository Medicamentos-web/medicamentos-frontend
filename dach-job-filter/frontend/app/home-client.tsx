"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { JobsTable } from "@/components/JobsTable";
import { QuickSearchPresets } from "@/components/QuickSearchPresets";
import { Sidebar } from "@/components/Sidebar";
import type { JobDto, SearchParams } from "@/lib/api";
import { fetchAllJobs, searchJobs } from "@/lib/api";
import { downloadJobsAsCsv } from "@/lib/export-jobs";
import type { CountryCode } from "@/lib/constants";
import { REGIONS } from "@/lib/constants";
import type { JsonFeedId } from "@/lib/json-feeds";
import { ALL_JSON_FEED_IDS } from "@/lib/json-feeds";
import type { QuickSearchPreset } from "@/lib/search-presets";

export default function HomeClient() {
  const [keywords, setKeywords] = useState("");
  const [country, setCountry] = useState<CountryCode>("CH");
  const [region, setRegion] = useState(REGIONS.CH[0] ?? "All regions");
  const [pctBand, setPctBand] = useState("60-80");
  const [category, setCategory] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [workModel, setWorkModel] = useState("");
  const [jobs, setJobs] = useState<JobDto[]>([]);
  const [listMode, setListMode] = useState<"browse" | "search">("browse");
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enabledFeedIds, setEnabledFeedIds] = useState<JsonFeedId[]>(() => [
    ...ALL_JSON_FEED_IDS,
  ]);

  const feedsSignature = [...enabledFeedIds].sort().join(",");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setInitialLoading(true);
      setError(null);
      try {
        const data = await fetchAllJobs(enabledFeedIds);
        if (!cancelled) {
          setJobs(data);
          setListMode("browse");
        }
      } catch {
        if (!cancelled)
          setError(
            "No se pudo conectar al servidor. ¿Está el backend en marcha?",
          );
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [feedsSignature]);

  const toggleLanguage = useCallback((id: string) => {
    setLanguages((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const toggleFeed = useCallback((id: JsonFeedId) => {
    setEnabledFeedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) return prev;
        return prev.filter((x) => x !== id) as JsonFeedId[];
      }
      const next = [...prev, id] as JsonFeedId[];
      next.sort(
        (a, b) => ALL_JSON_FEED_IDS.indexOf(a) - ALL_JSON_FEED_IDS.indexOf(b),
      );
      return next;
    });
  }, []);

  const runSearchWithParams = useCallback(
    async (params: SearchParams) => {
      setSearchLoading(true);
      setError(null);
      try {
        const data = await searchJobs({
          ...params,
          sources: params.sources ?? enabledFeedIds,
        });
        setJobs(data);
        setListMode("search");
      } catch {
        setError("Error en la búsqueda. Comprueba la API.");
      } finally {
        setSearchLoading(false);
      }
    },
    [enabledFeedIds],
  );

  const handleSearch = useCallback(() => {
    void runSearchWithParams({
      country,
      region: region === "All regions" ? null : region,
      pct_band: pctBand,
      category: category || null,
      languages,
      work_model: workModel || null,
      keywords: keywords.trim() || null,
    });
  }, [country, region, pctBand, category, languages, workModel, keywords, runSearchWithParams]);

  const applyPreset = useCallback(
    (preset: QuickSearchPreset) => {
      setCountry(preset.ui.country);
      setRegion(preset.ui.region);
      setPctBand(preset.ui.pctBand);
      setCategory(preset.ui.category);
      setLanguages([...preset.ui.languages]);
      setWorkModel(preset.ui.workModel);
      setKeywords(preset.ui.keywords ?? "");
      void runSearchWithParams(preset.params);
    },
    [runSearchWithParams],
  );

  const filteredBrowse =
    listMode === "browse"
      ? jobs.filter((j) => j.country === country)
      : jobs;

  const displayJobs = listMode === "browse" ? filteredBrowse : jobs;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <header className="relative mb-12 overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-card">
        <div className="pointer-events-none absolute inset-0 bg-noise-soft opacity-40" />
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-slate-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-8 p-8 sm:flex-row sm:items-start sm:justify-between sm:p-10 lg:p-12">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800 ring-1 ring-teal-600/15">
              Empleo DACH · datos agregados
            </p>
            <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              Tu filtro profesional para Suiza, Alemania y Austria
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
              País, región, pensum, categoría, idiomas y modelo de trabajo.
              Opcionalmente <strong className="font-semibold text-slate-800">palabras clave</strong>{" "}
              en título o empresa. La búsqueda activa incluye{" "}
              <strong className="font-semibold text-slate-800">
                puntuación de coincidencia
              </strong>
              . Fuente: APIs JSON públicas del backend.
            </p>
          </div>
          <Link
            href="/portales-suiza"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-teal-800 hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Directorio Suiza
            <svg
              className="h-4 w-4 opacity-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </header>

      <QuickSearchPresets
        onApply={applyPreset}
        disabled={searchLoading || initialLoading}
      />

      <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
        <Sidebar
          keywords={keywords}
          setKeywords={setKeywords}
          enabledFeedIds={enabledFeedIds}
          toggleFeed={toggleFeed}
          country={country}
          setCountry={setCountry}
          region={region}
          setRegion={setRegion}
          pctBand={pctBand}
          setPctBand={setPctBand}
          category={category}
          setCategory={setCategory}
          languages={languages}
          toggleLanguage={toggleLanguage}
          workModel={workModel}
          setWorkModel={setWorkModel}
          onSearch={handleSearch}
          loading={searchLoading}
        />

        <section className="min-w-0">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                {listMode === "search"
                  ? "Resultados filtrados"
                  : "Explorar por país"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {listMode === "search"
                  ? "Tabla de ofertas que cumplen los filtros y la búsqueda."
                  : "Tabla filtrada por el país seleccionado en el panel."}
              </p>            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200/80">
                {displayJobs.length}{" "}
                {displayJobs.length === 1 ? "puesto" : "puestos"}
              </span>
              {!initialLoading && displayJobs.length > 0 ? (
                <button
                  type="button"
                  onClick={() =>
                    downloadJobsAsCsv(displayJobs, listMode === "search" ? "busqueda" : "lista")
                  }
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100 transition hover:border-teal-600/30 hover:bg-teal-50/50 hover:text-teal-900"
                >
                  Exportar CSV
                </button>
              ) : null}
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200/90 bg-red-50/90 px-5 py-4 text-sm text-red-900 shadow-soft ring-1 ring-red-100">
              {error}
            </div>
          )}

          {initialLoading && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-600 shadow-soft">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-500" />
              Cargando ofertas desde la API…
            </div>
          )}

          {!initialLoading && !searchLoading && displayJobs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300/80 bg-white/80 p-14 text-center shadow-soft">
              <p className="text-base font-semibold text-slate-800">
                Sin resultados
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Amplía el rango de dedicación o relaja idioma / categoría.
              </p>
            </div>
          )}

          {!initialLoading && displayJobs.length > 0 && (
            <JobsTable
              jobs={displayJobs}
              emphasizeMatch={listMode === "search"}
            />
          )}        </section>
      </div>
    </div>
  );
}
