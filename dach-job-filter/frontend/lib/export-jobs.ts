import type { JobDto } from "@/lib/api";

function csvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/** Serializa la lista actual a CSV (UTF-8 con BOM para Excel en español). */
export function jobsToCsv(jobs: JobDto[]): string {
  const headers = [
    "título",
    "empresa",
    "país",
    "región",
    "categoría",
    "modelo",
    "pensum_pct",
    "idiomas",
    "portal_origen",
    "coincidencia",
    "url_postulación",
  ];
  const lines = [headers.map(csvCell).join(",")];
  for (const j of jobs) {
    const row = [
      j.title,
      j.company,
      j.country,
      j.region,
      j.category,
      j.work_model,
      j.work_percentage != null ? String(j.work_percentage) : "",
      j.languages.join(";"),
      j.source_portal,
      j.match_score != null ? String(j.match_score) : "",
      j.apply_url,
    ];
    lines.push(row.map(csvCell).join(","));
  }
  return "\uFEFF" + lines.join("\r\n");
}

export function downloadJobsAsCsv(jobs: JobDto[], label?: string): void {
  if (jobs.length === 0) return;
  const csv = jobsToCsv(jobs);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const safe =
    label?.replace(/[^\w\-]+/g, "_").slice(0, 40) || "resultados";
  const stamp = new Date().toISOString().slice(0, 16).replace(/[:-]/g, "");
  const a = document.createElement("a");
  a.href = url;
  a.download = `dach-empleos_${safe}_${stamp}.csv`;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
