"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Flag, MessageCircle, Vote } from "lucide-react";

const links = [
  { href: "/", label: "Partidos", icon: MessageCircle },
  { href: "/vote", label: "Votar", icon: Vote },
  { href: "/stats", label: "Estadísticas", icon: BarChart3 },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
            <Flag className="w-4 h-4 text-white" />
          </span>
          VotaSuiza
        </Link>
        <nav className="flex gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-red-50 text-red-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
