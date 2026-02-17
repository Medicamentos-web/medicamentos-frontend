"use client";

import React, { useState, useEffect } from "react";

const T = {
  "de-CH": {
    hero_title: "Ihre Medikamente.",
    hero_title2: "Unter Kontrolle.",
    hero_sub: "Die intelligente App für Medikamentenmanagement. Erinnerungen, Bestandskontrolle und Rezeptscanning — alles an einem Ort.",
    cta: "Kostenlos testen",
    cta2: "Mehr erfahren",
    nav_features: "Funktionen",
    nav_pricing: "Preise",
    nav_contact: "Kontakt",
    nav_login: "Anmelden",
    feat_title: "Alles was Sie brauchen",
    feat_sub: "Entwickelt für Patienten, Familien und Pflegepersonal in der Schweiz.",
    f1_title: "Intelligente Erinnerungen",
    f1_text: "Verpassen Sie nie wieder eine Dosis. Push-Benachrichtigungen zur richtigen Zeit.",
    f2_title: "Rezept-Scanning",
    f2_text: "Fotografieren Sie Ihr Rezept — OCR erkennt automatisch alle Medikamente.",
    f3_title: "Bestandskontrolle",
    f3_text: "Automatische Warnungen bei niedrigem Bestand. Kein Medikament geht aus.",
    f4_title: "Familienverwaltung",
    f4_text: "Verwalten Sie Medikamente für die ganze Familie von einem Konto aus.",
    f5_title: "Arzt-Kontakt",
    f5_text: "Direkter Zugang zu Ihrem Arzt mit vollständiger Medikamentenübersicht.",
    f6_title: "Schweizer Datenschutz",
    f6_text: "Gehostet in Europa. TLS-verschlüsselt. DSGVO-konform. Ihre Daten sind sicher.",
    price_title: "Einfache, transparente Preise",
    price_sub: "Starten Sie kostenlos. Upgraden Sie, wenn Sie bereit sind.",
    trial_name: "Kostenlose Testversion",
    trial_price: "CHF 0",
    trial_period: "7 Tage",
    trial_f1: "Bis zu 5 Medikamente",
    trial_f2: "Basis-Erinnerungen",
    trial_f3: "E-Mail-Support",
    monthly_name: "Monatsplan",
    monthly_price: "CHF 9.90",
    monthly_period: "/ Monat / Patient",
    yearly_name: "Jahresplan",
    yearly_price: "CHF 106.90",
    yearly_period: "/ Jahr / Patient",
    yearly_save: "10% sparen",
    plan_f1: "Unbegrenzte Medikamente",
    plan_f2: "OCR Rezeptscanning",
    plan_f3: "Push-Benachrichtigungen",
    plan_f4: "Prioritäts-Support",
    recommended: "Empfohlen",
    best_value: "Bester Preis",
    contact_title: "Interesse? Wir melden uns bei Ihnen.",
    contact_sub: "Hinterlassen Sie Ihre Kontaktdaten und erhalten Sie eine kostenlose Testversion.",
    form_name: "Name",
    form_email: "E-Mail-Adresse",
    form_phone: "Telefon (optional)",
    form_message: "Nachricht (optional)",
    form_submit: "Kostenlos starten",
    form_sending: "Wird gesendet...",
    form_success: "Vielen Dank! Wir haben Ihre Anfrage erhalten.",
    form_error: "Fehler. Bitte versuchen Sie es erneut.",
    footer_legal: "SaaS-Dienst nach Schweizer Recht. Kein Ersatz für professionelle medizinische Beratung.",
    footer_copy: "MediControl. Alle Rechte vorbehalten.",
    stats_patients: "Patienten",
    stats_meds: "Medikamente verwaltet",
    stats_reminders: "Erinnerungen gesendet",
    stats_uptime: "Verfügbarkeit",
    how_title: "So einfach geht's",
    how1_title: "1. Registrieren",
    how1_text: "Erstellen Sie ein Konto in weniger als 30 Sekunden.",
    how2_title: "2. Medikamente hinzufügen",
    how2_text: "Manuell eingeben oder Rezept scannen.",
    how3_title: "3. Erinnerungen erhalten",
    how3_text: "Die App erinnert Sie an jede Dosis.",
  },
  es: {
    hero_title: "Tus medicamentos.",
    hero_title2: "Bajo control.",
    hero_sub: "La app inteligente para gestión de medicamentos. Recordatorios, control de stock y escaneo de recetas — todo en un solo lugar.",
    cta: "Probar gratis",
    cta2: "Saber más",
    nav_features: "Funciones",
    nav_pricing: "Precios",
    nav_contact: "Contacto",
    nav_login: "Iniciar sesión",
    feat_title: "Todo lo que necesitas",
    feat_sub: "Diseñado para pacientes, familias y cuidadores en Suiza.",
    f1_title: "Recordatorios inteligentes",
    f1_text: "Nunca más olvides una toma. Notificaciones push en el momento justo.",
    f2_title: "Escaneo de recetas",
    f2_text: "Fotografía tu receta — el OCR detecta automáticamente todos los medicamentos.",
    f3_title: "Control de stock",
    f3_text: "Alertas automáticas cuando queda poco. Ningún medicamento se agota.",
    f4_title: "Gestión familiar",
    f4_text: "Gestiona medicamentos de toda la familia desde una sola cuenta.",
    f5_title: "Contacto médico",
    f5_text: "Acceso directo a tu médico con la información completa de medicamentos.",
    f6_title: "Privacidad suiza",
    f6_text: "Alojado en Europa. Cifrado TLS. Compatible RGPD. Tus datos están seguros.",
    price_title: "Precios simples y transparentes",
    price_sub: "Empieza gratis. Mejora cuando estés listo.",
    trial_name: "Prueba gratuita",
    trial_price: "CHF 0",
    trial_period: "7 días",
    trial_f1: "Hasta 5 medicamentos",
    trial_f2: "Recordatorios básicos",
    trial_f3: "Soporte por email",
    monthly_name: "Plan Mensual",
    monthly_price: "CHF 9.90",
    monthly_period: "/ mes / paciente",
    yearly_name: "Plan Anual",
    yearly_price: "CHF 106.90",
    yearly_period: "/ año / paciente",
    yearly_save: "Ahorra 10%",
    plan_f1: "Medicamentos ilimitados",
    plan_f2: "Escaneo OCR de recetas",
    plan_f3: "Push notifications",
    plan_f4: "Soporte prioritario",
    recommended: "Recomendado",
    best_value: "Mejor precio",
    contact_title: "¿Te interesa? Te contactamos.",
    contact_sub: "Déjanos tus datos y recibe una prueba gratuita.",
    form_name: "Nombre",
    form_email: "Email",
    form_phone: "Teléfono (opcional)",
    form_message: "Mensaje (opcional)",
    form_submit: "Empezar gratis",
    form_sending: "Enviando...",
    form_success: "¡Gracias! Hemos recibido tu solicitud.",
    form_error: "Error. Inténtalo de nuevo.",
    footer_legal: "Servicio SaaS sujeto al derecho suizo. No sustituye el consejo médico profesional.",
    footer_copy: "MediControl. Todos los derechos reservados.",
    stats_patients: "Pacientes",
    stats_meds: "Medicamentos gestionados",
    stats_reminders: "Recordatorios enviados",
    stats_uptime: "Disponibilidad",
    how_title: "Así de fácil",
    how1_title: "1. Regístrate",
    how1_text: "Crea una cuenta en menos de 30 segundos.",
    how2_title: "2. Añade medicamentos",
    how2_text: "Ingresa manualmente o escanea tu receta.",
    how3_title: "3. Recibe recordatorios",
    how3_text: "La app te recuerda cada toma.",
  },
  en: {
    hero_title: "Your medicines.",
    hero_title2: "Under control.",
    hero_sub: "The smart app for medication management. Reminders, stock control and prescription scanning — all in one place.",
    cta: "Try for free",
    cta2: "Learn more",
    nav_features: "Features",
    nav_pricing: "Pricing",
    nav_contact: "Contact",
    nav_login: "Sign in",
    feat_title: "Everything you need",
    feat_sub: "Built for patients, families and caregivers in Switzerland.",
    f1_title: "Smart reminders",
    f1_text: "Never miss a dose again. Push notifications at the right time.",
    f2_title: "Prescription scanning",
    f2_text: "Take a photo of your prescription — OCR detects all medicines automatically.",
    f3_title: "Stock control",
    f3_text: "Automatic alerts when running low. No medicine runs out.",
    f4_title: "Family management",
    f4_text: "Manage medications for the whole family from one account.",
    f5_title: "Doctor contact",
    f5_text: "Direct access to your doctor with complete medication overview.",
    f6_title: "Swiss privacy",
    f6_text: "Hosted in Europe. TLS encrypted. GDPR compliant. Your data is safe.",
    price_title: "Simple, transparent pricing",
    price_sub: "Start free. Upgrade when you're ready.",
    trial_name: "Free trial",
    trial_price: "CHF 0",
    trial_period: "7 days",
    trial_f1: "Up to 5 medicines",
    trial_f2: "Basic reminders",
    trial_f3: "Email support",
    monthly_name: "Monthly Plan",
    monthly_price: "CHF 9.90",
    monthly_period: "/ month / patient",
    yearly_name: "Annual Plan",
    yearly_price: "CHF 106.90",
    yearly_period: "/ year / patient",
    yearly_save: "Save 10%",
    plan_f1: "Unlimited medicines",
    plan_f2: "OCR prescription scanning",
    plan_f3: "Push notifications",
    plan_f4: "Priority support",
    recommended: "Recommended",
    best_value: "Best value",
    contact_title: "Interested? We'll get in touch.",
    contact_sub: "Leave your details and get a free trial.",
    form_name: "Name",
    form_email: "Email address",
    form_phone: "Phone (optional)",
    form_message: "Message (optional)",
    form_submit: "Start for free",
    form_sending: "Sending...",
    form_success: "Thank you! We've received your request.",
    form_error: "Error. Please try again.",
    footer_legal: "SaaS service under Swiss law. Does not replace professional medical advice.",
    footer_copy: "MediControl. All rights reserved.",
    stats_patients: "Patients",
    stats_meds: "Medicines managed",
    stats_reminders: "Reminders sent",
    stats_uptime: "Uptime",
    how_title: "It's that simple",
    how1_title: "1. Sign up",
    how1_text: "Create an account in less than 30 seconds.",
    how2_title: "2. Add medicines",
    how2_text: "Enter manually or scan your prescription.",
    how3_title: "3. Get reminders",
    how3_text: "The app reminds you of every dose.",
  },
};

const FEATURES_ICONS = ["🔔", "📸", "📦", "👨‍👩‍👧‍👦", "🩺", "🔒"];

export default function LandingPage() {
  const [lang, setLang] = useState("de-CH");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const browserLang = navigator.language?.toLowerCase() || "";
    if (browserLang.startsWith("de")) setLang("de-CH");
    else if (browserLang.startsWith("es")) setLang("es");
    else setLang("en");
  }, []);

  const t = (key) => T[lang]?.[key] || T["de-CH"][key] || key;

  const submitLead = async (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang, source: "landing" }),
      });
      if (res.ok) { setSent(true); setFormData({ name: "", email: "", phone: "", message: "" }); }
      else setError(t("form_error"));
    } catch { setError(t("form_error")); }
    finally { setSending(false); }
  };

  const features = [
    { icon: "🔔", title: t("f1_title"), text: t("f1_text") },
    { icon: "📸", title: t("f2_title"), text: t("f2_text") },
    { icon: "📦", title: t("f3_title"), text: t("f3_text") },
    { icon: "👨‍👩‍👧‍👦", title: t("f4_title"), text: t("f4_text") },
    { icon: "🩺", title: t("f5_title"), text: t("f5_text") },
    { icon: "🔒", title: t("f6_title"), text: t("f6_text") },
  ];

  return (
    <div className="min-h-dvh bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">M</div>
            <span className="font-bold text-slate-900 text-lg">MediControl</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">{t("nav_features")}</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">{t("nav_pricing")}</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">{t("nav_contact")}</a>
          </div>
          <div className="flex items-center gap-2">
            {["de-CH", "es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors ${lang === l ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {l === "de-CH" ? "DE" : l.toUpperCase()}
              </button>
            ))}
            <a href="/" className="ml-2 text-sm font-semibold text-white bg-slate-900 px-4 py-2 rounded-full hover:bg-slate-800 transition-colors hidden sm:inline-block">
              {t("nav_login")}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-emerald-200">
            Swiss Quality Software
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {t("hero_title")}<br />
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">{t("hero_title2")}</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t("hero_sub")}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="inline-flex items-center justify-center bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:shadow-xl">
              {t("cta")} →
            </a>
            <a href="#features" className="inline-flex items-center justify-center bg-white text-slate-700 font-bold px-8 py-4 rounded-2xl text-base border border-slate-200 hover:border-slate-300 transition-all">
              {t("cta2")}
            </a>
          </div>

          {/* Mock app preview */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="bg-[#F2F4F8] rounded-2xl p-4 space-y-3">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg">💊</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">Euthyrox 50mg</div>
                      <div className="text-[11px] text-slate-500">08:00 · 1 Tablette</div>
                    </div>
                    <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full">✓</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-lg">💊</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">Spiricort 20mg</div>
                      <div className="text-[11px] text-slate-500">12:00 · 2 Tabletten</div>
                    </div>
                    <div className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full">⏳</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-lg">💊</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">MetoZerok 50mg</div>
                      <div className="text-[11px] text-slate-500">20:00 · 1 Tablette</div>
                    </div>
                    <div className="bg-slate-100 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-full">—</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "50+", label: t("stats_patients") },
            { value: "200+", label: t("stats_meds") },
            { value: "1'000+", label: t("stats_reminders") },
            { value: "99.9%", label: t("stats_uptime") },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t("feat_title")}</h2>
            <p className="mt-4 text-lg text-slate-500">{t("feat_sub")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-200">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-12">{t("how_title")}</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: "📱", title: t("how1_title"), text: t("how1_text") },
              { icon: "💊", title: t("how2_title"), text: t("how2_text") },
              { icon: "🔔", title: t("how3_title"), text: t("how3_text") },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl mx-auto mb-4">{step.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t("price_title")}</h2>
            <p className="mt-4 text-lg text-slate-500">{t("price_sub")}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Trial */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-slate-900">{t("trial_name")}</h3>
              <div className="mt-2"><span className="text-3xl font-extrabold text-slate-900">{t("trial_price")}</span>
                <span className="text-sm text-slate-500 ml-1">{t("trial_period")}</span></div>
              <ul className="mt-4 space-y-2">
                {[t("trial_f1"), t("trial_f2"), t("trial_f3")].map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-center gap-2"><span className="text-emerald-500">✓</span>{f}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 block text-center bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">{t("cta")}</a>
            </div>
            {/* Monthly */}
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-xl relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white bg-slate-900 px-3 py-1 rounded-full">{t("recommended")}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{t("monthly_name")}</h3>
              <div className="mt-2"><span className="text-3xl font-extrabold text-slate-900">{t("monthly_price")}</span>
                <span className="text-sm text-slate-500 ml-1">{t("monthly_period")}</span></div>
              <ul className="mt-4 space-y-2">
                {[t("plan_f1"), t("plan_f2"), t("plan_f3"), t("plan_f4")].map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-center gap-2"><span className="text-emerald-500">✓</span>{f}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 block text-center bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">{t("cta")}</a>
            </div>
            {/* Yearly */}
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-500 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white bg-emerald-500 px-3 py-1 rounded-full">{t("best_value")}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{t("yearly_name")}</h3>
              <div className="mt-2"><span className="text-3xl font-extrabold text-slate-900">{t("yearly_price")}</span>
                <span className="text-sm text-slate-500 ml-1">{t("yearly_period")}</span></div>
              <div className="mt-1"><span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{t("yearly_save")}</span></div>
              <ul className="mt-4 space-y-2">
                {[t("plan_f1"), t("plan_f2"), t("plan_f3"), t("plan_f4")].map((f, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-center gap-2"><span className="text-emerald-500">✓</span>{f}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 block text-center bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors">{t("cta")}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Lead form */}
      <section id="contact" className="py-20 sm:py-28 px-4 bg-slate-900">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t("contact_title")}</h2>
            <p className="mt-4 text-slate-400">{t("contact_sub")}</p>
          </div>
          {sent ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-lg font-bold text-emerald-400">{t("form_success")}</p>
            </div>
          ) : (
            <form onSubmit={submitLead} className="space-y-4">
              <input type="text" placeholder={t("form_name")} value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors" />
              <input type="email" required placeholder={t("form_email")} value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors" />
              <input type="tel" placeholder={t("form_phone")} value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors" />
              <textarea placeholder={t("form_message")} value={formData.message} rows={3}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors resize-none" />
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button type="submit" disabled={sending}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 rounded-xl text-base hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-50">
                {sending ? t("form_sending") : t("form_submit")}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-md flex items-center justify-center text-white font-bold text-[10px]">M</div>
            <span className="font-bold text-white">MediControl</span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">{t("footer_legal")}</p>
          <p className="text-xs text-slate-600 mt-4">© {new Date().getFullYear()} {t("footer_copy")}</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{t("nav_login")}</a>
            <a href="/billing" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{t("nav_pricing")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
