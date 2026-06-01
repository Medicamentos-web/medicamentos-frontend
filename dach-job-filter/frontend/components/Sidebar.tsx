"use client";

import type { JsonFeedId } from "@/lib/json-feeds";
import { JSON_JOB_FEEDS } from "@/lib/json-feeds";
import type { CountryCode } from "@/lib/constants";
import {
  CATEGORIES,
  COUNTRIES,
  LANGUAGE_OPTIONS,
  PCT_BANDS,
  REGIONS,
  WORK_MODELS,
} from "@/lib/constants";

const field =
  "mt-2 w-full rounded-xl border-0 bg-slate-50/90 px-3.5 py-2.5 text-sm text-slate-900 shadow-inner shadow-slate-200/40 ring-1 ring-slate-200/80 transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/25";

type Props = {
  keywords: string;
  setKeywords: (k: string) => void;
  enabledFeedIds: readonly JsonFeedId[];
  toggleFeed: (id: JsonFeedId) => void;
  country: CountryCode;
  setCountry: (c: CountryCode) => void;
  region: string;
  setRegion: (r: string) => void;
  pctBand: string;
  setPctBand: (b: string) => void;
  category: string;
  setCategory: (c: string) => void;
  languages: string[];
  toggleLanguage: (id: string) => void;
  workModel: string;
  setWorkModel: (w: string) => void;
  onSearch: () => void;
  loading: boolean;
};

export function Sidebar({
  keywords,
  setKeywords,
  enabledFeedIds,
  toggleFeed,
  country,
  setCountry,
  region,
  setRegion,
  pctBand,
  setPctBand,
  category,
  setCategory,
  languages,
  toggleLanguage,
  workModel,
  setWorkModel,
  onSearch,
  loading,
}: Props) {
  const regions = REGIONS[country];

  return (
    <aside className="h-fit rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-card backdrop-blur-sm lg:sticky lg:top-[5.25rem] lg:self-start">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Filtros
        </h2>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          Panel
        </span>
      </div>

      <div className="mt-6 border-b border-slate-100 pb-6">
        <label
          htmlFor="search-keywords"
          className="text-xs font-semibold text-slate-700"
        >
          Palabras clave
        </label>
        <p className="mt-1 text-[11px] leading-snug text-slate-500">
          Título, empresa o ciudad (ej. Python Zürich). Todas las palabras deben aparecer.
        </p>
        <input
          id="search-keywords"
          type="search"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Opcional — p. ej. support remote"
          className={field}
          autoComplete="off"
        />
      </div>

      <fieldset className="mt-6 space-y-2 border-b border-slate-100 pb-6">
        <legend className="text-xs font-semibold text-slate-700">
          Fuentes de datos (API)
        </legend>
        <p className="text-[11px] leading-snug text-slate-500">
          Activa o desactiva agregadores. Quita <strong>Arbeitnow</strong> si
          quieres menos ruido fuera de Suiza (sigue viendo Remotive / Jobicy /
          Himalayas si están marcados).
        </p>
        <div className="mt-3 flex flex-col gap-2">
          {JSON_JOB_FEEDS.map((f) => (
            <label
              key={f.id}
              title={f.hint}
              className="flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2 hover:bg-slate-50/80"
            >
              <input
                type="checkbox"
                checked={enabledFeedIds.includes(f.id)}
                onChange={() => toggleFeed(f.id)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-teal-600 focus:ring-teal-600"
              />
              <span className="text-sm leading-snug text-slate-800">
                {f.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6 space-y-2 border-b border-slate-100 pb-6">
        <legend className="text-xs font-semibold text-slate-700">País</legend>
        <div className="mt-3 flex flex-col gap-1">
          {COUNTRIES.map((c) => (
            <label
              key={c.code}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition ${
                country === c.code
                  ? "bg-teal-50/90 ring-1 ring-teal-600/15"
                  : "hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="country"
                checked={country === c.code}
                onChange={() => {
                  setCountry(c.code);
                  setRegion(REGIONS[c.code][0] ?? "All regions");
                }}
                className="h-4 w-4 border-slate-300 text-teal-600 focus:ring-teal-600"
              />
              <span className="text-sm font-medium text-slate-800">
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-b border-slate-100 py-6">
        <label
          htmlFor="region"
          className="text-xs font-semibold text-slate-700"
        >
          Región
        </label>
        <select id="region" value={region} onChange={(e) => setRegion(e.target.value)} className={field}>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r === "All regions" ? "Todas las regiones" : r}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-2 border-b border-slate-100 py-6">
        <legend className="text-xs font-semibold text-slate-700">
          % de trabajo
        </legend>
        <div className="mt-3 flex flex-col gap-1">
          {PCT_BANDS.map((b) => (
            <label
              key={b.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition ${
                pctBand === b.id ? "bg-slate-50 ring-1 ring-slate-200/80" : "hover:bg-slate-50/80"
              }`}
            >
              <input
                type="radio"
                name="pct"
                checked={pctBand === b.id}
                onChange={() => setPctBand(b.id)}
                className="h-4 w-4 border-slate-300 text-teal-600 focus:ring-teal-600"
              />
              <span className="text-sm text-slate-700">{b.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="border-b border-slate-100 py-6">
        <label
          htmlFor="category"
          className="text-xs font-semibold text-slate-700"
        >
          Categoría
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={field}
        >
          <option value="">Cualquiera</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="space-y-2 border-b border-slate-100 py-6">
        <legend className="text-xs font-semibold text-slate-700">
          Idioma
        </legend>
        <div className="mt-3 flex flex-col gap-1">
          {LANGUAGE_OPTIONS.map((lang) => (
            <label
              key={lang.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50/80"
            >
              <input
                type="checkbox"
                checked={languages.includes(lang.id)}
                onChange={() => toggleLanguage(lang.id)}
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-600"
              />
              <span className="text-sm text-slate-700">{lang.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2 pt-6">
        <legend className="text-xs font-semibold text-slate-700">
          Modelo de trabajo
        </legend>
        <div className="mt-3 flex flex-col gap-1">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50/80">
            <input
              type="radio"
              name="wm"
              checked={workModel === ""}
              onChange={() => setWorkModel("")}
              className="h-4 w-4 border-slate-300 text-teal-600 focus:ring-teal-600"
            />
            <span className="text-sm text-slate-700">Cualquiera</span>
          </label>
          {WORK_MODELS.map((wm) => (
            <label
              key={wm.id}
              className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-50/80"
            >
              <input
                type="radio"
                name="wm"
                checked={workModel === wm.id}
                onChange={() => setWorkModel(wm.id)}
                className="h-4 w-4 border-slate-300 text-teal-600 focus:ring-teal-600"
              />
              <span className="text-sm text-slate-700">{wm.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onSearch}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-gradient-to-r from-teal-700 to-teal-800 py-3.5 text-sm font-semibold text-white shadow-card transition hover:from-teal-600 hover:to-teal-700 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:from-teal-700 disabled:hover:to-teal-800"
      >
        {loading ? "Buscando…" : "Buscar ofertas"}
      </button>
    </aside>
  );
}
