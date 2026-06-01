"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Búsqueda", match: (p: string) => p === "/" },
  {
    href: "/portales-suiza",
    label: "Portales Suiza",
    match: (p: string) => p.startsWith("/portales-suiza"),
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 rounded-full bg-slate-100/80 p-1 ring-1 ring-slate-200/60 backdrop-blur-sm">
      {links.map(({ href, label, match }) => {
        const active = match(pathname ?? "");
        return (
          <Link
            key={href}
            href={href}
            className={`relative rounded-full px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
              active
                ? "bg-white text-slate-900 shadow-card ring-1 ring-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
