import { PortalDirectory } from "@/components/PortalDirectory";
import { fetchSwissPortalsCatalog } from "@/lib/server-api";

export const metadata = {
  title: "Portales Suiza",
  description:
    "Directorio de portales, bolsa IT, staffing y recursos públicos para trabajar en Suiza.",
};

export const dynamic = "force-dynamic";

export default async function PortalesSuizaPage() {
  const data = await fetchSwissPortalsCatalog();

  if (!data) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50 to-white px-6 py-10 text-center shadow-soft ring-1 ring-amber-100/80">
          <h1 className="text-xl font-semibold text-amber-950">
            No se pudo cargar el directorio
          </h1>
          <p className="mt-3 text-sm text-amber-900/90">
            Arranca el backend en{" "}
            <code className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs font-medium">
              {process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8765"}
            </code>{" "}
            y recarga esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <header className="relative mb-12 max-w-3xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-card sm:p-10">
        <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-teal-400/12 blur-3xl" />
        <div className="relative">
          <p className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-teal-800 ring-1 ring-teal-600/15">
            Directorio · Suiza (CH)
          </p>
          <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Portales donde buscar trabajo en Suiza
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Sitios generales, IT, staffing, internacionales con filtro Suiza,
            información pública SECO y universidades. Usa el recuadro de búsqueda
            múltiple para abrir la misma consulta en varios portales; las ofertas
            en la pestaña <strong className="text-slate-800">Búsqueda</strong>{" "}
            siguen viniendo solo de las APIs del backend.
          </p>
          <p className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 px-4 py-3 text-xs leading-relaxed text-slate-500 ring-1 ring-white/60">
            {data.disclaimer}
          </p>
        </div>
      </header>

      <PortalDirectory
        portals={data.portals}
        categoryLabels={data.category_labels}
      />
    </div>
  );
}
