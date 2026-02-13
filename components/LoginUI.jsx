"use client";

import { useState } from "react";

// URLs relativas: Next.js reescribe /api/*, /auth/* al backend (ver next.config.mjs)

export default function LoginUI({ setUser }) {
  const [familyId, setFamilyId] = useState("1");
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
    const res = await fetch(`/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        family_id: Number(familyId),
        email,
        password,
      }),
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
    const res = await fetch(`/auth/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        family_id: Number(familyId),
        email,
      }),
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
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#007AFF] shadow-lg shadow-blue-500/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Medicamentos</h1>
        <p className="mt-1 text-sm text-slate-400">Gestión de tomas familiar</p>
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
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">Family ID</label>
          <input
            className="w-full rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-[#007AFF] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
            value={familyId}
            onChange={(event) => setFamilyId(event.target.value)}
            placeholder="1"
            required
          />
        </div>

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
