"use client";

import React, { useState, useEffect } from "react";

const T = {
  "de-CH": {
    hero_title: "Alltag besser organisiert.",
    hero_title2: "Für Familien.",
    hero_sub: "Erinnerungen, Übersicht und bessere Organisation — alles an einem Ort. Einfach. Klar. Zuverlässig.",
    cta: "Kostenlos testen",
    cta2: "Mehr erfahren",
    nav_features: "Funktionen",
    nav_pricing: "Preise",
    nav_contact: "Kontakt",
    nav_feedback: "Ihre Meinung",
    nav_login: "Anmelden",
    feat_title: "Was Sie heute nutzen können",
    feat_sub: "Entwickelt für Familien und pflegende Angehörige in der Schweiz.",
    f1_title: "Erinnerungen",
    f1_text: "Verpassen Sie nichts. Push-Benachrichtigungen zur richtigen Zeit.",
    f2_title: "Übersicht",
    f2_text: "Alles an einem Ort. Einfache Erfassung und klare Darstellung.",
    f3_title: "Bestand",
    f3_text: "Automatische Warnungen bei niedrigem Bestand. Nie wieder überrascht.",
    f4_title: "Familienverwaltung",
    f4_text: "Verwalten Sie alles für die ganze Familie von einem Konto aus.",
    f5_title: "Arzt-Kontakt",
    f5_text: "Direkter Zugang zu Ihrem Arzt mit vollständiger Übersicht.",
    f6_title: "Schweizer Datenschutz",
    f6_text: "Gehostet in Europa. TLS-verschlüsselt. DSGVO-konform.",
    price_title: "Einfache Preise",
    price_sub: "Kostenlos starten. Upgraden, wenn Sie bereit sind.",
    trial_name: "Kostenlose Testversion",
    trial_price: "CHF 0",
    trial_period: "30 Tage",
    trial_f1: "Max. 5 Medikamente",
    trial_f2: "Erinnerungen",
    trial_f3: "E-Mail-Support",
    monthly_name: "Monatsplan",
    monthly_price: "CHF 4.99",
    monthly_period: "/ Monat",
    yearly_name: "Jahresplan",
    yearly_price: "CHF 53.90",
    yearly_period: "/ Jahr",
    yearly_save: "10% sparen",
    plan_f1: "Unbegrenzte Einträge",
    plan_f2: "Erweiterte Erfassung",
    plan_f3: "Push-Erinnerungen",
    plan_f4: "Prioritäts-Support",
    recommended: "Empfohlen",
    best_value: "Bester Preis",
    contact_title: "Interesse? Kostenlos starten.",
    contact_sub: "Hinterlassen Sie Ihre Kontaktdaten für eine kostenlose Testversion.",
    form_name: "Name",
    form_email: "E-Mail",
    form_phone: "Telefon (optional)",
    form_phone_required: "Telefon (erforderlich)",
    form_message: "Nachricht (optional)",
    form_submit: "Kostenlos starten",
    step_continue: "Weiter",
    step_back: "Zurück",
    step_1_title: "Registrierung",
    step_1_sub: "Ihre Kontaktdaten für den Start.",
    step_2_title: "Abonnement wählen",
    step_2_sub: "Wählen Sie den Plan, der zu Ihnen passt.",
    step_3_title: "Zusätzliche Angaben",
    step_3_sub: "Helfen Sie uns, den Service zu verbessern.",
    step_3_trial_required: "Bei der Testversion sind diese Angaben erforderlich.",
    step_3_optional: "Optional — Sie können auch überspringen.",
    lead_success: "Vielen Dank! Wir melden uns bei Ihnen.",
    form_sending: "Wird gesendet...",
    form_success: "Konto erstellt! Überprüfen Sie Ihre E-Mail.",
    form_error: "Fehler. Bitte erneut versuchen.",
    form_already: "Diese E-Mail ist bereits registriert.",
    footer_legal: "Hilfsmittel zur Organisation. Kein Ersatz für professionelle Beratung.",
    footer_copy: "MediControl. Alle Rechte vorbehalten.",
    how_title: "So einfach geht's",
    how1_title: "1. Registrieren",
    how1_text: "Konto in weniger als 30 Sekunden.",
    how2_title: "2. Einträge hinzufügen",
    how2_text: "Manuell erfassen oder per Foto.",
    how3_title: "3. Erinnerungen erhalten",
    how3_text: "Die App erinnert Sie zur richtigen Zeit.",
    feedback_title: "Welche neuen Funktionen wären für Sie nützlich?",
    feedback_sub: "Helfen Sie uns, die App weiterzuentwickeln. Wählen Sie die Funktionen, die Sie nutzen würden.",
    feedback_1: "Hinweise zu Wechselwirkungen (z.B. Kombination A + B riskant)",
    feedback_2: "Hinweis auf Abhängigkeitsrisiko",
    feedback_3: "Informationen zu häufigen Nebenwirkungen",
    feedback_4: "Blutdruck erfassen und Trends anzeigen",
    feedback_5: "Puls / Herzfrequenz erfassen",
    feedback_6: "PDF-Bericht für Arzt oder Familie",
    feedback_7: "KI-Assistent für einfache Fragen",
    feedback_email: "E-Mail (optional, für Updates)",
    feedback_comment: "Weitere Ideen? (optional)",
    feedback_submit: "Feedback senden",
    feedback_sending: "Wird gesendet...",
    feedback_done: "Vielen Dank für Ihr Feedback!",
    feedback_error: "Fehler. Bitte erneut versuchen.",
  },
  es: {
    hero_title: "Día a día mejor organizado.",
    hero_title2: "Para familias.",
    hero_sub: "Recordatorios, visión general y mejor organización — todo en un solo lugar.",
    cta: "Probar gratis",
    nav_feedback: "Tu opinión",
    form_phone_required: "Teléfono (obligatorio)",
    form_message: "Mensaje (opcional)",
    step_continue: "Continuar",
    step_back: "Atrás",
    step_1_title: "Registro",
    step_1_sub: "Tus datos de contacto para empezar.",
    step_2_title: "Elegir abono",
    step_2_sub: "Elige el plan que mejor te convenga.",
    step_3_title: "Datos adicionales",
    step_3_sub: "Ayúdanos a mejorar el servicio.",
    step_3_trial_required: "Con la prueba gratuita estos datos son obligatorios.",
    step_3_optional: "Opcional — puedes omitir.",
    lead_success: "¡Gracias! Nos pondremos en contacto.",
    feedback_title: "¿Qué nuevas funciones serían útiles para usted?",
    feedback_sub: "Ayúdenos a mejorar la app. Elija las funciones que usaría.",
    feedback_1: "Avisos de interacciones (ej. combinación A + B arriesgada)",
    feedback_2: "Aviso de riesgo de dependencia",
    feedback_3: "Información sobre efectos adversos frecuentes",
    feedback_4: "Registrar presión arterial y ver tendencias",
    feedback_5: "Registrar pulso / frecuencia cardíaca",
    feedback_6: "Informe PDF para médico o familia",
    feedback_7: "Asistente IA para preguntas simples",
    feedback_done: "¡Gracias por su feedback!",
  },
  en: {
    hero_title: "Daily life better organized.",
    hero_title2: "For families.",
    hero_sub: "Reminders, overview and better organization — all in one place.",
    cta: "Try for free",
    nav_feedback: "Your opinion",
    form_phone_required: "Phone (required)",
    form_message: "Message (optional)",
    step_continue: "Continue",
    step_back: "Back",
    step_1_title: "Registration",
    step_1_sub: "Your contact details to get started.",
    step_2_title: "Choose plan",
    step_2_sub: "Select the plan that fits you best.",
    step_3_title: "Additional details",
    step_3_sub: "Help us improve the service.",
    step_3_trial_required: "With the free trial these details are required.",
    step_3_optional: "Optional — you can skip.",
    lead_success: "Thank you! We will get in touch.",
    feedback_title: "Which new features would be useful for you?",
    feedback_sub: "Help us improve the app. Select the features you would use.",
    feedback_1: "Interaction warnings (e.g. combination A + B risky)",
    feedback_2: "Dependency risk notice",
    feedback_3: "Common side effects information",
    feedback_4: "Log blood pressure and view trends",
    feedback_5: "Log pulse / heart rate",
    feedback_6: "PDF report for doctor or family",
    feedback_7: "AI assistant for simple questions",
    feedback_done: "Thank you for your feedback!",
  },
};

export default function CarePage() {
  const [lang, setLang] = useState("de-CH");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentType, setSentType] = useState("trial");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState({ features: [], email: "", comment: "" });
  const [feedbackSending, setFeedbackSending] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  useEffect(() => {
    const browserLang = navigator.language?.toLowerCase() || "";
    if (browserLang.startsWith("de")) setLang("de-CH");
    else if (browserLang.startsWith("es")) setLang("es");
    else setLang("en");
  }, []);

  const t = (key) => T[lang]?.[key] || T["de-CH"][key] || key;

  const submitStep3 = async (e) => {
    e.preventDefault();
    const isTrial = plan === "trial";
    if (isTrial && !formData.phone?.trim()) return;
    setSending(true);
    setError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source") || "care";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);

      if (isTrial) {
        const res = await fetch("/api/register-trial", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, lang, source: utmSource }),
        });
        const data = await res.json();
        if (!res.ok) {
          clearTimeout(timeout);
          if (data.error === "already_registered") setError(t("form_already"));
          else setError(t("form_error"));
          setSending(false);
          return;
        }
        setSentType("trial");
        setSent(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const leadSource = plan === "monthly" ? "monthly_care" : plan === "yearly" ? "yearly_care" : "care";
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            lang,
            source: leadSource,
          }),
        });
        setSentType("lead");
        setSent(true);
      }
      clearTimeout(timeout);
    } catch (err) {
      if (err?.name === "AbortError") setError(lang === "de-CH" ? "Zeitüberschreitung. Bitte erneut versuchen." : lang === "es" ? "Tiempo de espera agotado. Intenta de nuevo." : "Timeout. Please try again.");
      else setError(t("form_error"));
    } finally {
      setSending(false);
    }
  };

  const toggleFeature = (id) => {
    setFeedback((p) => ({
      ...p,
      features: p.features.includes(id) ? p.features.filter((x) => x !== id) : [...p.features, id],
    }));
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    setFeedbackSending(true);
    setFeedbackError("");
    try {
      const res = await fetch("/api/feature-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: feedback.features,
          email: feedback.email || null,
          comment: feedback.comment || null,
          lang,
          source: "care",
        }),
      });
      if (res.ok) setFeedbackDone(true);
      else setFeedbackError(t("feedback_error"));
    } catch {
      setFeedbackError(t("feedback_error"));
    } finally {
      setFeedbackSending(false);
    }
  };

  const features = [
    { icon: "🔔", title: t("f1_title"), text: t("f1_text") },
    { icon: "📋", title: t("f2_title"), text: t("f2_text") },
    { icon: "📦", title: t("f3_title"), text: t("f3_text") },
    { icon: "👨‍👩‍👧‍👦", title: t("f4_title"), text: t("f4_text") },
    { icon: "🩺", title: t("f5_title"), text: t("f5_text") },
    { icon: "🔒", title: t("f6_title"), text: t("f6_text") },
  ];

  const feedbackOptions = [
    { id: "interactions", label: t("feedback_1") },
    { id: "dependency", label: t("feedback_2") },
    { id: "side_effects", label: t("feedback_3") },
    { id: "blood_pressure", label: t("feedback_4") },
    { id: "heart_rate", label: t("feedback_5") },
    { id: "pdf_report", label: t("feedback_6") },
    { id: "ai_assistant", label: t("feedback_7") },
  ];

  return (
    <div className="min-h-dvh bg-white">
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
            <a href="#feedback" className="hover:text-slate-900 transition-colors text-violet-600 font-semibold">{t("nav_feedback")}</a>
          </div>
          <div className="flex gap-2">
            {["de-CH", "es", "en"].map((l) => (
              <button key={l} onClick={() => setLang(l)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors ${lang === l ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                {l === "de-CH" ? "DE" : l.toUpperCase()}
              </button>
            ))}
            <a href="/" className="ml-2 text-sm font-semibold text-white bg-slate-900 px-4 py-2 rounded-full hover:bg-slate-800 transition-colors">
              {t("nav_login")}
            </a>
          </div>
        </div>
      </nav>

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
            <a href="#contact" className="inline-flex items-center justify-center bg-slate-900 text-white font-bold px-8 py-4 rounded-2xl text-base hover:bg-slate-800 transition-all shadow-lg">
              {t("cta")} →
            </a>
            <a href="#features" className="inline-flex items-center justify-center bg-white text-slate-700 font-bold px-8 py-4 rounded-2xl text-base border border-slate-200 hover:border-slate-300 transition-all">
              {t("cta2")}
            </a>
          </div>

          <div className="mt-16 relative">
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="bg-[#F2F4F8] rounded-2xl p-4 space-y-3">
                {["Item A · 08:00", "Item B · 12:00", "Item C · 20:00"].map((label, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg">📋</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-slate-800">{label}</div>
                      <div className="text-[11px] text-slate-500">Erledigt ✓</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "50+", label: "Familien" },
            { value: "200+", label: "Einträge" },
            { value: "1'000+", label: "Erinnerungen" },
            { value: "99.9%", label: "Verfügbarkeit" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

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

      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-12">{t("how_title")}</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: "📱", title: t("how1_title"), text: t("how1_text") },
              { icon: "📋", title: t("how2_title"), text: t("how2_text") },
              { icon: "🔔", title: t("how3_title"), text: t("how3_text") },
            ].map((step, i) => (
              <div key={i}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-3xl mx-auto mb-4">{step.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t("price_title")}</h2>
            <p className="mt-4 text-lg text-slate-500">{t("price_sub")}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

      <section id="contact" className="py-20 sm:py-28 px-4 bg-slate-900">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t("contact_title")}</h2>
            <p className="mt-4 text-slate-400">{t("contact_sub")}</p>
          </div>
          {sent ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-lg font-bold text-emerald-400">{sentType === "trial" ? t("form_success") : t("lead_success")}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`w-2 h-2 rounded-full transition-colors ${step >= s ? "bg-emerald-500" : "bg-slate-600"}`} />
                ))}
              </div>

              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); if (formData.name?.trim() && formData.email?.trim()) setStep(2); }} className="space-y-4">
                  <h3 className="text-lg font-bold text-white">{t("step_1_title")}</h3>
                  <p className="text-sm text-slate-400">{t("step_1_sub")}</p>
                  <input type="text" required placeholder={t("form_name")} value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors" />
                  <input type="email" required placeholder={t("form_email")} value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors" />
                  <button type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 rounded-xl text-base hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg">
                    {t("step_continue")}
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">{t("step_2_title")}</h3>
                  <p className="text-sm text-slate-400">{t("step_2_sub")}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "trial", label: t("trial_name"), price: t("trial_price"), desc: t("trial_period") },
                      { id: "monthly", label: t("monthly_name"), price: t("monthly_price"), desc: t("monthly_period") },
                      { id: "yearly", label: t("yearly_name"), price: t("yearly_price"), desc: t("yearly_period") },
                    ].map((p) => (
                      <button key={p.id} type="button"
                        onClick={() => setPlan(p.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          plan === p.id ? "border-emerald-500 bg-emerald-500/10" : "border-slate-700 bg-slate-800 hover:border-slate-600"
                        }`}>
                        <span className="block font-bold text-white text-sm">{p.label}</span>
                        <span className="block text-emerald-400 text-xs mt-1">{p.price}</span>
                        <span className="block text-slate-400 text-[10px] mt-0.5">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-colors">
                      {t("step_back")}
                    </button>
                    <button type="button" onClick={() => plan && setStep(3)}
                      disabled={!plan}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3 rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {t("step_continue")}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={submitStep3} className="space-y-4">
                  <h3 className="text-lg font-bold text-white">{t("step_3_title")}</h3>
                  <p className="text-sm text-slate-400">
                    {plan === "trial" ? t("step_3_trial_required") : t("step_3_optional")}
                  </p>
                  <input type="text" readOnly value={formData.name}
                    className="w-full bg-slate-800/50 text-slate-400 rounded-xl px-4 py-3.5 text-sm border border-slate-700 cursor-not-allowed" />
                  <input type="email" readOnly value={formData.email}
                    className="w-full bg-slate-800/50 text-slate-400 rounded-xl px-4 py-3.5 text-sm border border-slate-700 cursor-not-allowed" />
                  <input type="tel"
                    required={plan === "trial"}
                    placeholder={plan === "trial" ? t("form_phone_required") : t("form_phone")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors" />
                  <textarea placeholder={t("form_message")} value={formData.message} rows={3}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3.5 text-sm border border-slate-700 focus:border-emerald-500 focus:outline-none transition-colors resize-none" />
                  {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(2)}
                      className="flex-1 bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-slate-600 transition-colors">
                      {t("step_back")}
                    </button>
                    <button type="submit" disabled={sending}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3 rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg disabled:opacity-50">
                      {sending ? t("form_sending") : t("form_submit")}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      <section id="feedback" className="py-20 sm:py-28 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-violet-50 text-violet-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-violet-200">
              Ihre Meinung zählt
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{t("feedback_title")}</h2>
            <p className="mt-4 text-lg text-slate-500">{t("feedback_sub")}</p>
          </div>

          {feedbackDone ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-xl font-bold text-emerald-700">{t("feedback_done")}</p>
            </div>
          ) : (
            <form onSubmit={submitFeedback} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                {feedbackOptions.map((opt) => (
                  <label key={opt.id} className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={feedback.features.includes(opt.id)} onChange={() => toggleFeature(opt.id)}
                      className="mt-1 rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
                    <span className="text-sm text-slate-700 group-hover:text-slate-900">{opt.label}</span>
                  </label>
                ))}
              </div>
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <input type="email" placeholder={t("feedback_email")} value={feedback.email}
                  onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3.5 text-sm border border-slate-200 focus:border-violet-500 focus:outline-none transition-colors" />
                <textarea placeholder={t("feedback_comment")} value={feedback.comment} rows={3}
                  onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3.5 text-sm border border-slate-200 focus:border-violet-500 focus:outline-none transition-colors resize-none" />
              </div>
              {feedbackError && <p className="text-red-500 text-sm text-center">{feedbackError}</p>}
              <button type="submit" disabled={feedbackSending}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold py-4 rounded-xl text-base hover:from-violet-600 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50">
                {feedbackSending ? t("feedback_sending") : t("feedback_submit")}
              </button>
            </form>
          )}
        </div>
      </section>

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
          </div>
        </div>
      </footer>
    </div>
  );
}
