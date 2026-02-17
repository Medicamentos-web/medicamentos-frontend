"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const T = {
  es: {
    title: "Facturación",
    subtitle: "Planes y suscripción",
    back: "← Volver",
    loading: "Cargando...",
    login_required: "Inicia sesión para ver tu suscripción.",
    go_login: "Ir al login",
    success_title: "Pago realizado con éxito",
    success_text: "Tu suscripción está activa. Todas las funciones están disponibles.",
    cancelled_title: "Pago cancelado",
    cancelled_text: "No se realizó ningún cargo. Puedes intentarlo cuando quieras.",
    account_status: "Estado de tu cuenta",
    active_sub: "Suscripción activa",
    trial_status: "Prueba gratuita",
    days_left: "días restantes",
    past_due: "Pago pendiente",
    inactive: "Suscripción inactiva",
    stripe_not_configured: "Stripe no configurado (modo demo)",
    trial_info: "Tu período de prueba termina el",
    trial_info2: "Activa tu suscripción antes para no perder acceso.",
    manage_sub: "Gestionar suscripción",
    opening: "Abriendo...",
    plans_title: "Planes disponibles",
    trial_name: "Prueba gratuita",
    trial_price: "CHF 0",
    trial_period: "7 días",
    trial_f1: "1 familia",
    trial_f2: "Hasta 5 medicamentos",
    trial_f3: "Alertas básicas",
    trial_f4: "Soporte por email",
    current_plan: "Plan actual",
    monthly_name: "Plan Mensual",
    monthly_price: "CHF 9.90",
    monthly_period: "/ mes / paciente",
    yearly_name: "Plan Anual",
    yearly_price: "CHF 106.90",
    yearly_period: "/ año / paciente",
    yearly_save: "Ahorra 10%",
    plan_f1: "Medicamentos ilimitados",
    plan_f2: "Alertas inteligentes",
    plan_f3: "Escaneo OCR de recetas",
    plan_f4: "Historial médico completo",
    plan_f5: "Push notifications",
    plan_f6: "Contacto médico directo",
    plan_f7: "Soporte prioritario",
    activate: "Activar plan",
    redirecting: "Redirigiendo...",
    active_badge: "Plan activo ✓",
    recommended: "Recomendado",
    best_value: "Mejor precio",
    test_mode: "Modo de prueba",
    test_info: "Stripe está en modo test. Usa la tarjeta:",
    faq_title: "Preguntas frecuentes",
    faq1_q: "¿Puedo cancelar en cualquier momento?",
    faq1_a: "Sí. Sin penalizaciones ni permanencia mínima.",
    faq2_q: "¿Qué pasa cuando termina la prueba?",
    faq2_a: "Podrás ver tus datos pero no confirmar tomas ni crear nuevos medicamentos.",
    faq3_q: "¿Los datos son seguros?",
    faq3_a: "Stripe gestiona los pagos. Nunca almacenamos datos de tarjetas. Encriptado TLS/SSL.",
    faq4_q: "¿El precio es por paciente?",
    faq4_a: "Sí. Cada paciente tiene su propia suscripción. Un administrador puede gestionar varios pacientes.",
    legal_title: "Información legal",
    legal_text: "Servicio SaaS sujeto al derecho suizo. No sustituye el consejo médico profesional.",
    meds_limit: "medicamentos",
  },
  "de-CH": {
    title: "Abrechnung",
    subtitle: "Pläne und Abonnement",
    back: "← Zurück",
    loading: "Laden...",
    login_required: "Melden Sie sich an, um Ihr Abonnement zu sehen.",
    go_login: "Zum Login",
    success_title: "Zahlung erfolgreich",
    success_text: "Ihr Abonnement ist aktiv. Alle Funktionen sind verfügbar.",
    cancelled_title: "Zahlung abgebrochen",
    cancelled_text: "Es wurde nichts berechnet. Sie können es jederzeit erneut versuchen.",
    account_status: "Kontostatus",
    active_sub: "Abonnement aktiv",
    trial_status: "Kostenlose Testversion",
    days_left: "Tage verbleibend",
    past_due: "Zahlung ausstehend",
    inactive: "Abonnement inaktiv",
    stripe_not_configured: "Stripe nicht konfiguriert (Demo-Modus)",
    trial_info: "Ihre Testversion endet am",
    trial_info2: "Aktivieren Sie Ihr Abonnement, um den Zugang nicht zu verlieren.",
    manage_sub: "Abonnement verwalten",
    opening: "Wird geöffnet...",
    plans_title: "Verfügbare Pläne",
    trial_name: "Kostenlose Testversion",
    trial_price: "CHF 0",
    trial_period: "7 Tage",
    trial_f1: "1 Familie",
    trial_f2: "Bis zu 5 Medikamente",
    trial_f3: "Basis-Warnungen",
    trial_f4: "E-Mail-Support",
    current_plan: "Aktueller Plan",
    monthly_name: "Monatsplan",
    monthly_price: "CHF 9.90",
    monthly_period: "/ Monat / Patient",
    yearly_name: "Jahresplan",
    yearly_price: "CHF 106.90",
    yearly_period: "/ Jahr / Patient",
    yearly_save: "10% sparen",
    plan_f1: "Unbegrenzte Medikamente",
    plan_f2: "Intelligente Warnungen",
    plan_f3: "OCR-Rezeptscanning",
    plan_f4: "Vollständige Krankengeschichte",
    plan_f5: "Push-Benachrichtigungen",
    plan_f6: "Direkter Arztkontakt",
    plan_f7: "Prioritäts-Support",
    activate: "Plan aktivieren",
    redirecting: "Weiterleitung...",
    active_badge: "Plan aktiv ✓",
    recommended: "Empfohlen",
    best_value: "Bester Preis",
    test_mode: "Testmodus",
    test_info: "Stripe ist im Testmodus. Verwenden Sie die Karte:",
    faq_title: "Häufige Fragen",
    faq1_q: "Kann ich jederzeit kündigen?",
    faq1_a: "Ja. Keine Strafen, keine Mindestlaufzeit.",
    faq2_q: "Was passiert nach der Testversion?",
    faq2_a: "Sie können Ihre Daten sehen, aber keine Einnahmen bestätigen oder neue Medikamente erstellen.",
    faq3_q: "Sind die Daten sicher?",
    faq3_a: "Stripe verwaltet alle Zahlungen. Wir speichern keine Kartendaten. TLS/SSL-verschlüsselt.",
    faq4_q: "Ist der Preis pro Patient?",
    faq4_a: "Ja. Jeder Patient hat sein eigenes Abonnement. Ein Administrator kann mehrere Patienten verwalten.",
    legal_title: "Rechtliche Informationen",
    legal_text: "SaaS-Dienst nach Schweizer Recht. Kein Ersatz für professionelle medizinische Beratung.",
    meds_limit: "Medikamente",
  },
  en: {
    title: "Billing",
    subtitle: "Plans and subscription",
    back: "← Back",
    loading: "Loading...",
    login_required: "Sign in to view your subscription.",
    go_login: "Go to login",
    success_title: "Payment successful",
    success_text: "Your subscription is active. All features are available.",
    cancelled_title: "Payment cancelled",
    cancelled_text: "No charges were made. You can try again anytime.",
    account_status: "Account status",
    active_sub: "Active subscription",
    trial_status: "Free trial",
    days_left: "days remaining",
    past_due: "Payment due",
    inactive: "Subscription inactive",
    stripe_not_configured: "Stripe not configured (demo mode)",
    trial_info: "Your trial ends on",
    trial_info2: "Activate your subscription to keep access.",
    manage_sub: "Manage subscription",
    opening: "Opening...",
    plans_title: "Available plans",
    trial_name: "Free trial",
    trial_price: "CHF 0",
    trial_period: "7 days",
    trial_f1: "1 family",
    trial_f2: "Up to 5 medicines",
    trial_f3: "Basic alerts",
    trial_f4: "Email support",
    current_plan: "Current plan",
    monthly_name: "Monthly Plan",
    monthly_price: "CHF 9.90",
    monthly_period: "/ month / patient",
    yearly_name: "Annual Plan",
    yearly_price: "CHF 106.90",
    yearly_period: "/ year / patient",
    yearly_save: "Save 10%",
    plan_f1: "Unlimited medicines",
    plan_f2: "Smart alerts",
    plan_f3: "OCR prescription scanning",
    plan_f4: "Complete medical history",
    plan_f5: "Push notifications",
    plan_f6: "Direct doctor contact",
    plan_f7: "Priority support",
    activate: "Activate plan",
    redirecting: "Redirecting...",
    active_badge: "Active plan ✓",
    recommended: "Recommended",
    best_value: "Best value",
    test_mode: "Test mode",
    test_info: "Stripe is in test mode. Use the card:",
    faq_title: "FAQ",
    faq1_q: "Can I cancel anytime?",
    faq1_a: "Yes. No penalties, no minimum commitment.",
    faq2_q: "What happens after the trial?",
    faq2_a: "You can view your data but cannot confirm doses or add new medicines.",
    faq3_q: "Is my data secure?",
    faq3_a: "Stripe handles all payments. We never store card data. TLS/SSL encrypted.",
    faq4_q: "Is the price per patient?",
    faq4_a: "Yes. Each patient has their own subscription. An admin can manage multiple patients.",
    legal_title: "Legal information",
    legal_text: "SaaS service under Swiss law. Does not replace professional medical advice.",
    meds_limit: "medicines",
  },
};

function BillingPageContent() {
  const [user, setUser] = useState(null);
  const [billing, setBilling] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("es");
  const searchParams = useSearchParams();

  const t = (key) => T[lang]?.[key] || T.es[key] || key;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("userSession");
      if (saved) setUser(JSON.parse(saved));
      const savedLang = localStorage.getItem("lang");
      if (savedLang && T[savedLang]) setLang(savedLang);
    } catch {}
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch(`/api/billing/status?family_id=${user.family_id}`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
      credentials: "include",
    }).then(r => r.json()).then(d => setBilling(d)).catch(() => setError("Error"))
      .finally(() => setLoading(false));
  }, [user]);

  const createCheckout = async (plan) => {
    if (!user) return;
    setCheckoutLoading(plan);
    setError("");
    try {
      const res = await fetch("/api/billing/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        credentials: "include",
        body: JSON.stringify({ family_id: user.family_id, plan }),
      });
      const data = await res.json();
      if (res.ok && data.url) window.location.href = data.url;
      else setError(data.error || "Error al iniciar pago");
    } catch { setError("Error de conexión"); }
    finally { setCheckoutLoading(""); }
  };

  const openPortal = async () => {
    if (!user) return;
    setPortalLoading(true);
    setError("");
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
        credentials: "include",
        body: JSON.stringify({ family_id: user.family_id }),
      });
      const data = await res.json();
      if (res.ok && data.url) window.location.href = data.url;
      else setError(data.error || "Error");
    } catch { setError("Error de conexión"); }
    finally { setPortalLoading(false); }
  };

  if (!user) {
    return (
      <div className="min-h-dvh bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
          <p className="text-slate-600">{t("login_required")}</p>
          <a href="/" className="mt-4 inline-block bg-[#007AFF] text-white text-sm font-bold px-6 py-3 rounded-xl">{t("go_login")}</a>
        </div>
      </div>
    );
  }

  const success = searchParams.get("success") === "1";
  const cancelled = searchParams.get("cancelled") === "1";
  const locale = lang === "de-CH" ? "de-CH" : lang === "en" ? "en-US" : "es-ES";
  const paidFeatures = [t("plan_f1"), t("plan_f2"), t("plan_f3"), t("plan_f4"), t("plan_f5"), t("plan_f6"), t("plan_f7")];

  return (
    <div className="min-h-dvh bg-[#F2F4F8]">
      <div className="bg-[#0f172a] text-white px-5 pt-[env(safe-area-inset-top,12px)] pb-4">
        <div className="flex justify-between items-center pt-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">M</div>
            <div>
              <h1 className="text-sm font-bold text-emerald-400">MediControl</h1>
              <p className="text-[10px] text-slate-400 mt-0.5">{t("subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {["de-CH", "es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`text-[10px] font-bold px-2 py-1 rounded-lg ${lang === l ? "bg-white text-slate-900" : "bg-slate-800 text-slate-400"}`}>
                {l === "de-CH" ? "DE" : l.toUpperCase()}
              </button>
            ))}
            <a href="/" className="text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg font-bold ml-2">{t("back")}</a>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {success && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-emerald-700">✅ {t("success_title")}</p>
            <p className="text-xs text-emerald-600 mt-1">{t("success_text")}</p>
          </div>
        )}
        {cancelled && (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-amber-700">{t("cancelled_title")}</p>
            <p className="text-xs text-amber-600 mt-1">{t("cancelled_text")}</p>
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm text-center"><p className="text-slate-400 text-sm">{t("loading")}</p></div>
        ) : (<>
          {/* Status */}
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
            <h2 className="text-base font-bold text-slate-800">{t("account_status")}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${billing?.active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {billing?.status === "active" ? t("active_sub") :
                 billing?.trial ? `${t("trial_status")} (${billing.days_left} ${t("days_left")})` :
                 billing?.status === "past_due" ? t("past_due") : t("inactive")}
              </span>
              {billing?.trial && billing.max_medicines && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  {billing.current_medicines || 0}/{billing.max_medicines} {t("meds_limit")}
                </span>
              )}
              {!billing?.stripe_configured && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500">{t("stripe_not_configured")}</span>
              )}
            </div>
            {billing?.trial && billing.days_left !== null && (
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-sm text-blue-700">
                  {t("trial_info")} <strong>{new Date(billing.trial_ends_at).toLocaleDateString(locale)}</strong>. {t("trial_info2")}
                </p>
              </div>
            )}
            {billing?.status === "active" && billing?.has_customer && (
              <button onClick={openPortal} disabled={portalLoading}
                className="mt-3 bg-slate-100 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl">
                {portalLoading ? t("opening") : t("manage_sub")}
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 rounded-xl p-3 mb-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Plans */}
          <h2 className="text-base font-bold text-slate-800 mb-3">{t("plans_title")}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Trial */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-transparent">
              <h3 className="text-lg font-bold text-slate-800">{t("trial_name")}</h3>
              <div className="mt-1"><span className="text-2xl font-bold text-slate-800">{t("trial_price")}</span>
                <span className="text-sm text-slate-500 ml-1">{t("trial_period")}</span></div>
              <ul className="mt-3 space-y-2">
                {[t("trial_f1"), t("trial_f2"), t("trial_f3"), t("trial_f4")].map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="text-emerald-500">✓</span>{f}</li>
                ))}
              </ul>
              {billing?.trial && <div className="mt-4 w-full bg-blue-100 text-blue-700 text-sm font-bold py-3 rounded-xl text-center">{t("current_plan")}</div>}
            </div>

            {/* Monthly */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#007AFF]">
              <span className="text-[10px] font-bold text-white bg-[#007AFF] px-2 py-0.5 rounded-full uppercase">{t("recommended")}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-2">{t("monthly_name")}</h3>
              <div className="mt-1"><span className="text-2xl font-bold text-slate-800">{t("monthly_price")}</span>
                <span className="text-sm text-slate-500 ml-1">{t("monthly_period")}</span></div>
              <ul className="mt-3 space-y-2">
                {paidFeatures.map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="text-emerald-500">✓</span>{f}</li>
                ))}
              </ul>
              {billing?.status !== "active" ? (
                <button onClick={() => createCheckout("monthly")} disabled={!!checkoutLoading}
                  className="mt-4 w-full bg-[#007AFF] text-white text-sm font-bold py-3 rounded-xl shadow-lg disabled:opacity-50">
                  {checkoutLoading === "monthly" ? t("redirecting") : t("activate")}
                </button>
              ) : (
                <div className="mt-4 w-full bg-emerald-100 text-emerald-700 text-sm font-bold py-3 rounded-xl text-center">{t("active_badge")}</div>
              )}
            </div>

            {/* Yearly */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border-2 border-emerald-500">
              <span className="text-[10px] font-bold text-white bg-emerald-500 px-2 py-0.5 rounded-full uppercase">{t("best_value")}</span>
              <h3 className="text-lg font-bold text-slate-800 mt-2">{t("yearly_name")}</h3>
              <div className="mt-1"><span className="text-2xl font-bold text-slate-800">{t("yearly_price")}</span>
                <span className="text-sm text-slate-500 ml-1">{t("yearly_period")}</span></div>
              <div className="mt-1"><span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t("yearly_save")}</span></div>
              <ul className="mt-3 space-y-2">
                {paidFeatures.map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><span className="text-emerald-500">✓</span>{f}</li>
                ))}
              </ul>
              {billing?.status !== "active" ? (
                <button onClick={() => createCheckout("yearly")} disabled={!!checkoutLoading}
                  className="mt-4 w-full bg-emerald-600 text-white text-sm font-bold py-3 rounded-xl shadow-lg disabled:opacity-50">
                  {checkoutLoading === "yearly" ? t("redirecting") : t("activate")}
                </button>
              ) : (
                <div className="mt-4 w-full bg-emerald-100 text-emerald-700 text-sm font-bold py-3 rounded-xl text-center">{t("active_badge")}</div>
              )}
            </div>
          </div>

          {billing?.stripe_configured && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold text-amber-800">{t("test_mode")}</p>
              <p className="text-xs text-amber-700 mt-1">
                {t("test_info")} <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">4242 4242 4242 4242</code>
              </p>
            </div>
          )}

          {/* FAQ */}
          <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-800">{t("faq_title")}</h3>
            <div className="mt-3 space-y-3">
              {[["faq1_q","faq1_a"],["faq2_q","faq2_a"],["faq3_q","faq3_a"],["faq4_q","faq4_a"]].map(([q,a],i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-slate-700">{t(q)}</p>
                  <p className="text-xs text-slate-500 mt-1">{t(a)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs font-bold text-slate-600">{t("legal_title")}</p>
            <p className="text-[11px] text-slate-500 mt-1">{t("legal_text")}</p>
          </div>
        </>)}
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
