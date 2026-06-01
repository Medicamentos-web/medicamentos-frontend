import type { ReactNode } from "react";
import type { JobDto } from "@/lib/api";

function labelWorkModel(m: JobDto["work_model"]) {
  if (m === "remote") return "Remoto";
  if (m === "hybrid") return "Híbrido";
  return "Presencial";
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-slate-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200/70">
      {children}
    </span>
  );
}

type Props = {
  job: JobDto;
};

export function JobCard({ job }: Props) {
  const pct =
    job.work_percentage !== null ? `${job.work_percentage}%` : "n/d";

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft transition hover:border-teal-600/20 hover:shadow-card">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-500/70 to-teal-500/0 opacity-0 transition group-hover:opacity-100" />
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Chip>{job.country}</Chip>
              <Chip>{labelWorkModel(job.work_model)}</Chip>
            </div>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-teal-700">
              {job.company}
            </p>
            <h3 className="mt-1 text-balance text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {job.title}
            </h3>
          </div>
          {typeof job.match_score === "number" && (
            <div className="shrink-0 text-right">
              <span className="inline-flex items-center rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 px-3 py-1.5 text-base font-bold tabular-nums text-teal-900 ring-1 ring-teal-600/20">
                {job.match_score}
                <span className="ml-0.5 text-xs font-semibold text-teal-700">
                  %
                </span>
              </span>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Match
              </p>
            </div>
          )}
        </div>

        <dl className="mt-5 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-0.5">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Fuente
            </dt>
            <dd className="font-medium text-slate-800">
              {job.source_portal ?? "—"}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Región
            </dt>
            <dd className="font-medium text-slate-800">{job.region}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Pensum
            </dt>
            <dd className="font-medium text-slate-800">{pct}</dd>
          </div>
          <div className="flex flex-col gap-0.5">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Categoría
            </dt>
            <dd className="font-medium text-slate-800">{job.category}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-5">
          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-teal-800 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Ver oferta
            <svg
              className="ml-2 h-4 w-4 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
