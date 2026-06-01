"use client";

import { useMemo, useState } from "react";
import type { SwissPortalRow } from "@/lib/types-portals";
import {
  buildPortalSearchUrl,
  mergePortalSearchTemplates,
  openPortalSearchTabs,
  portalsForMultiOpenSearch,
  type PortalSearchFilters,
  type PortalSearchLink,
} from "@/lib/portal-search-url";

type Props = {
  portals: SwissPortalRow[];
  categoryLabels: Record<string, string>;
};

export function PortalDirectory({ portals, categoryLabels }: Props) {
  const [q, setQ] = useState("");
  const [extKeywords, setExtKeywords] = useState("");
  const [extCity, setExtCity] = useState("");
  const [extPct, setExtPct] = useState("");
  const [popupHint, setPopupHint] = useState<string | null>(null);
  const [manualPortalLinks, setManualPortalLinks] = useState<PortalSearchLink[] | null>(
    null,
  );

  const clearOpenHints = () => {
    setPopupHint(null);
    setManualPortalLinks(null);
  };

  const portalFilters = useMemo((): PortalSearchFilters => {
    const pctRaw = extPct.trim();
    let workPct: number | null = null;
    if (pctRaw) {
      const n = Number.parseInt(pctRaw, 10);
      if (Number.isFinite(n)) workPct = n;
    }
    return {
      keywords: extKeywords,
      city: extCity.trim() || undefined,
      workPct,
    };
  }, [extKeywords, extCity, extPct]);

  const searchSummary = useMemo(() => {
    const parts = [extKeywords.trim()];
    if (extCity.trim()) parts.push(extCity.trim());
    if (extPct.trim()) parts.push(`${extPct.trim()}%`);
    return parts.filter(Boolean).join(" · ");
  }, [extKeywords, extCity, extPct]);

  const portalsMerged = useMemo(
    () => mergePortalSearchTemplates(portals),
    [portals],
  );

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return portalsMerged;
    return portalsMerged.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.focus.toLowerCase().includes(needle),
    );
  }, [portalsMerged, q]);

  const grouped = useMemo(() => {
    const m = new Map<string, SwissPortalRow[]>();
    for (const p of filtered) {
      const arr = m.get(p.category) ?? [];
      arr.push(p);
      m.set(p.category, arr);
    }
    return m;
  }, [filtered]);

  const categoryOrder = Object.keys(categoryLabels);

  /** Incluye respaldo local si la API no envía `search_url_template`. */
  const portalsForMultiOpen = useMemo(
    () => portalsForMultiOpenSearch(portals),
    [portals],
  );

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl border border-teal-600/15 bg-gradient-to-br from-teal-50/95 via-white to-white p-6 shadow-card ring-1 ring-teal-700/10 sm:p-8">
        <div className="pointer-events-none absolute -left-10 top-0 h-32 w-32 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            Una consulta, varios portales a la vez
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Los sitios suizos no suelen ofrecer una API única para esta app;
            escribe palabras clave y, si quieres, ciudad (ej. Zürich) y pensum
            (ej. 80). Indeed y LinkedIn usan la ciudad en la URL; en jobs.ch y Jobup
            se combina todo en la búsqueda. El refinamiento exacto del % depende de
            cada portal.
          </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1 space-y-3">
            <div>
            <label
              htmlFor="portal-ext-q"
              className="mb-2 block text-xs font-semibold text-slate-700"
            >
              Palabras clave (ej. IT Support, German Teacher)
            </label>
            <input
              id="portal-ext-q"
              type="search"
              placeholder="Escribe y pulsa el botón…"
              value={extKeywords}
              onChange={(e) => {
                setExtKeywords(e.target.value);
                clearOpenHints();
              }}
              className="w-full rounded-xl border-0 bg-white/95 px-4 py-3 text-sm shadow-inner shadow-slate-200/40 ring-1 ring-slate-200/80 transition focus:outline-none focus:ring-2 focus:ring-teal-600/30"
            />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="portal-ext-city"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Ciudad / región (opcional)
                </label>
                <input
                  id="portal-ext-city"
                  type="text"
                  placeholder="ej. Zürich"
                  value={extCity}
                  onChange={(e) => {
                    setExtCity(e.target.value);
                    clearOpenHints();
                  }}
                  autoComplete="address-level2"
                  className="w-full rounded-xl border-0 bg-white/95 px-4 py-3 text-sm shadow-inner shadow-slate-200/40 ring-1 ring-slate-200/80 transition focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
              </div>
              <div>
                <label
                  htmlFor="portal-ext-pct"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Pensum % (opcional)
                </label>
                <input
                  id="portal-ext-pct"
                  type="number"
                  inputMode="numeric"
                  min={10}
                  max={100}
                  step={5}
                  placeholder="ej. 80"
                  value={extPct}
                  onChange={(e) => {
                    setExtPct(e.target.value);
                    clearOpenHints();
                  }}
                  className="w-full rounded-xl border-0 bg-white/95 px-4 py-3 text-sm shadow-inner shadow-slate-200/40 ring-1 ring-slate-200/80 transition focus:outline-none focus:ring-2 focus:ring-teal-600/30"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            disabled={!extKeywords.trim() || portalsForMultiOpen.length === 0}
            onClick={() => {
              const { opened, items } = openPortalSearchTabs(
                portalsForMultiOpen,
                portalFilters,
              );
              if (items.length === 0) {
                setPopupHint(null);
                setManualPortalLinks(null);
                return;
              }
              if (opened < items.length) {
                setPopupHint(
                  `Solo se abrieron ${opened} de ${items.length} pestañas automáticamente (Chrome/Edge bloquea varios window.open). Abre el resto con los enlaces de abajo: un clic por línea = una pestaña nueva.`,
                );
                setManualPortalLinks(items);
              } else {
                setPopupHint(null);
                setManualPortalLinks(null);
              }
            }}
            className="shrink-0 self-stretch rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-teal-800 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:shadow-card sm:self-end"
          >
            Abrir en {portalsForMultiOpen.length}{" "}
            {portalsForMultiOpen.length === 1 ? "portal" : "portales"}
          </button>
        </div>
        {popupHint ? (
          <p
            role="status"
            className="mt-3 rounded-xl border border-amber-200 bg-amber-50/90 px-3 py-2 text-xs font-medium text-amber-950"
          >
            {popupHint}
          </p>
        ) : null}
        {manualPortalLinks && manualPortalLinks.length > 0 ? (
          <ul
            className="mt-3 divide-y divide-slate-200/80 rounded-xl border border-slate-200/90 bg-white/95 text-sm shadow-inner ring-1 ring-slate-100"
            aria-label="Abrir búsqueda en cada portal"
          >
            {manualPortalLinks.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2.5 font-medium text-teal-800 transition hover:bg-teal-50/80"
                >
                  {item.name}
                  <span className="ml-1 text-xs font-normal text-slate-500">→ nueva pestaña</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {portalsForMultiOpen.length === 0 ? (
          <p className="mt-3 text-xs font-medium text-amber-900">
            No hay portales con búsqueda múltiple configurada en el catálogo.
          </p>
        ) : (
          <p className="mt-3 text-xs text-slate-500">
            Se abrirán pestañas en los {portalsForMultiOpen.length} sitios del directorio
            (URL directa o búsqueda Google <code className="text-[10px]">site:…</code> donde
            no hay buscador público fiable). Con muchas pestañas, usa los enlaces manuales.
            abajo. Si solo se abre una pestaña, usa la lista de enlaces que aparece
            bajo el aviso (un clic por portal).
          </p>
        )}
        </div>
      </div>

      <div className="relative">
        <label htmlFor="portal-q" className="sr-only">
          Filtrar la lista de portales por nombre
        </label>
        <input
          id="portal-q"
          type="search"
          placeholder="Filtrar esta lista por nombre o descripción…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 pl-11 text-sm shadow-inner shadow-slate-200/30 ring-1 ring-slate-200/80 transition focus:outline-none focus:ring-2 focus:ring-teal-600/25"
        />
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      <p className="text-sm text-slate-500">
        Mostrando{" "}
        <span className="font-medium text-slate-700">{filtered.length}</span>{" "}
        de {portals.length} entradas.
      </p>

      {categoryOrder.map((cat) => {
        const rows = grouped.get(cat);
        if (!rows?.length) return null;
        const title = categoryLabels[cat] ?? cat;
        return (
          <section key={cat} className="scroll-mt-24">
            <h2 className="mb-4 border-b border-slate-100 pb-2 text-base font-semibold text-slate-900">
              {title}
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((p) => {
                const deepLink =
                  extKeywords.trim() && p.search_url_template
                    ? buildPortalSearchUrl(p.search_url_template, portalFilters)
                    : null;
                return (
                  <li key={p.id}>
                    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition hover:border-teal-600/25 hover:shadow-card">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 flex-col p-4"
                      >
                        <span className="font-medium text-teal-900">
                          {p.name}
                        </span>
                        <span className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                          {p.focus}
                        </span>
                        <span className="mt-3 text-xs font-medium text-teal-700">
                          Abrir sitio →
                        </span>
                      </a>
                      {deepLink ? (
                        <a
                          href={deepLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border-t border-slate-100 bg-teal-50/50 px-4 py-2.5 text-xs font-semibold text-teal-900 transition hover:bg-teal-50"
                        >
                          Buscar «{searchSummary}» aquí →
                        </a>
                      ) : p.search_url_template ? (
                        <p className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400">
                          Escribe palabras arriba para un enlace de búsqueda.
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
          Ningún portal coincide con tu búsqueda.
        </p>
      )}
    </div>
  );
}
