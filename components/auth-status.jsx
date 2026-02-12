"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// URLs relativas: Next.js reescribe /api/*, /auth/* al backend (ver next.config.mjs)

export default function AuthStatus() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch(`/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="h-2 w-2 animate-pulse rounded-full bg-slate-300" />
        Cargando sesión...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <Badge variant="info">Sin sesión</Badge>
        <a className="text-brand-600 underline" href="/auth">
          Iniciar sesión / Registrar
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
      <Badge variant="success">{user.role}</Badge>
      <span>
        {user.name} · {user.email}
      </span>
      <Button variant="secondary" size="sm" onClick={handleLogout}>
        Salir
      </Button>
    </div>
  );
}
