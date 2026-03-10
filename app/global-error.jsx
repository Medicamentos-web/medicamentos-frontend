"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="min-h-dvh bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 text-6xl">⚠️</div>
        <h1 className="text-xl font-bold text-white mb-2">Error de la aplicación</h1>
        <p className="text-slate-400 text-sm mb-6 max-w-sm">
          Se ha producido un error. Prueba a recargar la página.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-[#007AFF] text-white font-bold text-sm"
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
