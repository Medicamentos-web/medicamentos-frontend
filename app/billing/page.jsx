"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const PLANS = [
  {
    name: "Prueba gratuita",
    price: "CHF 0",
    period: "30 días",
    features: ["1 familia", "Hasta 5 medicamentos", "Alertas básicas", "Soporte por email"],
    current: true,
    cta: null,
  },
  {
    name: "Plan Familiar",
    price: "CHF 9.90",
    period: "/ mes",
    features: [
      "Medicamentos ilimitados",
      "Alertas inteligentes",
      "Escaneo OCR de recetas",
      "Historial médico completo",
      "Push notifications",
      "Contacto médico directo",
      "PDF de recetas",
      "Soporte prioritario",
    ],
    recommended: true,
    cta: "Activar plan",
  },
];

function BillingPageContent() {
  const [user, setUser] = useState(null);
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("userSession");
      if (saved) {
        const s = JSON.parse(saved);
        setUser(s);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!user) return;
    loadBilling();
  }, [user]);

  const loadBilling = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/billing/status?family_id=${user.family_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setBilling(data);
      else setError(data.error || "Error");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async () => {
    if (!user) return;
    setCheckoutLoading(true);
    setError("");
    try {
      const res = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
        body: JSON.stringify({ family_id: user.family_id }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Error al iniciar pago");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const openPortal = async () => {
    if (!user) return;
    setPortalLoading(true);
    setError("");
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
        body: JSON.stringify({ family_id: user.family_id }),
      });
      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Error al abrir portal");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setPortalLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-dvh bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
          <p className="text-slate-600">Inicia sesión para ver tu suscripción.</p>
          <a href="/" className="mt-4 inline-block bg-[#007AFF] text-white text-sm font-bold px-6 py-3 rounded-xl">
            Ir al login
          </a>
        </div>
      </div>
    );
  }

  const success = searchParams.get("success") === "1";
  const cancelled = searchParams.get("cancelled") === "1";

  return (
    <div className="min-h-dvh bg-[#F2F4F8]">
      {/* Header */}
      <div className="bg-[#0f172a] text-white px-5 pt-[env(safe-area-inset-top,12px)] pb-4">
        <div className="flex justify-between items-center pt-3">
          <div>
            <h1 className="text-sm font-bold text-emerald-400">MEDICAMENTOS</h1>
            <p className="text-[10px] text-slate-400 mt-0.5">Facturación y suscripción</p>
          </div>
          <a href="/" className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg font-bold">
            ← Volver
          </a>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Success / Cancelled banners */}
        {success && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-emerald-700">✅ Pago realizado con éxito</p>
            <p className="text-xs text-emerald-600 mt-1">Tu suscripción está activa. Todas las funciones están disponibles.</p>
          </div>
        )}
        {cancelled && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-amber-700">Pago cancelado</p>
            <p className="text-xs text-amber-600 mt-1">No se realizó ningún cargo. Puedes intentarlo de nuevo cuando quieras.</p>
          </div>
        )}

        {/* Current Status */}
        {loading ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <p className="text-slate-400 text-sm">Cargando...</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
              <h2 className="text-base font-bold text-slate-800">Estado de tu cuenta</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                  billing?.active
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {billing?.status === "active" ? "Suscripción activa" :
                   billing?.trial ? `Prueba gratuita (${billing.days_left} días restantes)` :
                   billing?.status === "past_due" ? "Pago pendiente" :
                   "Suscripción inactiva"}
                </div>
                {!billing?.stripe_configured && (
                  <div className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500">
                    Stripe no configurado (modo demo)
                  </div>
                )}
              </div>
              {billing?.trial && billing.days_left !== null && (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="text-sm text-blue-700">
                    Tu período de prueba termina el{" "}
                    <strong>{new Date(billing.trial_ends_at).toLocaleDateString("es-ES")}</strong>.
                    Activa tu suscripción antes de esa fecha para no perder acceso.
                  </p>
                </div>
              )}
              {billing?.status === "active" && billing?.has_customer && (
                <button onClick={openPortal} disabled={portalLoading}
                  className="mt-3 bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-transform">
                  {portalLoading ? "Abriendo..." : "Gestionar suscripción"}
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-xl p-3 mb-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Plans */}
            <h2 className="text-base font-bold text-slate-800 mb-3">Planes disponibles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {PLANS.map((plan, idx) => (
                <div key={idx} className={`bg-white rounded-2xl p-5 shadow-sm border-2 ${
                  plan.recommended ? "border-[#007AFF]" : "border-transparent"
                }`}>
                  {plan.recommended && (
                    <span className="text-[10px] font-bold text-white bg-[#007AFF] px-2 py-0.5 rounded-full uppercase">
                      Recomendado
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-800 mt-2">{plan.name}</h3>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-slate-800">{plan.price}</span>
                    <span className="text-sm text-slate-500 ml-1">{plan.period}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.cta && billing?.status !== "active" && (
                    <button onClick={createCheckout} disabled={checkoutLoading || !billing?.stripe_configured}
                      className="mt-4 w-full bg-[#007AFF] text-white text-sm font-bold py-3 rounded-xl shadow-lg active:scale-[0.98] transition-transform disabled:opacity-50">
                      {checkoutLoading ? "Redirigiendo..." : plan.cta}
                    </button>
                  )}
                  {plan.cta && billing?.status === "active" && (
                    <div className="mt-4 w-full bg-emerald-100 text-emerald-700 text-sm font-bold py-3 rounded-xl text-center">
                      Plan activo ✓
                    </div>
                  )}
                  {plan.current && billing?.trial && (
                    <div className="mt-4 w-full bg-blue-100 text-blue-700 text-sm font-bold py-3 rounded-xl text-center">
                      Plan actual
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Test mode info */}
            {billing?.stripe_configured && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-800">Modo de prueba</p>
                <p className="text-xs text-amber-700 mt-1">
                  Stripe está en modo test. Usa la tarjeta de prueba: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">4242 4242 4242 4242</code>,
                  cualquier fecha futura y cualquier CVC.
                </p>
              </div>
            )}

            {/* FAQ */}
            <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-base font-bold text-slate-800">Preguntas frecuentes</h3>
              <div className="mt-3 space-y-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">¿Puedo cancelar en cualquier momento?</p>
                  <p className="text-xs text-slate-500 mt-1">Sí. Puedes cancelar tu suscripción en cualquier momento desde el portal de gestión. No hay penalizaciones.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">¿Qué pasa cuando termina la prueba?</p>
                  <p className="text-xs text-slate-500 mt-1">Podrás ver tus datos pero no confirmar tomas ni crear nuevos medicamentos hasta activar una suscripción.</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">¿Los datos son seguros?</p>
                  <p className="text-xs text-slate-500 mt-1">Stripe gestiona todos los pagos. Nunca almacenamos datos de tarjetas. Los pagos están encriptados con TLS/SSL.</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#0f172a] flex items-center justify-center"><p className="text-slate-400">Cargando...</p></div>}>
      <BillingPageContent />
    </Suspense>
  );
}
