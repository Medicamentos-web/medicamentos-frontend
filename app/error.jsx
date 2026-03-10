"use client";

import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [showDetail, setShowDetail] = useState(false);
  const msg = error?.message || String(error);

  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="min-h-dvh bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 text-6xl">⚠️</div>
      <h1 className="text-xl font-bold text-white mb-2">Algo ha fallado</h1>
      <p className="text-slate-400 text-sm mb-6 max-w-sm">
        Se ha producido un error al cargar la aplicación. Prueba a recargar la página.
      </p>
      <button
        onClick={() => setShowDetail((d) => !d)}
        className="text-xs text-slate-500 mb-2 underline"
      >
        {showDetail ? "Ocultar detalle" : "Ver detalle del error"}
      </button>
      {showDetail && (
        <pre className="mb-4 p-3 bg-slate-900 rounded text-left text-[10px] text-red-300 overflow-auto max-w-full max-h-32">
          {msg}
        </pre>
      )}
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-xl bg-[#007AFF] text-white font-bold text-sm active:scale-95 transition-transform"
      >
        Reintentar
      </button>
      <p className="mt-6 text-[10px] text-slate-500">
        Si el problema continúa, contacta al soporte.
      </p>
    </div>
  );
}
