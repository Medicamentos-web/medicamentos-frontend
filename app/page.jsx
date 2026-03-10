"use client";

import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("./HomePageContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-dvh bg-[#0f172a] flex items-center justify-center">
      <div className="text-slate-500 text-sm">Cargando...</div>
    </div>
  ),
});

export default function Page() {
  return <HomePage />;
}
