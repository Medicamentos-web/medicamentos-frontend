import Link from "next/link";
import { MainNav } from "@/components/MainNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl backdrop-saturate-150">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-500/25 to-transparent" />
        <div className="relative mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3 font-semibold tracking-tight text-slate-900"
          >
            <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-sm font-bold text-white shadow-card ring-2 ring-white ring-offset-2 ring-offset-slate-100 transition group-hover:shadow-glow">
              D
            </span>
            <span className="hidden flex-col sm:flex">
              <span className="leading-none">DACH Job Filter</span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
                CH · DE · AT
              </span>
            </span>
          </Link>
          <MainNav />
        </div>
      </header>
      <main className="relative flex-1">{children}</main>
      <footer className="border-t border-slate-200/80 bg-white/90 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs leading-relaxed text-slate-500 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-2xl">
            Agregación de ofertas vía APIs públicas (Arbeitnow, Remotive,
            Jobicy, Himalayas). Directorio Suiza con enlaces externos
            informativos.
          </p>
          <p className="mt-3 text-slate-400">
            Sin garantía de exhaustividad · Revise siempre el portal original.
          </p>
        </div>
      </footer>
    </div>
  );
}
