"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-10 shadow-card">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-700">
          Error
        </p>
        <h1 className="mt-3 text-lg font-bold text-slate-900">
          Algo salió mal al cargar esta página
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {error.message ||
            "Prueba a recargar o revisa la consola del navegador (F12)."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-teal-800"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
