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
    <div className="min-h-dvh bg-[#0a0c0e] flex items-center justify-center px-4 py-6">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[2rem] bg-white p-6 sm:p-8 shadow-2xl"
      >
        <h1 className="text-xl font-black italic text-slate-900">
          Acceso Pacientes
        </h1>
        <p className="text-xs text-slate-500 mt-2">
          Ingresa con tu cuenta para ver tus tomas.
        </p>
        {error ? (
          <div className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-500">
            {error}
          </div>
        ) : null}
        <label className="mt-5 block text-xs font-bold uppercase tracking-widest text-slate-500">
          Family ID
        </label>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          value={familyId}
          onChange={(event) => setFamilyId(event.target.value)}
          placeholder="1"
          required
        />
        <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-slate-500">
          Email
        </label>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="alertas.medicamentos@gmail.com"
          type="email"
          required
        />
        <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-slate-500">
          Password
        </label>
        <input
          className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
        />
        <button
          type="submit"
          className="mt-6 w-full rounded-2xl bg-[#007AFF] py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg"
        >
          Entrar
        </button>

        <button
          type="button"
          onClick={() => setShowReset((prev) => !prev)}
          className="mt-4 w-full rounded-2xl border border-slate-200 py-2 text-xs font-bold uppercase tracking-widest text-slate-500"
        >
          Olvidé mi contraseña o e-mail
        </button>

        {showReset ? (
          <div className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Recuperación
            </p>
            {resetMessage ? (
              <p className="text-xs text-slate-600">{resetMessage}</p>
            ) : null}
            <button
              type="button"
              onClick={handleForgot}
              className="w-full rounded-2xl bg-emerald-500 py-2 text-xs font-black uppercase tracking-widest text-white"
            >
              Solicitar token
            </button>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Token
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-xs"
              value={resetToken}
              onChange={(event) => setResetToken(event.target.value)}
              placeholder="Pega tu token aquí"
            />
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Nueva contraseña
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-xs"
              value={resetNewPassword}
              onChange={(event) => setResetNewPassword(event.target.value)}
              type="password"
            />
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-2xl bg-[#0f172a] py-2 text-xs font-black uppercase tracking-widest text-white"
            >
              Cambiar contraseña
            </button>
            <p className="text-[10px] text-slate-400">
              Si no recuerdas tu email, contacta al administrador.
            </p>
          </div>
        ) : null}
      </form>

      {mustChange ? (
        <form
          onSubmit={handleFirstChange}
          className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-2xl mt-6"
        >
          <h2 className="text-sm font-black uppercase text-slate-700">
            Cambia tu contraseña inicial
          </h2>
          <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Contraseña actual
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            type="password"
            required
          />
          <label className="mt-4 block text-xs font-bold uppercase tracking-widest text-slate-500">
            Nueva contraseña
          </label>
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            type="password"
            required
          />
          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-emerald-500 py-3 text-sm font-black uppercase tracking-widest text-white shadow-lg"
          >
            Actualizar contraseña
          </button>
        </form>
      ) : null}
    </div>
  );
}
