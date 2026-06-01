import type { JobDto } from "@/lib/api";

function labelWorkModel(m: JobDto["work_model"]) {
  if (m === "remote") return "Remoto";
  if (m === "hybrid") return "Híbrido";
  return "Presencial";
}

type Props = {
  jobs: JobDto[];
  /** Modo búsqueda: mostrar columna match con más peso */
  emphasizeMatch?: boolean;
};

export function JobsTable({ jobs, emphasizeMatch }: Props) {
  const showMatchCol =
    !!emphasizeMatch ||
    jobs.some((j) => typeof j.match_score === "number");

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-card ring-1 ring-slate-100/80">
      <table className="w-full min-w-[920px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/95">
            <th className="sticky left-0 z-10 whitespace-nowrap border-r border-slate-100 bg-slate-50/95 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Empresa
            </th>
            <th className="min-w-[200px] px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Puesto
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              País
            </th>
            <th className="min-w-[120px] px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Región
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Modelo
            </th>
            <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Pensum
            </th>
            <th className="min-w-[110px] px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Categoría
            </th>
            <th className="min-w-[100px] px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Fuente
            </th>
            {showMatchCol ? (
              <th className="whitespace-nowrap px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-teal-800">
                Match
              </th>
            ) : null}
            <th className="whitespace-nowrap px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Acción
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {jobs.map((job, idx) => {
            const pct =
              job.work_percentage !== null
                ? `${job.work_percentage}%`
                : "n/d";
            const zebra = idx % 2 === 1 ? "bg-slate-50/40" : "bg-white";
            return (
              <tr
                key={job.id}
                className={`transition hover:bg-teal-50/35 ${zebra}`}
              >
                <td className="sticky left-0 z-[1] max-w-[180px] border-r border-slate-100 px-4 py-3 align-middle font-semibold text-slate-900 shadow-[4px_0_12px_-4px_rgba(15,23,42,0.08)]">
                  <span className="line-clamp-2">{job.company}</span>
                </td>
                <td className="px-4 py-3 align-middle font-medium text-slate-800">
                  <span className="line-clamp-2">{job.title}</span>
                </td>
                <td className="px-3 py-3 align-middle">
                  <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 font-semibold tabular-nums text-slate-700 ring-1 ring-slate-200/80">
                    {job.country}
                  </span>
                </td>
                <td className="max-w-[160px] px-3 py-3 align-middle text-slate-700">
                  <span className="line-clamp-2">{job.region}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3 align-middle text-slate-700">
                  {labelWorkModel(job.work_model)}
                </td>
                <td className="whitespace-nowrap px-3 py-3 align-middle tabular-nums text-slate-700">
                  {pct}
                </td>
                <td className="max-w-[140px] px-3 py-3 align-middle text-slate-600">
                  <span className="line-clamp-2">{job.category}</span>
                </td>
                <td className="max-w-[120px] px-3 py-3 align-middle text-xs text-slate-600">
                  <span className="line-clamp-2">
                    {job.source_portal ?? "—"}
                  </span>
                </td>
                {showMatchCol ? (
                  <td className="whitespace-nowrap px-3 py-3 align-middle tabular-nums">
                    {typeof job.match_score === "number" ? (
                      <span
                        className={`inline-flex min-w-[2.75rem] justify-center rounded-lg px-2 py-1 text-xs font-bold ring-1 ${
                          emphasizeMatch
                            ? "bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-900 ring-teal-600/25"
                            : "bg-slate-50 text-slate-800 ring-slate-200"
                        }`}
                      >
                        {job.match_score}%
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                ) : null}
                <td className="whitespace-nowrap px-4 py-3 align-middle">
                  <a
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-800"
                  >
                    Ver
                    <svg
                      className="h-3 w-3 opacity-90"
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
