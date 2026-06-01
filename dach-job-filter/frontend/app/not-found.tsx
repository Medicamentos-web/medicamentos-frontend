import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-12 shadow-card">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          Página no encontrada
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          La ruta no existe o ha cambiado.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-teal-800"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
