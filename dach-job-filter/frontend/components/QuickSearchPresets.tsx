"use client";

import type { QuickSearchPreset } from "@/lib/search-presets";
import { SWISS_QUICK_PRESETS } from "@/lib/search-presets";

type Props = {
  onApply: (preset: QuickSearchPreset) => void;
  disabled?: boolean;
};

export function QuickSearchPresets({ onApply, disabled }: Props) {
  return (
    <div className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-6 shadow-card backdrop-blur-sm sm:p-7">
      <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700">
              Atajos
            </p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-slate-900">
              Búsqueda rápida · Suiza
            </h2>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
          Un clic aplica filtros y consulta el API agregado. Para ~20&nbsp;% de
          jornada usa la banda <strong className="text-slate-800">20–40&nbsp;%</strong>{" "}
          (muchas ofertas no traen porcentaje exacto).
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {SWISS_QUICK_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              disabled={disabled}
              title={p.hint}
              onClick={() => onApply(p)}
              className="rounded-xl border border-slate-200/90 bg-slate-50/90 px-4 py-2 text-left text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-white/60 transition hover:border-teal-300/80 hover:bg-teal-50/90 hover:text-teal-950 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-45"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
