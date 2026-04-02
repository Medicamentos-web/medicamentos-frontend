"use client";

import { useState } from "react";

// MediControl Login – v2.0 (cache-bust 2026-02-17)

export default function LoginUI({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mustChange, setMustChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    const body = { email, password };
    const res = await fetch(`/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "No se pudo iniciar sesión.");
      return;
    }
    const session = {
      id: data.user.id,
      nombre: data.user.name,
      email: data.user.email,
      family_id: data.user.family_id,
      role: data.user.role,
      token: data.token || "",
      must_change_password: data.user.must_change_password,
    };
    localStorage.setItem("userSession", JSON.stringify(session));
    setUser(session);
    setMustChange(!!data.user.must_change_password);
  };

  const handleFirstChange = async (event) => {
    event.preventDefault();
    setError("");
    const res = await fetch(`/auth/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "No se pudo cambiar la contraseña.");
      return;
    }
    setMustChange(false);
  };

  const handleForgot = async (event) => {
    event.preventDefault();
    setResetMessage("");
    const forgotBody = { email };
    const res = await fetch(`/auth/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(forgotBody),
    });
    const data = await res.json();
    if (!res.ok) {
      setResetMessage(data.error || "No se pudo solicitar el cambio.");
      return;
    }
    if (data.reset_token) {
      setResetToken(data.reset_token);
    }
    setResetMessage("Revisa tu correo o usa el token de recuperación.");
  };

  const handleReset = async (event) => {
    event.preventDefault();
    setResetMessage("");
    const res = await fetch(`/auth/reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: resetToken,
        new_password: resetNewPassword,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setResetMessage(data.error || "No se pudo cambiar la contraseña.");
      return;
    }
    setResetMessage("Contraseña actualizada. Ya puedes iniciar sesión.");
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] flex flex-col items-center justify-center px-6 py-10">
      {/* Logo / Branding */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/30">
          <span className="text-white font-extrabold text-3xl">M</span>
        </div>
        <h1 className="text-2xl font-bold text-white">MediControl</h1>
        <p className="mt-1 text-sm text-slate-400">Ihre Medikamente. Unter Kontrolle.</p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4"
      >
        {error ? (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        ) : null}

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Email</label>
          <input
            className="w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Contraseña</label>
          <input
            className="w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#007AFF] py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform"
        >
          Entrar
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600/50" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0f172a] px-3 text-slate-500">Oder anmelden mit</span>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href="/auth/google"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-600/50 bg-slate-800/50 py-3 text-sm font-medium text-white hover:bg-slate-700/50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </a>
          <a
            href="/auth/apple"
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-600/50 bg-slate-800/50 py-3 text-sm font-medium text-white hover:bg-slate-700/50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Apple
          </a>
        </div>

        <button
          type="button"
          onClick={() => setShowReset((prev) => !prev)}
          className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-300 transition-colors"
        >
          Olvidé mi contraseña
        </button>

        {showReset ? (
          <div className="space-y-3 rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
            <p className="text-xs font-semibold text-slate-400">Recuperación</p>
            {resetMessage ? (
              <p className="text-xs text-emerald-400">{resetMessage}</p>
            ) : null}
            <button
              type="button"
              onClick={handleForgot}
              className="w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white"
            >
              Solicitar token
            </button>
            <input
              className="w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#007AFF] focus:outline-none"
              value={resetToken}
              onChange={(event) => setResetToken(event.target.value)}
              placeholder="Pega tu token aquí"
            />
            <input
              className="w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#007AFF] focus:outline-none"
              value={resetNewPassword}
              onChange={(event) => setResetNewPassword(event.target.value)}
              type="password"
              placeholder="Nueva contraseña"
            />
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-xl bg-slate-700 py-2.5 text-xs font-bold text-white"
            >
              Cambiar contraseña
            </button>
            <p className="text-[10px] text-slate-500">
              Si no recuerdas tu email, contacta al administrador.
            </p>
          </div>
        ) : null}
      </form>

      {mustChange ? (
        <form
          onSubmit={handleFirstChange}
          className="mt-6 w-full max-w-sm space-y-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5"
        >
          <h2 className="text-sm font-bold text-amber-400">
            Cambia tu contraseña inicial
          </h2>
          <input
            className="w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            type="password"
            placeholder="Contraseña actual"
            required
          />
          <input
            className="w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            type="password"
            placeholder="Nueva contraseña"
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-white shadow-lg"
          >
            Actualizar contraseña
          </button>
        </form>
      ) : null}
    </div>
  );
}
