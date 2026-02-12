"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// URLs relativas: Next.js reescribe /api/*, /auth/* al backend (ver next.config.mjs)

const inputClass =
  "mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-brand-400 focus:outline-none";

export default function AuthPage() {
  const [familyName, setFamilyName] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    family_id: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    family_id: "",
  });
  const [message, setMessage] = useState("");

  const createFamily = async () => {
    setMessage("");
    const res = await fetch(`/api/families`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: familyName }),
    });
    const data = await res.json();
    if (res.ok) {
      setFamilyId(String(data.id));
      setRegisterData((prev) => ({ ...prev, family_id: String(data.id) }));
      setLoginData((prev) => ({ ...prev, family_id: String(data.id) }));
      setMessage(`Familia creada: ID ${data.id}`);
    } else {
      setMessage(data.error || "No se pudo crear la familia");
    }
  };

  const register = async () => {
    setMessage("");
    const res = await fetch(`/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...registerData,
        family_id: Number(registerData.family_id),
      }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Registro exitoso. Sesión iniciada." : data.error);
  };

  const login = async () => {
    setMessage("");
    const res = await fetch(`/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...loginData,
        family_id: Number(loginData.family_id),
      }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Login exitoso." : data.error);
  };

  return (
    <main className="mx-auto w-full max-w-lg space-y-6 px-4 py-6">
      <div className="space-y-2">
        <Badge variant="info">Acceso</Badge>
        <h1 className="text-2xl font-semibold text-slate-900">
          Autenticación y Familias
        </h1>
        <p className="text-sm text-slate-500">
          Crea una familia, registra usuarios y entra con tu cuenta.
        </p>
        {message ? (
          <p className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
            {message}
          </p>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>1) Crear familia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Nombre de familia</label>
            <input
              className={inputClass}
              value={familyName}
              onChange={(event) => setFamilyName(event.target.value)}
              placeholder="Familia López"
            />
          </div>
          <Button size="lg" onClick={createFamily}>
            Crear familia
          </Button>
          {familyId ? (
            <p className="text-sm text-slate-600">
              ID de familia creado: <strong>{familyId}</strong>
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>2) Registrar usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Family ID</label>
            <input
              className={inputClass}
              value={registerData.family_id}
              onChange={(event) =>
                setRegisterData((prev) => ({
                  ...prev,
                  family_id: event.target.value,
                }))
              }
              placeholder="1"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Nombre</label>
            <input
              className={inputClass}
              value={registerData.name}
              onChange={(event) =>
                setRegisterData((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Ana López"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              className={inputClass}
              type="email"
              value={registerData.email}
              onChange={(event) =>
                setRegisterData((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="ana@mail.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              className={inputClass}
              type="password"
              value={registerData.password}
              onChange={(event) =>
                setRegisterData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              placeholder="******"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Rol</label>
            <select
              className={inputClass}
              value={registerData.role}
              onChange={(event) =>
                setRegisterData((prev) => ({ ...prev, role: event.target.value }))
              }
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
              <option value="superuser">superuser</option>
            </select>
          </div>
          <Button size="lg" onClick={register}>
            Registrar y entrar
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>3) Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-600">Family ID</label>
            <input
              className={inputClass}
              value={loginData.family_id}
              onChange={(event) =>
                setLoginData((prev) => ({
                  ...prev,
                  family_id: event.target.value,
                }))
              }
              placeholder="1"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Email</label>
            <input
              className={inputClass}
              type="email"
              value={loginData.email}
              onChange={(event) =>
                setLoginData((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="ana@mail.com"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Password</label>
            <input
              className={inputClass}
              type="password"
              value={loginData.password}
              onChange={(event) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              placeholder="******"
            />
          </div>
          <Button size="lg" onClick={login}>
            Iniciar sesión
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
