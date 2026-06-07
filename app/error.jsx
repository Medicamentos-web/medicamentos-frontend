"use client";

import { useEffect, useState } from "react";

export default function Error({ error, reset }) {
  const [showDetail, setShowDetail] = useState(false);
  const [copied, setCopied] = useState(false);
  const msg = error?.message || String(error);
  const stack = error?.stack || "";
  const digest = error?.digest || "";
  const ua =
    typeof navigator !== "undefined" ? navigator.userAgent : "(sin userAgent)";
  const url =
    typeof window !== "undefined" ? window.location.href : "(sin url)";
  const fullDetail = [
    `URL: ${url}`,
    `UA:  ${ua}`,
    digest ? `Digest: ${digest}` : null,
    `Message: ${msg}`,
    stack ? `Stack:\n${stack}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  useEffect(() => {
    console.error("[App Error]", error);
  }, [error]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fullDetail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-dvh bg-[#0f172a] flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 text-6xl">⚠️</div>
      <h1 className="text-xl font-bold text-white mb-2">Algo ha fallado</h1>
      <p className="text-slate-400 text-sm mb-4 max-w-sm">
        Se ha producido un error al cargar la aplicación. Prueba a recargar la página.
      </p>
      <button
        onClick={() => setShowDetail((d) => !d)}
        className="text-xs text-slate-500 mb-2 underline"
      >
        {showDetail ? "Ocultar detalle" : "Ver detalle del error"}
      </button>
      {showDetail && (
        <div className="w-full max-w-md mb-4">
          <pre className="p-3 bg-slate-900 rounded text-left text-[10px] text-red-300 overflow-auto max-h-64 whitespace-pre-wrap break-all">
            {fullDetail}
          </pre>
          <button
            onClick={copy}
            className="mt-2 px-4 py-2 rounded-lg bg-slate-700 text-white text-xs font-medium active:scale-95 transition-transform"
          >
            {copied ? "Copiado ✓" : "Copiar detalle"}
          </button>
        </div>
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
