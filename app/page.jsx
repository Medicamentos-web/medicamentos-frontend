"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import LoginUI from "../components/LoginUI";

// ── Traducciones ────────────────────────────────────────────────────────
const STRINGS = {
  es: {
    residents: "Residentes", alerts: "Alertas", view_alerts: "Ver alertas",
    view_less: "Ver menos", refresh_alerts: "Actualizar", sos: "SOS",
    doctor_contact: "Contacto médico", no_stock_alerts: "Sin alertas de stock",
    scan_med: "Escanear medicamento", scan_subtitle: "Sube una foto de la etiqueta.",
    gallery: "Subir imagen", blocks_title: "Bloques de tiempo",
    blocks_subtitle: "Resumen por horario", pending: "pendientes", total: "total",
    day_doses: "tomas", stock: "Stock", confirm: "Confirmar", taken: "Tomado ✅",
    update_dose: "Actualizar dosis", pending_change: "Cambio pendiente",
    close: "Cerrar", dose_update: "Actualizar dosis", new_dose: "Nueva dosis",
    effective_date: "Fecha efectiva (YYYY-MM-DD)", send_request: "Enviar solicitud",
    sending: "Enviando...", dose_request_sent: "Solicitud enviada.",
    dose_request_error: "No se pudo enviar.", offline_mode: "Sin conexión.",
    show_day: "Ver todas las tomas", hide_day: "Ocultar tomas",
    patient: "Paciente", logout: "Cerrar sesión", live_caption: "Gestión de medicación",
    morning: "Mañana", midday: "Mediodía", afternoon: "Tarde", night: "Noche",
    upload: "Importar", importing: "Importando...", import_success: "Importación exitosa",
    call: "Llamar", send_email: "Enviar email", doctor_title: "Médico de cabecera",
    no_doctor: "Sin datos de médico.", pending_doses: "tomas pendientes",
    confirm_now: "Confirmar ahora", completed_day: "Día completado",
    no_records: "No hay registros hoy", emergency: "Emergencia 112",
    disclaimer_title: "Aviso legal importante",
    disclaimer_accept: "He leído y acepto",
    disclaimer_text: "Esta aplicación es una herramienta de apoyo para la gestión y el recordatorio de la medicación prescrita por su médico de cabecera. En ningún caso sustituye, modifica ni reemplaza el diagnóstico, la prescripción ni las indicaciones de su profesional sanitario. El usuario se compromete a seguir siempre las instrucciones de su médico tratante. El uso de esta aplicación no establece una relación médico-paciente. Ante cualquier duda sobre su medicación, consulte a su médico o farmacéutico.",
  },
  "de-CH": {
    residents: "Bewohner", alerts: "Warnungen", view_alerts: "Anzeigen",
    view_less: "Weniger", refresh_alerts: "Aktualisieren", sos: "SOS",
    doctor_contact: "Arztkontakt", no_stock_alerts: "Keine Warnungen",
    scan_med: "Medikament scannen", scan_subtitle: "Foto der Etikette hochladen.",
    gallery: "Bild hochladen", blocks_title: "Zeitblöcke",
    blocks_subtitle: "Zusammenfassung", pending: "offen", total: "gesamt",
    day_doses: "Einnahmen", stock: "Bestand", confirm: "Bestätigen",
    taken: "Eingenommen ✅", update_dose: "Dosis ändern",
    pending_change: "Ausstehende Änderung", close: "Schliessen",
    dose_update: "Dosis ändern", new_dose: "Neue Dosis",
    effective_date: "Gültig ab (YYYY-MM-DD)", send_request: "Anfrage senden",
    sending: "Senden...", dose_request_sent: "Anfrage gesendet.",
    dose_request_error: "Fehler.", offline_mode: "Offline-Modus.",
    show_day: "Tagesplan anzeigen", hide_day: "Ausblenden",
    patient: "Patient", logout: "Abmelden", live_caption: "Medikamentenverwaltung",
    morning: "Morgen", midday: "Mittag", afternoon: "Nachmittag", night: "Nacht",
    upload: "Importieren", importing: "Importieren...", import_success: "Erfolgreich",
    call: "Anrufen", send_email: "E-Mail senden", doctor_title: "Hausarzt",
    no_doctor: "Keine Arztdaten.", pending_doses: "offene Einnahmen",
    confirm_now: "Jetzt bestätigen", completed_day: "Tag abgeschlossen",
    no_records: "Heute keine Einträge", emergency: "Notfall 112",
    disclaimer_title: "Wichtiger rechtlicher Hinweis",
    disclaimer_accept: "Gelesen und akzeptiert",
    disclaimer_text: "Diese Anwendung ist ein Hilfsmittel zur Verwaltung und Erinnerung an die von Ihrem Arzt verschriebene Medikation. Sie ersetzt in keinem Fall die Diagnose, Verschreibung oder Anweisungen Ihres Arztes. Der Benutzer verpflichtet sich, stets den Anweisungen seines behandelnden Arztes zu folgen. Die Nutzung dieser Anwendung begründet kein Arzt-Patienten-Verhältnis. Bei Fragen zu Ihrer Medikation wenden Sie sich an Ihren Arzt oder Apotheker.",
  },
  en: {
    residents: "Residents", alerts: "Alerts", view_alerts: "View",
    view_less: "Less", refresh_alerts: "Refresh", sos: "SOS",
    doctor_contact: "Doctor", no_stock_alerts: "No alerts",
    scan_med: "Scan medication", scan_subtitle: "Upload a photo of the label.",
    gallery: "Upload image", blocks_title: "Time blocks",
    blocks_subtitle: "Summary by time", pending: "pending", total: "total",
    day_doses: "doses", stock: "Stock", confirm: "Confirm", taken: "Taken ✅",
    update_dose: "Update dose", pending_change: "Pending change",
    close: "Close", dose_update: "Update dose", new_dose: "New dose",
    effective_date: "Effective date (YYYY-MM-DD)", send_request: "Send request",
    sending: "Sending...", dose_request_sent: "Request sent.",
    dose_request_error: "Could not send.", offline_mode: "Offline mode.",
    show_day: "Show all doses", hide_day: "Hide doses",
    patient: "Patient", logout: "Logout", live_caption: "Medication management",
    morning: "Morning", midday: "Midday", afternoon: "Afternoon", night: "Night",
    upload: "Import", importing: "Importing...", import_success: "Success",
    call: "Call", send_email: "Send email", doctor_title: "Primary doctor",
    no_doctor: "No doctor data.", pending_doses: "pending doses",
    confirm_now: "Confirm now", completed_day: "Day completed",
    no_records: "No records today", emergency: "Emergency 112",
    disclaimer_title: "Important legal notice",
    disclaimer_accept: "I have read and accept",
    disclaimer_text: "This application is a support tool for the management and reminder of medication prescribed by your physician. It does not in any case replace, modify, or substitute the diagnosis, prescription, or instructions of your healthcare professional. The user agrees to always follow the instructions of their treating physician. Use of this application does not establish a doctor-patient relationship. If you have any questions about your medication, consult your doctor or pharmacist.",
  },
};

const BLOCK_NAMES = { es: ["Mañana","Mediodía","Tarde","Noche"], "de-CH": ["Morgen","Mittag","Nachmittag","Nacht"], en: ["Morning","Midday","Afternoon","Night"] };
const BLOCK_COLORS = ["#38bdf8","#f59e0b","#6366f1","#10b981"];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState("es");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [meds, setMeds] = useState([[], [], [], []]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [activeBlock, setActiveBlock] = useState(null);
  const [showAllMeds, setShowAllMeds] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [lastSync, setLastSync] = useState("");
  const [showSos, setShowSos] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [sosMessage, setSosMessage] = useState("");
  const [showScan, setShowScan] = useState(false);
  const [scanFile, setScanFile] = useState(null);
  const [scanPreview, setScanPreview] = useState(null);
  const [scanUploading, setScanUploading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState("");
  const [showDoseModal, setShowDoseModal] = useState(false);
  const [doseMed, setDoseMed] = useState(null);
  const [doseValue, setDoseValue] = useState("");
  const [doseDate, setDoseDate] = useState("");
  const [doseSubmitting, setDoseSubmitting] = useState(false);
  const [doseMessage, setDoseMessage] = useState("");
  const carouselRef = useRef(null);
  const fileInputRef = useRef(null);

  const t = (key) => STRINGS[lang]?.[key] || STRINGS.es[key] || key;
  const blockNames = BLOCK_NAMES[lang] || BLOCK_NAMES.es;

  // ── Init ──
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("userSession");
      if (saved) {
        const s = JSON.parse(saved);
        setUser(s);
        setToken(s.token || "");
        // Check disclaimer acceptance
        const accepted = localStorage.getItem(`disclaimer_accepted_${s.id}`);
        if (!accepted) setShowDisclaimer(true);
      }
      const savedLang = localStorage.getItem("lang");
      if (savedLang && STRINGS[savedLang]) setLang(savedLang);
    } catch {}
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSetUser = (session) => {
    setUser(session);
    setToken(session?.token || "");
    // Show disclaimer on first login
    const accepted = localStorage.getItem(`disclaimer_accepted_${session?.id}`);
    if (!accepted) setShowDisclaimer(true);
  };

  const acceptDisclaimer = async () => {
    if (!user) return;
    localStorage.setItem(`disclaimer_accepted_${user.id}`, new Date().toISOString());
    // Notify backend to send confirmation email
    try {
      await fetch(`/api/disclaimer-accepted`, {
        method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: "include",
        body: JSON.stringify({ user_id: user.id, family_id: user.family_id, accepted_at: new Date().toISOString() }),
      });
    } catch {}
    setShowDisclaimer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUser(null);
    setToken("");
  };

  const changeLang = (l) => { setLang(l); localStorage.setItem("lang", l); };

  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }), [token]);

  const dateKey = (d) => d.toLocaleDateString("en-CA", { timeZone: "Europe/Zurich" });

  // ── Load meds ──
  const loadMeds = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError("");
    const date = dateKey(selectedDate);
    const cacheK = `meds:${user.family_id}:${user.id}:${date}`;
    try {
      const res = await fetch(`/api/meds-by-date?user_id=${user.id}&family_id=${user.family_id}&date=${date}`, { headers, credentials: "include" });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || `HTTP ${res.status}`); }
      const data = await res.json();
      setIsOffline(false);
      const stamp = new Date().toISOString();
      setLastSync(stamp);
      try { localStorage.setItem(cacheK, JSON.stringify({ data, stamp })); } catch {}
      groupMeds(data);
    } catch (err) {
      setError(err.message || "Error de conexión");
      try {
        const cached = JSON.parse(localStorage.getItem(cacheK));
        if (cached?.data) { groupMeds(cached.data); setLastSync(cached.stamp || ""); setIsOffline(true); }
      } catch {}
    } finally { setLoading(false); }
  }, [user, selectedDate, headers]);

  const groupMeds = (data) => {
    const groups = [[], [], [], []];
    (Array.isArray(data) ? data : []).forEach((med) => {
      const h = parseInt(med.hora?.split(":")[0] || "0", 10);
      const item = { ...med, completado: med.estado === "tomado" };
      if (h >= 5 && h < 12) groups[0].push(item);
      else if (h >= 12 && h < 16) groups[1].push(item);
      else if (h >= 16 && h < 20) groups[2].push(item);
      else groups[3].push(item);
    });
    setMeds(groups);
  };

  const loadAlerts = useCallback(async () => {
    if (!user?.id || !token) return;
    setAlertsLoading(true);
    try {
      const res = await fetch(`/api/alerts?family_id=${user.family_id}`, { headers, credentials: "include" });
      const data = await res.json();
      if (res.ok) setAlerts(Array.isArray(data) ? data : []);
    } catch {} finally { setAlertsLoading(false); }
  }, [user, token, headers]);

  const loadDoctor = async () => {
    if (!user?.id || !token) return;
    try {
      const res = await fetch(`/api/doctor?family_id=${user.family_id}&user_id=${user.id}`, { headers, credentials: "include" });
      const data = await res.json();
      setDoctor(res.ok ? data : null);
    } catch { setDoctor(null); }
  };

  useEffect(() => { if (user && token) { loadMeds(); loadAlerts(); } }, [user, token, loadMeds, loadAlerts]);

  const toggleMed = async (med) => {
    if (med.completado) return;
    const date = dateKey(selectedDate);
    const today = dateKey(new Date());
    if (date > today) return;
    try {
      const res = await fetch(`/api/meds-toggle`, {
        method: "POST", headers, credentials: "include",
        body: JSON.stringify({ schedule_id: med.id, status: "tomado", family_id: user.family_id, date }),
      });
      if (res.ok) loadMeds();
    } catch {}
  };

  const openDoseModal = (med) => {
    setDoseMed(med); setDoseValue(med.dosis || ""); setDoseDate(dateKey(new Date()));
    setDoseMessage(""); setShowDoseModal(true);
  };
  const submitDoseChange = async () => {
    if (!doseMed || !doseValue.trim()) return;
    setDoseSubmitting(true); setDoseMessage("");
    try {
      const res = await fetch(`/api/dose-change-requests`, {
        method: "POST", headers, credentials: "include",
        body: JSON.stringify({ family_id: user.family_id, schedule_id: doseMed.id, new_dosage: doseValue.trim(), effective_date: doseDate.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      setDoseMessage(res.ok ? t("dose_request_sent") : (data.error || t("dose_request_error")));
    } catch { setDoseMessage(t("dose_request_error")); } finally { setDoseSubmitting(false); }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanFile(file); setScanPreview(URL.createObjectURL(file));
    setScanResult(null); setScanError(""); setShowScan(true);
  };
  const uploadScan = async () => {
    if (!scanFile || !user?.id) return;
    setScanUploading(true); setScanError("");
    try {
      const form = new FormData();
      form.append("family_id", String(user.family_id));
      form.append("user_id", String(user.id));
      form.append("fast_ocr", "1");
      form.append("file", scanFile);
      const res = await fetch(`/api/import-scan`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setScanError(data.error || "Error"); }
      else { setScanResult(data); loadMeds(); }
    } catch { setScanError("Error de red."); } finally { setScanUploading(false); }
  };

  // ── Computed ──
  const allItems = useMemo(() => [].concat(meds[0] || [], meds[1] || [], meds[2] || [], meds[3] || []), [meds]);
  const pendingCount = useMemo(() => allItems.filter((m) => !m.completado).length, [allItems]);
  const dayCompleted = pendingCount === 0 && allItems.length > 0;

  const blockSummary = useMemo(() =>
    [0, 1, 2, 3].map((i) => {
      const items = meds[i] || [];
      return { name: blockNames[i], total: items.length, pending: items.filter((m) => !m.completado).length, color: BLOCK_COLORS[i], items };
    }), [meds, blockNames]);

  const daysArray = useMemo(() => {
    const days = []; const today = new Date(); today.setHours(0,0,0,0);
    for (let i = -14; i <= 14; i++) {
      const d = new Date(today); d.setDate(today.getDate() + i);
      days.push({ date: d, isSelected: d.toDateString() === selectedDate.toDateString(), isToday: d.toDateString() === today.toDateString() });
    }
    return days;
  }, [selectedDate]);

  useEffect(() => {
    if (!carouselRef.current) return;
    const idx = daysArray.findIndex((d) => d.isSelected);
    if (idx < 0) return;
    carouselRef.current.scrollTo({ left: idx * 68 - carouselRef.current.clientWidth / 2 + 34, behavior: "smooth" });
  }, [selectedDate, daysArray]);

  useEffect(() => {
    const name = user?.nombre || "Paciente";
    const date = new Date().toLocaleDateString("es-ES");
    setSosMessage(`Estimado/a Dr./Dra.,\n\nLe escribo por una consulta relacionada con mi medicación actual.\n\nPaciente: ${name}\nFecha: ${date}`);
  }, [user]);

  // ── Render ──
  if (!mounted) return (
    <div className="min-h-dvh bg-[#0f172a] flex items-center justify-center">
      <div className="text-slate-500 text-sm">Cargando...</div>
    </div>
  );

  if (!user) return <LoginUI setUser={handleSetUser} />;

  const locale = lang === "de-CH" ? "de-CH" : lang === "en" ? "en-US" : "es-ES";

  return (
    <div className="min-h-dvh bg-[#F2F4F8] pb-28">
      {/* ── Top Bar con safe area para iPhone ── */}
      <div className="bg-[#0f172a] text-white px-5 pt-[env(safe-area-inset-top,12px)] pb-4">
        <div className="flex justify-between items-center pt-3">
          <div className="flex-1">
            <h1 className="text-sm font-bold text-emerald-400">MEDICAMENTOS</h1>
            <p className="text-[10px] text-slate-400 mt-0.5">{user.nombre} · {t("live_caption")}</p>
          </div>
          {/* Botón SALIR siempre visible */}
          <button onClick={handleLogout}
            className="bg-red-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform">
            {t("logout")} ✕
          </button>
        </div>
        {/* Language selector */}
        <div className="flex gap-2 mt-3">
          {["de-CH","es","en"].map((l) => (
            <button key={l} onClick={() => changeLang(l)}
              className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-colors ${lang === l ? "bg-white text-slate-900" : "bg-slate-800 text-slate-400"}`}>
              {l === "de-CH" ? "DE" : l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Legal Disclaimer Popup ── */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="mx-auto mb-3 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-2xl">⚕️</div>
              <h2 className="text-lg font-bold text-slate-800">{t("disclaimer_title")}</h2>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-slate-700 leading-relaxed">{t("disclaimer_text")}</p>
            </div>
            <p className="text-[10px] text-slate-400 text-center mb-4">
              Al aceptar, se enviará una confirmación por correo electrónico al usuario y al administrador del sistema como registro legal.
            </p>
            <button onClick={acceptDisclaimer}
              className="w-full bg-[#007AFF] text-white text-sm font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-transform">
              {t("disclaimer_accept")}
            </button>
          </div>
        </div>
      )}

      {/* ── Error Banner ── */}
      {error && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-300 rounded-xl p-3">
          <p className="text-sm text-red-700">{error}</p>
          <button onClick={loadMeds} className="text-xs text-red-500 font-bold mt-1 underline">Reintentar</button>
        </div>
      )}

      {/* ── Status Cards ── */}
      <div className="px-4 flex gap-2 overflow-x-auto pb-2 pt-3">
        <div className="flex-none bg-white rounded-xl px-4 py-3 shadow-sm min-w-[70px] text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase">{t("residents")}</p>
          <p className="text-xl font-bold text-slate-800 mt-1">1</p>
        </div>
        <button onClick={() => { setShowAlerts((p) => !p); if (!showAlerts) loadAlerts(); }}
          className="flex-none bg-[#111827] rounded-xl px-4 py-3 shadow-sm min-w-[80px] text-center">
          <p className="text-[9px] font-bold text-blue-300 uppercase">{t("alerts")}</p>
          <p className="text-xs font-bold text-white mt-1">{showAlerts ? t("view_less") : t("view_alerts")}</p>
        </button>
        <button onClick={loadAlerts}
          className="flex-none bg-[#111827] rounded-xl px-4 py-3 shadow-sm min-w-[70px] text-center">
          <p className="text-[9px] font-bold text-blue-300 uppercase">{t("refresh_alerts")}</p>
          <p className="text-xs font-bold text-white mt-1">{alertsLoading ? "..." : "🔄"}</p>
        </button>
        <button onClick={async () => { await loadDoctor(); setShowSos(true); }}
          className="flex-none bg-yellow-400 rounded-xl px-4 py-3 shadow-sm min-w-[80px] text-center">
          <p className="text-[9px] font-bold text-slate-800 uppercase">{t("sos")}</p>
          <p className="text-xs font-bold text-slate-800 mt-1">{t("doctor_contact")}</p>
        </button>
      </div>

      {/* ── Alerts Panel ── */}
      {showAlerts && (
        <div className="mx-4 mt-2 bg-white rounded-xl p-3 shadow-sm">
          {alerts.length ? alerts.map((a) => (
            <div key={a.id} className="py-2 border-b border-slate-100 last:border-0">
              <p className="text-sm font-semibold text-slate-800">{a.med_name || a.message}{a.med_dosage ? ` · ${a.med_dosage}` : ""}</p>
              <p className="text-xs text-red-500 font-medium">{a.dose_time ? `${a.dose_time} · ` : ""}{a.alert_date || ""}</p>
            </div>
          )) : <p className="text-sm text-emerald-600 font-semibold">{t("no_stock_alerts")}</p>}
        </div>
      )}

      {/* ── Scan Card ── */}
      <div className="mx-4 mt-3 bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm font-bold text-slate-800">{t("scan_med")}</p>
        <p className="text-xs text-slate-500 mt-1">{t("scan_subtitle")}</p>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        <button onClick={() => fileInputRef.current?.click()}
          className="mt-3 bg-sky-500 text-white text-xs font-bold py-2.5 px-5 rounded-xl active:scale-95 transition-transform">{t("gallery")}</button>
      </div>

      {/* ── Offline / Loading ── */}
      {isOffline && (
        <div className="mx-4 mt-3 bg-amber-50 border border-amber-300 rounded-xl p-3">
          <p className="text-sm font-bold text-amber-800">{t("offline_mode")}</p>
          <p className="text-xs text-amber-700">Última sync: {lastSync ? new Date(lastSync).toLocaleString(locale) : "N/A"}</p>
        </div>
      )}

      {/* ── Pending Banner ── */}
      {pendingCount > 0 && (
        <div className="mx-4 mt-3 bg-orange-50 border border-orange-300 rounded-xl p-3 flex items-center justify-between">
          <p className="text-sm font-bold text-orange-800">{pendingCount} {t("pending_doses")}</p>
          <button onClick={() => setShowAllMeds(true)}
            className="bg-amber-500 text-white text-xs font-bold py-2 px-4 rounded-xl">{t("confirm_now")}</button>
        </div>
      )}
      {dayCompleted && (
        <div className="mx-4 mt-3 bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-center">
          <p className="text-sm font-bold text-emerald-700">✅ {t("completed_day")}</p>
        </div>
      )}

      {/* ── Date + Clock ── */}
      <div className="mx-4 mt-4 text-center">
        <p className="text-4xl font-light text-slate-800">{currentTime.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" })}</p>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          {selectedDate.toLocaleDateString(locale, { weekday: "long", day: "2-digit", month: "short" })}
          {loading ? " · Cargando..." : ""}
        </p>
      </div>

      {/* ── Week Carousel ── */}
      <div ref={carouselRef} className="mx-4 mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {daysArray.map((item, i) => (
          <button key={i} onClick={() => setSelectedDate(item.date)}
            className={`flex-none w-[60px] py-2.5 rounded-xl flex flex-col items-center transition-all
              ${item.isSelected ? "bg-[#111827] text-white scale-105 shadow-lg" : item.isToday ? "bg-blue-50 border-2 border-blue-400 text-blue-600" : "bg-white text-slate-600 shadow-sm"}`}>
            <span className="text-[9px] font-bold uppercase">{item.date.toLocaleDateString(locale, { weekday: "short" })}</span>
            <span className="text-lg font-bold">{item.date.getDate()}</span>
          </button>
        ))}
      </div>

      {/* ── Time Blocks ── */}
      <div className="mx-4 mt-5">
        <p className="text-sm font-bold text-slate-800">{t("blocks_title")}</p>
        <p className="text-xs text-slate-500">{t("blocks_subtitle")}</p>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {blockSummary.map((block, i) => (
            <button key={i} onClick={() => setActiveBlock(activeBlock === i ? null : i)}
              className={`bg-white rounded-xl p-3 text-left shadow-sm transition-all ${activeBlock === i ? "ring-2 ring-slate-800" : ""}`}>
              <div className="w-3 h-3 rounded-full mb-2" style={{ backgroundColor: block.color }} />
              <p className="text-sm font-bold text-slate-800">{block.name}</p>
              <p className="text-xs text-slate-500 mt-1">{block.pending} {t("pending")} · {block.total} {t("total")}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Active Block Items ── */}
      {activeBlock !== null && blockSummary[activeBlock]?.items.length > 0 && (
        <div className="mx-4 mt-4 space-y-3">
          <p className="text-sm font-bold text-slate-800">{blockSummary[activeBlock].name} · {blockSummary[activeBlock].items.length} {t("day_doses")}</p>
          {blockSummary[activeBlock].items.map((med) => (
            <MedCard key={med.id} med={med} t={t} onToggle={toggleMed} onDose={openDoseModal} dayCompleted={dayCompleted} />
          ))}
        </div>
      )}

      {/* ── Show All Toggle ── */}
      <div className="mx-4 mt-5">
        <button onClick={() => setShowAllMeds((p) => !p)}
          className="w-full bg-[#111827] text-white text-xs font-bold py-3 rounded-xl uppercase tracking-wider active:scale-[0.98] transition-transform">
          {showAllMeds ? t("hide_day") : t("show_day")}
        </button>
      </div>

      {showAllMeds && (
        <div className="mx-4 mt-4 space-y-4">
          {blockSummary.map((block, i) => block.items.length > 0 ? (
            <div key={i}>
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">{block.name} · {block.items.length} {t("day_doses")}</p>
              <div className="space-y-3">
                {block.items.map((med) => (
                  <MedCard key={med.id} med={med} t={t} onToggle={toggleMed} onDose={openDoseModal} dayCompleted={dayCompleted} />
                ))}
              </div>
            </div>
          ) : null)}
          {allItems.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl"><p className="text-slate-400 text-sm">{t("no_records")}</p></div>
          )}
        </div>
      )}

      {/* ── Bottom Nav ── */}
      <nav className="fixed bottom-4 left-0 right-0 px-4 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center bg-[#0f172a]/95 backdrop-blur-xl py-4 rounded-2xl shadow-2xl border border-white/10">
          <button onClick={() => window.location.href = "tel:112"}
            className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-lg active:scale-90 transition-transform">📞</button>
          <button onClick={() => { setShowAlerts((p) => !p); if (!showAlerts) loadAlerts(); }}
            className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-lg active:scale-90 transition-transform">🔔</button>
          <button onClick={async () => { await loadDoctor(); setShowSos(true); }}
            className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center text-lg active:scale-90 transition-transform">🏥</button>
          <button onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-white text-lg active:scale-90 transition-transform">📷</button>
        </div>
      </nav>

      {/* ── Modals ── */}
      {showSos && (
        <Modal onClose={() => setShowSos(false)} title={t("doctor_title")}>
          {doctor ? (<>
            <p className="text-sm font-semibold text-slate-800">{doctor.first_name} {doctor.last_name}</p>
            <p className="text-xs text-slate-500 mt-1">{doctor.street} {doctor.house_number}</p>
            <p className="text-xs text-slate-500">{doctor.postal_code} {doctor.city}</p>
            <p className="text-xs text-slate-500 mt-2">Email: {doctor.email || "-"}</p>
            <p className="text-xs text-slate-500">Tel: {doctor.phone || "-"}</p>
            <textarea className="w-full mt-3 border border-slate-200 rounded-xl p-3 text-sm min-h-[100px]"
              value={sosMessage} onChange={(e) => setSosMessage(e.target.value)} />
            <div className="flex gap-2 mt-3">
              {doctor.phone && <button onClick={() => window.location.href = `tel:${doctor.phone}`}
                className="flex-1 bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl">{t("call")}</button>}
              {doctor.email && <button onClick={() => window.location.href = `mailto:${doctor.email}?subject=${encodeURIComponent("Consulta médica")}&body=${encodeURIComponent(sosMessage)}`}
                className="flex-1 bg-[#111827] text-white text-xs font-bold py-3 rounded-xl">{t("send_email")}</button>}
            </div>
          </>) : <p className="text-sm text-slate-500">{t("no_doctor")}</p>}
        </Modal>
      )}

      {showScan && (
        <Modal onClose={() => { setShowScan(false); setScanFile(null); setScanPreview(null); setScanResult(null); setScanError(""); }} title={t("scan_med")}>
          {scanPreview && <img src={scanPreview} alt="scan" className="w-full h-48 object-cover rounded-xl" />}
          {scanError && <p className="text-sm text-red-500 mt-2">{scanError}</p>}
          {scanResult && (
            <div className="mt-2 bg-emerald-50 rounded-xl p-3">
              <p className="text-sm font-bold text-emerald-700">{t("import_success")}</p>
              <p className="text-xs text-slate-600 mt-1">{scanResult.extracted?.name} · {scanResult.extracted?.dosage}</p>
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <button onClick={uploadScan} disabled={scanUploading}
              className="flex-1 bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl">{scanUploading ? t("importing") : t("upload")}</button>
            <button onClick={() => setShowScan(false)}
              className="flex-1 bg-[#111827] text-white text-xs font-bold py-3 rounded-xl">{t("close")}</button>
          </div>
        </Modal>
      )}

      {showDoseModal && (
        <Modal onClose={() => setShowDoseModal(false)} title={t("dose_update")}>
          <p className="text-sm text-slate-600">{doseMed?.nombre} {doseMed?.dosis ? `· ${doseMed.dosis}` : ""}</p>
          <label className="block text-xs font-bold text-slate-500 uppercase mt-3">{t("new_dose")}</label>
          <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" value={doseValue} onChange={(e) => setDoseValue(e.target.value)} placeholder="Ej: 60 mg" />
          <label className="block text-xs font-bold text-slate-500 uppercase mt-3">{t("effective_date")}</label>
          <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" value={doseDate} onChange={(e) => setDoseDate(e.target.value)} placeholder="2026-02-14" />
          {doseMessage && <p className="text-xs text-slate-600 mt-2">{doseMessage}</p>}
          <div className="flex gap-2 mt-3">
            <button onClick={submitDoseChange} disabled={doseSubmitting}
              className="flex-1 bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl">{doseSubmitting ? t("sending") : t("send_request")}</button>
            <button onClick={() => setShowDoseModal(false)}
              className="flex-1 bg-[#111827] text-white text-xs font-bold py-3 rounded-xl">{t("close")}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ onClose, title, children }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="text-slate-400 text-lg leading-none">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MedCard({ med, t, onToggle, onDose, dayCompleted }) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm transition-all ${med.completado ? "border-2 border-emerald-400 bg-emerald-50/50" : "border border-slate-100"}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-none ${med.completado ? "bg-emerald-500 text-white" : "bg-slate-100"}`}>
          {med.completado ? "✓" : "💊"}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${med.completado ? "text-emerald-700" : "text-slate-800"}`}>{med.nombre}</p>
          <p className="text-xs text-slate-500 mt-1">{med.hora?.substring(0,5)} · {med.dosis || ""} · {t("stock")} {med.stock}</p>
          {med.pending_dose && (
            <p className="text-xs text-amber-600 mt-1 font-medium">{t("pending_change")}: {med.requested_dosage}{med.effective_date ? ` · ${med.effective_date}` : ""}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button onClick={() => onToggle(med)} disabled={dayCompleted || med.completado}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-transform ${med.completado ? "bg-emerald-500 text-white" : "bg-[#007AFF] text-white"} ${dayCompleted ? "opacity-50" : ""}`}>
          {med.completado ? t("taken") : t("confirm")}
        </button>
        {!med.completado && (
          <button onClick={() => onDose(med)}
            className="bg-slate-100 text-slate-600 text-xs font-medium py-2.5 px-3 rounded-xl active:scale-95 transition-transform">{t("update_dose")}</button>
        )}
      </div>
    </div>
  );
}
