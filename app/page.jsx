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
    scan_birth_label: "Validar por fecha de nacimiento (DD.MM.AAAA)",
    scan_birth_hint: "Si el nombre no coincide, ingresa la fecha de nacimiento del paciente.",
    scan_do_not_close: "No cierres la app hasta que termine el escaneo.",
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
    no_records: "No hay registros hoy",     emergency: "Emergencia 112",
    disclaimer_title: "Aviso legal importante",
    disclaimer_accept: "He leído y acepto",
    disclaimer_text: "MediControl es una herramienta de apoyo para organización y recordatorios. No emite diagnósticos ni sustituye el criterio médico. Las decisiones sobre su medicación son responsabilidad del paciente y/o su responsable, junto con profesionales sanitarios. Ante cualquier duda, consulte a su médico o farmacéutico.",
    disclaimer_email_note: "Al aceptar, se enviará una confirmación por correo electrónico al usuario y al administrador del sistema como registro legal.",
    feedback_title: "Tu opinión nos importa",
    feedback_subtitle: "¿Cómo calificarías tu experiencia con la app?",
    feedback_placeholder: "Comentarios, sugerencias o problemas...",
    feedback_send: "Enviar valoración",
    feedback_thanks: "¡Gracias por tu opinión!",
    feedback_later: "Más tarde",
    beta_tag: "BETA",
    notif_enable: "Activar notificaciones",
    notif_enabled: "Notificaciones activas",
    view_plans: "Ver planes",
    trial_days: "Prueba gratuita",
    days_remaining: "días restantes",
    meds_limit: "medicamentos",
    activate_plan: "Activar",
    trial_expired_title: "Tu prueba gratuita ha expirado",
    trial_expired_text: "Activa tu suscripción para continuar. Recibirás un email con la oferta.",
    sub_inactive: "Suscripción inactiva",
    sub_inactive_text: "Activa tu plan para continuar usando la app.",
    limit_reached: "Has alcanzado el límite de",
    limit_text: "Activa tu suscripción para añadir más.",
    manual_entry: "Entrada manual",
    manual_title: "Añadir medicamento manualmente",
    med_name: "Nombre del medicamento",
    med_dosage: "Dosis (ej: 60 mg)",
    med_qty: "Cantidad (unidades)",
    med_expiry: "Fecha de caducidad",
    manual_save: "Guardar medicamento",
    manual_saving: "Guardando...",
    manual_saved: "Medicamento guardado correctamente.",
    manual_error: "No se pudo guardar el medicamento.",
    scan_or_manual: "Escanea una etiqueta o añade manualmente.",
    choose_photo: "Elegir foto",
    take_photo: "Tomar foto",
    edit_med: "Editar",
    edit_title: "Editar medicamento",
    edit_save: "Guardar cambios",
    edit_saving: "Guardando...",
    edit_saved: "Cambios guardados.",
    edit_error: "No se pudieron guardar los cambios.",
    detected_text_title: "Texto detectado por OCR",
    expiry_label: "Caducidad",
    dose_unit: "comp.",
    dose_qty: "Cantidad por toma",
    dose_per_block: "Cantidad por horario",
    dose_per_block_hint: "Ej: 1/2, 1, 2. Vacío = no tomar.",
    block_morning: "Mañana",
    block_midday: "Mediodía",
    block_afternoon: "Tarde",
    block_night: "Noche",
    stock_report: "Mi inventario",
    stock_report_sub: "Lista detallada de medicamentos y stock",
    download_pdf: "Descargar PDF",
    send_report_email: "Enviar por email",
    report_sent: "Reporte enviado a tu email",
    report_error: "No se pudo enviar",
    bp_title: "Medir presión",
    bp_sub: "Registra tu presión arterial",
    bp_systolic: "Sistólica (mmHg)",
    bp_diastolic: "Diastólica (mmHg)",
    bp_pulse: "Pulso (opcional)",
    bp_save: "Guardar",
    bp_saving: "Guardando...",
    bp_saved: "Registro guardado",
    bp_error: "No se pudo guardar",
    bp_invalid: "Sistólica y diastólica deben ser válidas (ej: 120/80)",
    bp_recent: "Registros recientes",
    bp_empty: "Sin registros aún",
    doctor_add: "Añadir médico de cabecera",
    doctor_edit: "Editar datos",
    doctor_first_name: "Nombre",
    doctor_last_name: "Apellido",
    doctor_email: "Email",
    doctor_phone: "Teléfono",
    doctor_save: "Guardar",
    doctor_saving: "Guardando...",
    doctor_saved: "Datos guardados",
    doctor_error: "No se pudo guardar",
    doctor_required: "Nombre y apellido son obligatorios",
    doctor_sos_hint: "Nombre, apellido, email y teléfono para activar el SOS.",
    interactions_title: "Interacciones",
    interactions_sub: "Posibles interacciones entre tus medicamentos",
    interactions_check: "Verificar interacciones",
    interactions_loading: "Verificando...",
    interactions_none: "No se detectaron interacciones conocidas.",
    interactions_few_meds: "Añade al menos 2 medicamentos para verificar interacciones.",
    interactions_consult: "Si hay coincidencias, consulte a su médico o farmacéutico.",
    interactions_severity_major: "Mayor",
    interactions_severity_moderate: "Moderada",
    interactions_severity_minor: "Menor",
    wellness_title: "Consejos de bienestar (IA)",
    wellness_sub: "Orientación general; no sustituye a médico ni farmacéutico.",
    wellness_coming_soon:
      "Esta función se implementará en próximas versiones de MediControl. Gracias por tu paciencia.",
    wellness_ok: "Entendido",
    more_title: "Más",
    optional_features: "Funciones opcionales",
    optional_features_sub: "Herramientas adicionales para tu salud",
    premium_required: "Función Premium",
    premium_required_sub:
      "Actualiza a Premium para desbloquear: médico SOS, inventario, presión arterial, interacciones y consejos de bienestar (IA).",
    upgrade_premium: "Ver planes Premium",
    onboarding_welcome: "Bienvenido a MediControl",
    onboarding_step1: "Activa las notificaciones",
    onboarding_step1_sub: "Toca la campana 🔔 para recibir recordatorios de tus tomas.",
    onboarding_step2_ios: "Añade a pantalla de inicio",
    onboarding_step2_ios_sub: "Safari → Compartir (↑) → Añadir a pantalla de inicio.",
    onboarding_step2_android: "Instala la app",
    onboarding_step2_android_sub: "Descarga MediControl desde Google Play para mejores notificaciones.",
    onboarding_step3: "Confirma tus tomas",
    onboarding_step3_sub: "Marca cada medicamento cuando lo tomes para llevar el control.",
    onboarding_skip: "Omitir",
    onboarding_next: "Siguiente",
    onboarding_done: "¡Empezar!",
  },
  "de-CH": {
    residents: "Bewohner", alerts: "Warnungen", view_alerts: "Anzeigen",
    view_less: "Weniger", refresh_alerts: "Aktualisieren", sos: "SOS",
    doctor_contact: "Arztkontakt", no_stock_alerts: "Keine Warnungen",
    scan_med: "Medikament scannen", scan_subtitle: "Foto der Etikette hochladen.",
    scan_birth_label: "Mit Geburtsdatum validieren (TT.MM.JJJJ)",
    scan_birth_hint: "Wenn der Name nicht übereinstimmt, Geburtsdatum eingeben.",
    scan_do_not_close: "App nicht schliessen, bis der Scan fertig ist.",
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
    disclaimer_email_note: "Durch die Annahme wird eine Bestätigung per E-Mail an den Benutzer und den Systemadministrator als rechtlicher Nachweis gesendet.",
    feedback_title: "Ihre Meinung ist uns wichtig",
    feedback_subtitle: "Wie bewerten Sie Ihre Erfahrung mit der App?",
    feedback_placeholder: "Kommentare, Vorschläge oder Probleme...",
    feedback_send: "Bewertung senden",
    feedback_thanks: "Vielen Dank für Ihre Bewertung!",
    feedback_later: "Später",
    beta_tag: "BETA",
    notif_enable: "Benachrichtigungen aktivieren",
    notif_enabled: "Benachrichtigungen aktiv",
    view_plans: "Pläne ansehen",
    trial_days: "Kostenlose Testversion",
    days_remaining: "Tage verbleibend",
    meds_limit: "Medikamente",
    activate_plan: "Aktivieren",
    trial_expired_title: "Ihre Testversion ist abgelaufen",
    trial_expired_text: "Aktivieren Sie Ihr Abonnement. Sie erhalten eine E-Mail mit dem Angebot.",
    sub_inactive: "Abonnement inaktiv",
    sub_inactive_text: "Aktivieren Sie Ihren Plan, um die App weiter zu nutzen.",
    limit_reached: "Sie haben das Limit erreicht von",
    limit_text: "Aktivieren Sie Ihr Abonnement für mehr.",
    manual_entry: "Manuell eingeben",
    manual_title: "Medikament manuell hinzufügen",
    med_name: "Medikamentenname",
    med_dosage: "Dosis (z.B. 60 mg)",
    med_qty: "Menge (Stück)",
    med_expiry: "Verfallsdatum",
    manual_save: "Medikament speichern",
    manual_saving: "Speichern...",
    manual_saved: "Medikament erfolgreich gespeichert.",
    manual_error: "Medikament konnte nicht gespeichert werden.",
    scan_or_manual: "Etikett scannen oder manuell eingeben.",
    choose_photo: "Foto wählen",
    take_photo: "Foto aufnehmen",
    edit_med: "Bearbeiten",
    edit_title: "Medikament bearbeiten",
    edit_save: "Änderungen speichern",
    edit_saving: "Speichern...",
    edit_saved: "Änderungen gespeichert.",
    edit_error: "Änderungen konnten nicht gespeichert werden.",
    detected_text_title: "Erkannter OCR-Text",
    expiry_label: "Verfallsdatum",
    dose_unit: "Tbl.",
    dose_qty: "Menge pro Einnahme",
    dose_per_block: "Menge pro Zeit",
    dose_per_block_hint: "z.B. 1/2, 1, 2. Leer = nicht nehmen.",
    block_morning: "Morgen",
    block_midday: "Mittag",
    block_afternoon: "Nachmittag",
    block_night: "Nacht",
    stock_report: "Mein Bestand",
    stock_report_sub: "Detaillierte Medikamentenliste",
    download_pdf: "PDF herunterladen",
    send_report_email: "Per E-Mail senden",
    report_sent: "Bericht an deine E-Mail gesendet",
    report_error: "Konnte nicht senden",
    bp_title: "Blutdruck messen",
    bp_sub: "Blutdruck erfassen",
    bp_systolic: "Systolisch (mmHg)",
    bp_diastolic: "Diastolisch (mmHg)",
    bp_pulse: "Puls (optional)",
    bp_save: "Speichern",
    bp_saving: "Speichern...",
    bp_saved: "Eintrag gespeichert",
    bp_error: "Konnte nicht speichern",
    bp_invalid: "Systolisch und diastolisch müssen gültig sein (z.B. 120/80)",
    bp_recent: "Letzte Einträge",
    bp_empty: "Noch keine Einträge",
    doctor_add: "Hausarzt hinzufügen",
    doctor_edit: "Daten bearbeiten",
    doctor_first_name: "Vorname",
    doctor_last_name: "Nachname",
    doctor_email: "E-Mail",
    doctor_phone: "Telefon",
    doctor_save: "Speichern",
    doctor_saving: "Speichern...",
    doctor_saved: "Daten gespeichert",
    doctor_error: "Konnte nicht speichern",
    doctor_required: "Vorname und Nachname sind erforderlich",
    doctor_sos_hint: "Name, Nachname, E-Mail und Telefon für SOS.",
    interactions_title: "Wechselwirkungen",
    interactions_sub: "Mögliche Wechselwirkungen zwischen Ihren Medikamenten",
    interactions_check: "Wechselwirkungen prüfen",
    interactions_loading: "Prüfen...",
    interactions_none: "Keine bekannten Wechselwirkungen erkannt.",
    interactions_few_meds: "Fügen Sie mindestens 2 Medikamente hinzu, um Wechselwirkungen zu prüfen.",
    interactions_consult: "Bei Übereinstimmungen: Arzt oder Apotheker konsultieren.",
    interactions_severity_major: "Schwer",
    interactions_severity_moderate: "Mässig",
    interactions_severity_minor: "Gering",
    wellness_title: "Wellness-Tipps (KI)",
    wellness_sub: "Allgemeine Orientierung; ersetzt nicht Arzt oder Apotheker.",
    wellness_coming_soon:
      "Diese Funktion wird in einer künftigen Version von MediControl verfügbar sein. Vielen Dank für Ihre Geduld.",
    wellness_ok: "Verstanden",
    more_title: "Mehr",
    optional_features: "Optionale Funktionen",
    optional_features_sub: "Zusätzliche Tools für Ihre Gesundheit",
    premium_required: "Premium-Funktion",
    premium_required_sub:
      "Upgrade auf Premium für: Arzt-SOS, Inventar, Blutdruck, Wechselwirkungen und Wellness-Tipps (KI).",
    upgrade_premium: "Premium-Pläne ansehen",
    onboarding_welcome: "Willkommen bei MediControl",
    onboarding_step1: "Benachrichtigungen aktivieren",
    onboarding_step1_sub: "Tippen Sie auf die Glocke 🔔 für Erinnerungen.",
    onboarding_step2_ios: "Zum Startbildschirm hinzufügen",
    onboarding_step2_ios_sub: "Safari → Teilen (↑) → Zum Home-Bildschirm.",
    onboarding_step2_android: "App installieren",
    onboarding_step2_android_sub: "Laden Sie MediControl aus dem Google Play Store.",
    onboarding_step3: "Einnahmen bestätigen",
    onboarding_step3_sub: "Markieren Sie jede Einnahme, um den Überblick zu behalten.",
    onboarding_skip: "Überspringen",
    onboarding_next: "Weiter",
    onboarding_done: "Los geht's!",
  },
  en: {
    residents: "Residents", alerts: "Alerts", view_alerts: "View",
    view_less: "Less", refresh_alerts: "Refresh", sos: "SOS",
    doctor_contact: "Doctor", no_stock_alerts: "No alerts",
    scan_med: "Scan medication", scan_subtitle: "Upload a photo of the label.",
    scan_birth_label: "Validate by birth date (DD.MM.YYYY)",
    scan_birth_hint: "If the name doesn't match, enter the patient's birth date.",
    scan_do_not_close: "Do not close the app until the scan is complete.",
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
    disclaimer_email_note: "By accepting, a confirmation email will be sent to the user and the system administrator as a legal record.",
    feedback_title: "Your opinion matters",
    feedback_subtitle: "How would you rate your experience with the app?",
    feedback_placeholder: "Comments, suggestions or issues...",
    feedback_send: "Send rating",
    feedback_thanks: "Thank you for your feedback!",
    feedback_later: "Later",
    beta_tag: "BETA",
    notif_enable: "Enable notifications",
    notif_enabled: "Notifications active",
    view_plans: "View plans",
    trial_days: "Free trial",
    days_remaining: "days remaining",
    meds_limit: "medicines",
    activate_plan: "Activate",
    trial_expired_title: "Your free trial has expired",
    trial_expired_text: "Activate your subscription to continue. You'll receive an email with the offer.",
    sub_inactive: "Subscription inactive",
    sub_inactive_text: "Activate your plan to continue using the app.",
    limit_reached: "You have reached the limit of",
    limit_text: "Activate your subscription for more.",
    manual_entry: "Manual entry",
    manual_title: "Add medication manually",
    med_name: "Medication name",
    med_dosage: "Dosage (e.g. 60 mg)",
    med_qty: "Quantity (units)",
    med_expiry: "Expiry date",
    manual_save: "Save medication",
    manual_saving: "Saving...",
    manual_saved: "Medication saved successfully.",
    manual_error: "Could not save the medication.",
    scan_or_manual: "Scan a label or add manually.",
    choose_photo: "Choose photo",
    edit_med: "Edit",
    edit_title: "Edit medication",
    edit_save: "Save changes",
    edit_saving: "Saving...",
    edit_saved: "Changes saved.",
    edit_error: "Could not save changes.",
    detected_text_title: "OCR detected text",
    expiry_label: "Expiry",
    dose_unit: "tab.",
    dose_qty: "Quantity per dose",
    dose_per_block: "Quantity per time",
    dose_per_block_hint: "e.g. 1/2, 1, 2. Empty = skip.",
    block_morning: "Morning",
    block_midday: "Midday",
    block_afternoon: "Afternoon",
    block_night: "Night",
    take_photo: "Take photo",
    stock_report: "My inventory",
    stock_report_sub: "Detailed medication list and stock",
    download_pdf: "Download PDF",
    send_report_email: "Send by email",
    report_sent: "Report sent to your email",
    report_error: "Could not send",
    bp_title: "Measure blood pressure",
    bp_sub: "Record your blood pressure",
    bp_systolic: "Systolic (mmHg)",
    bp_diastolic: "Diastolic (mmHg)",
    bp_pulse: "Pulse (optional)",
    bp_save: "Save",
    bp_saving: "Saving...",
    bp_saved: "Entry saved",
    bp_error: "Could not save",
    bp_invalid: "Systolic and diastolic must be valid (e.g. 120/80)",
    bp_recent: "Recent entries",
    bp_empty: "No entries yet",
    doctor_add: "Add primary doctor",
    doctor_edit: "Edit data",
    doctor_first_name: "First name",
    doctor_last_name: "Last name",
    doctor_email: "Email",
    doctor_phone: "Phone",
    doctor_save: "Save",
    doctor_saving: "Saving...",
    doctor_saved: "Data saved",
    doctor_error: "Could not save",
    doctor_required: "First and last name are required",
    doctor_sos_hint: "Name, surname, email and phone to activate SOS.",
    interactions_title: "Interactions",
    interactions_sub: "Possible interactions between your medications",
    interactions_check: "Check interactions",
    interactions_loading: "Checking...",
    interactions_none: "No known interactions detected.",
    interactions_few_meds: "Add at least 2 medications to check for interactions.",
    interactions_consult: "If there are matches, consult your doctor or pharmacist.",
    interactions_severity_major: "Major",
    interactions_severity_moderate: "Moderate",
    interactions_severity_minor: "Minor",
    wellness_title: "Wellness tips (AI)",
    wellness_sub: "General guidance only; not a substitute for a clinician.",
    wellness_coming_soon:
      "This feature will be available in a future version of MediControl. Thank you for your patience.",
    wellness_ok: "OK",
    more_title: "More",
    optional_features: "Optional features",
    optional_features_sub: "Additional tools for your health",
    premium_required: "Premium feature",
    premium_required_sub:
      "Upgrade to Premium for: doctor SOS, inventory, blood pressure, interactions and AI wellness tips.",
    upgrade_premium: "View Premium plans",
    onboarding_welcome: "Welcome to MediControl",
    onboarding_step1: "Enable notifications",
    onboarding_step1_sub: "Tap the bell 🔔 to get dose reminders.",
    onboarding_step2_ios: "Add to home screen",
    onboarding_step2_ios_sub: "Safari → Share (↑) → Add to Home Screen.",
    onboarding_step2_android: "Install the app",
    onboarding_step2_android_sub: "Download MediControl from Google Play for better notifications.",
    onboarding_step3: "Confirm your doses",
    onboarding_step3_sub: "Mark each medicine when you take it to stay on track.",
    onboarding_skip: "Skip",
    onboarding_next: "Next",
    onboarding_done: "Get started!",
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
  const [scanBirthDate, setScanBirthDate] = useState("");
  // Manual entry
  const [showManual, setShowManual] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualDosage, setManualDosage] = useState("");
  const [manualQty, setManualQty] = useState("");
  const [manualExpiry, setManualExpiry] = useState("");
  const [manualDoses, setManualDoses] = useState({ morning: "1", midday: "", afternoon: "", night: "" });
  const [manualSaving, setManualSaving] = useState(false);
  const [manualMessage, setManualMessage] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMed, setEditMed] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDosage, setEditDosage] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editExpiry, setEditExpiry] = useState("");
  const [editFreq, setEditFreq] = useState("1");
  const [editSaving, setEditSaving] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [showDoseModal, setShowDoseModal] = useState(false);
  const [doseMed, setDoseMed] = useState(null);
  const [doseValue, setDoseValue] = useState("");
  const [doseDate, setDoseDate] = useState("");
  const [doseSubmitting, setDoseSubmitting] = useState(false);
  const [doseMessage, setDoseMessage] = useState("");
  const [billing, setBilling] = useState(null);
  // Feedback
  const [showFeedback, setShowFeedback] = useState(false);
  const [fbRating, setFbRating] = useState(0);
  const [fbText, setFbText] = useState("");
  const [fbSending, setFbSending] = useState(false);
  const [fbSent, setFbSent] = useState(false);
  const [fbAlreadySent, setFbAlreadySent] = useState(false);
  // Notifications
  const [notifPermission, setNotifPermission] = useState("default");
  // Stock report
  const [showStockReport, setShowStockReport] = useState(false);
  const [stockReportData, setStockReportData] = useState(null);
  const [stockReportLoading, setStockReportLoading] = useState(false);
  const [reportSending, setReportSending] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  // Blood pressure
  const [showBp, setShowBp] = useState(false);
  const [bpReadings, setBpReadings] = useState([]);
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [bpPulse, setBpPulse] = useState("");
  const [bpSaving, setBpSaving] = useState(false);
  const [bpMessage, setBpMessage] = useState("");
  // Doctor form (SOS)
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [doctorSaving, setDoctorSaving] = useState(false);
  const [doctorMessage, setDoctorMessage] = useState("");
  const [showInteractions, setShowInteractions] = useState(false);
  const [interactionsData, setInteractionsData] = useState(null);
  const [interactionsLoading, setInteractionsLoading] = useState(false);
  const [showWellnessAi, setShowWellnessAi] = useState(false);
  const [showMoreDrawer, setShowMoreDrawer] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [oauthAppleMsg, setOauthAppleMsg] = useState("");
  const carouselRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const audioRef = useRef(null);

  const t = (key) => STRINGS[lang]?.[key] || STRINGS.es[key] || key;
  const blockNames = BLOCK_NAMES[lang] || BLOCK_NAMES.es;

  // ── Init ──
  useEffect(() => {
    setMounted(true);
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const oauthOk = params?.get("oauth") === "ok";
    const oauthError = params?.get("error") === "oauth_failed";
    const appleOAuthErr = params?.get("error") === "apple_oauth";
    const appleReason = params?.get("reason") || "";
    const oauthToken = params?.get("token");

    if (appleOAuthErr && appleReason) {
      try {
        setOauthAppleMsg(decodeURIComponent(appleReason));
      } catch {
        setOauthAppleMsg(appleReason);
      }
    }

    if (oauthOk || oauthError || appleOAuthErr) {
      if (typeof window !== "undefined") {
        window.history.replaceState({}, "", window.location.pathname);
      }
    }

    if (oauthOk) {
      const token = oauthToken || "";
      fetch("/auth/me", {
        credentials: "include",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.user) {
            const session = {
              id: data.user.sub || data.user.id,
              nombre: data.user.name,
              email: data.user.email,
              family_id: data.user.family_id,
              role: data.user.role,
              token: token || "",
            };
            localStorage.setItem("userSession", JSON.stringify(session));
            setUser(session);
            setToken(session.token || "");
          }
        })
        .catch(() => {});
      return;
    }

    try {
      const saved = localStorage.getItem("userSession");
      if (saved) {
        const s = JSON.parse(saved);
        if (s && typeof s === "object") {
          setUser(s);
          setToken(s.token || "");
          const accepted = localStorage.getItem(`disclaimer_accepted_${s.id}`);
          if (!accepted) setShowDisclaimer(true);
          // Feedback: solo una vez por usuario
          if (accepted) {
            const alreadySent = localStorage.getItem(`feedback_sent_${s.id}`);
            if (alreadySent) {
              setFbAlreadySent(true);
            } else {
              const lastFb = localStorage.getItem(`feedback_asked_${s.id}`);
              const daysSinceAsk = lastFb ? (Date.now() - new Date(lastFb).getTime()) / 86400000 : 999;
              if (daysSinceAsk >= 7) {
                setTimeout(() => setShowFeedback(true), 5000);
              }
            }
          }
        }
      }
      const savedLang = localStorage.getItem("lang");
      if (savedLang && STRINGS[savedLang]) setLang(savedLang);
    } catch {}
    // Register Service Worker early (required for iOS PWA notifications)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    // Notification permission
    if (typeof Notification !== "undefined") {
      setNotifPermission(Notification.permission);
    }
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSetUser = (session) => {
    setUser(session);
    setToken(session?.token || "");
    const accepted = localStorage.getItem(`disclaimer_accepted_${session?.id}`);
    if (!accepted) setShowDisclaimer(true);
  };

  // Disclaimer lang (independiente del lang principal para que el usuario pueda leer antes de aceptar)
  const [disclaimerLang, setDisclaimerLang] = useState(lang);
  const td = (key) => STRINGS[disclaimerLang]?.[key] || STRINGS.es[key] || key;

  const acceptDisclaimer = useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    setShowDisclaimer(false);
    const uid = user?.id;
    if (!uid) return;
    try {
      const ts = new Date().toISOString();
      localStorage.setItem(`disclaimer_accepted_${uid}`, ts);
      const tkn = token || user?.token || "";
      fetch(`/api/disclaimer-accepted`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(tkn ? { Authorization: `Bearer ${tkn}` } : {}) },
        credentials: "include",
        body: JSON.stringify({ user_id: uid, family_id: user?.family_id, accepted_at: ts, lang: disclaimerLang }),
      }).catch(() => {});
    } catch {}
  }, [user, token, disclaimerLang]);

  // ── Feedback ──
  const submitFeedback = () => {
    if (fbRating === 0) return;
    localStorage.setItem(`feedback_sent_${user?.id}`, new Date().toISOString());
    setFbSent(true);
    setFbAlreadySent(true);
    setTimeout(() => { setShowFeedback(false); setFbSent(false); setFbRating(0); setFbText(""); }, 1500);
    // Enviar al backend en background (no bloquear UI)
    try {
      fetch(`/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: "include",
        body: JSON.stringify({ user_id: user?.id, family_id: user?.family_id, rating: fbRating, comment: fbText.trim(), lang }),
      }).catch(() => {});
    } catch {}
  };
  const dismissFeedback = () => {
    localStorage.setItem(`feedback_asked_${user?.id}`, new Date().toISOString());
    setShowFeedback(false);
  };

  // ── Notifications + Sound ──
  const playNotifSound = useCallback(() => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Tri-tone notification sound (like iPhone SMS)
      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.4, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + duration);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };
      playTone(1046.5, 0, 0.12);    // C6
      playTone(1318.5, 0.15, 0.12); // E6
      playTone(1568, 0.30, 0.2);    // G6
    } catch {}
  }, []);

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") {
      const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      const isCapacitor = typeof window !== "undefined" && window.Capacitor?.isNativePlatform?.();
      const isPwa = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome|Edge/.test(navigator.userAgent);
      const msg = isIos && !isPwa
        ? "📱 Para activar notificaciones en iOS:\n\n1. Abre esta página en Safari\n2. Toca el botón Compartir (↑)\n3. Selecciona \"Añadir a pantalla de inicio\"\n4. Abre MediControl desde el icono nuevo\n5. Activa las notificaciones desde ahí"
        : isIos && isPwa
        ? "📱 Ve a Ajustes del iPhone → Mitteilungen → MediControl → Activa las notificaciones."
        : (isAndroid || isCapacitor)
        ? "📱 Para activar notificaciones en la app:\n\nAjustes del teléfono → Aplicaciones → MediControl → Notificaciones → Activar"
        : isSafari
        ? "📱 Safari: Abre en Chrome o Edge para notificaciones push, o instala la app desde el menú Compartir → Añadir a pantalla de inicio."
        : "📱 Para notificaciones: usa Chrome, Edge o Firefox. O instala la app desde el menú del navegador (⋮ → Instalar aplicación).";
      alert(msg);
      return;
    }
    try {
      const registration = "serviceWorker" in navigator
        ? await navigator.serviceWorker.ready
        : null;
      const perm = await Notification.requestPermission();
      setNotifPermission(perm);
      if (perm === "granted") {
        playNotifSound();
        try { new Notification("MediControl", { body: t("notif_enabled") }); } catch {}
        if (registration?.pushManager && token) {
          try {
            const vapidRes = await fetch("/api/push/vapid");
            const { publicKey } = await vapidRes.json();
            if (publicKey) {
              const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicKey),
              });
              const subJson = sub.toJSON();
              await fetch("/api/push/subscribe", {
                method: "POST",
                headers: { ...headers, "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ ...subJson, lang }),
              });
            }
          } catch (pushErr) {
            console.warn("Push subscribe failed:", pushErr);
          }
        }
      } else if (perm === "denied") {
        const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
        alert(isIos
          ? "Notificaciones bloqueadas. Ve a Ajustes → Mitteilungen → MediControl para habilitarlas."
          : "Notificaciones bloqueadas. Ve a Ajustes del navegador para habilitarlas.");
      }
    } catch (err) {
      console.error("Notification request error:", err);
    }
  };

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  }

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
      if (res.ok) {
        setDoctor(data);
        setDoctorFirstName(data.first_name || "");
        setDoctorLastName(data.last_name || "");
        setDoctorEmail(data.email || "");
        setDoctorPhone(data.phone || "");
      } else {
        setDoctor(null);
        setDoctorFirstName("");
        setDoctorLastName("");
        setDoctorEmail("");
        setDoctorPhone("");
      }
    } catch { setDoctor(null); }
  };

  const loadInteractions = useCallback(async () => {
    if (!user?.id || !token) return;
    setInteractionsLoading(true);
    setInteractionsData(null);
    try {
      const res = await fetch(`/api/drug-interactions?user_id=${user.id}`, { headers, credentials: "include" });
      const data = await res.json();
      setInteractionsData(res.ok ? data : { interactions: [], error: data.error });
    } catch { setInteractionsData({ interactions: [], error: "network" }); }
    finally { setInteractionsLoading(false); }
  }, [user, token, headers]);

  const loadBpReadings = useCallback(async () => {
    if (!user?.id || !token) return;
    try {
      const res = await fetch(`/api/blood-pressure?user_id=${user.id}`, { headers, credentials: "include" });
      const data = await res.json();
      setBpReadings(Array.isArray(data) ? data : []);
    } catch { setBpReadings([]); }
  }, [user, token, headers]);

  const saveDoctor = async (e) => {
    e?.preventDefault();
    if (!doctorFirstName?.trim() || !doctorLastName?.trim()) {
      setDoctorMessage(t("doctor_required"));
      return;
    }
    setDoctorSaving(true);
    setDoctorMessage("");
    try {
      const res = await fetch("/api/doctor", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          first_name: doctorFirstName.trim(),
          last_name: doctorLastName.trim(),
          email: doctorEmail.trim() || null,
          phone: doctorPhone.trim() || null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDoctorMessage(t("doctor_saved"));
        await loadDoctor();
        setShowDoctorForm(false);
      } else {
        setDoctorMessage(data.error || t("doctor_error"));
      }
    } catch { setDoctorMessage(t("doctor_error")); }
    finally { setDoctorSaving(false); }
  };

  const saveBp = async (e) => {
    e?.preventDefault();
    const s = Number(bpSystolic);
    const d = Number(bpDiastolic);
    if (!Number.isFinite(s) || s < 1 || s > 300 || !Number.isFinite(d) || d < 1 || d > 200) {
      setBpMessage(t("bp_invalid"));
      return;
    }
    setBpSaving(true);
    setBpMessage("");
    try {
      const res = await fetch("/api/blood-pressure", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          systolic: s,
          diastolic: d,
          pulse: bpPulse.trim() ? Number(bpPulse) : null,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBpMessage(t("bp_saved"));
        setBpSystolic("");
        setBpDiastolic("");
        setBpPulse("");
        loadBpReadings();
      } else {
        setBpMessage(data.error || t("bp_error"));
      }
    } catch { setBpMessage(t("bp_error")); }
    finally { setBpSaving(false); }
  };

  const loadStockReport = useCallback(async () => {
    if (!user?.id || !token) return;
    setStockReportLoading(true);
    setReportMessage("");
    try {
      const res = await fetch(`/api/stock-report?user_id=${user.id}`, { headers, credentials: "include" });
      const data = await res.json();
      if (res.ok) setStockReportData(data);
      else setReportMessage(data.error || t("report_error"));
    } catch { setReportMessage(t("report_error")); } finally { setStockReportLoading(false); }
  }, [user, token, headers, t]);

  const sendStockReportEmail = async () => {
    if (!user?.id || !token) return;
    setReportSending(true);
    setReportMessage("");
    try {
      const res = await fetch("/api/stock-report/send", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ user_id: user.id }),
      });
      const data = await res.json();
      if (res.ok) {
        setReportMessage(t("report_sent"));
      } else {
        setReportMessage(data.error || t("report_error"));
      }
    } catch { setReportMessage(t("report_error")); } finally { setReportSending(false); }
  };

  useEffect(() => {
    if (user && token) {
      loadMeds(); loadAlerts();
      fetch(`/api/billing/status?family_id=${user.family_id}`, { headers, credentials: "include" })
        .then(r => r.json()).then(d => setBilling(d)).catch(() => {});
      const alertInterval = setInterval(loadAlerts, 5 * 60 * 1000);

      // Onboarding: mostrar una vez por usuario
      const onboardingKey = `onboarding_done_${user.id}`;
      if (!localStorage.getItem(onboardingKey)) {
        setShowOnboarding(true);
        setOnboardingStep(0);
      }

      // Auto-request notifications if not yet asked (alertas automáticas)
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        const asked = localStorage.getItem("notif_asked");
        if (!asked) {
          setTimeout(() => {
            requestNotifications();
            localStorage.setItem("notif_asked", new Date().toISOString());
          }, 2000);
        }
      }

      // Auto re-subscribe push — always force fresh subscription with current VAPID key
      (async () => {
        try {
          if (typeof Notification !== "undefined" && Notification.permission === "granted" && "serviceWorker" in navigator) {
            const reg = await navigator.serviceWorker.ready;
            if (reg?.pushManager) {
              const vapidRes = await fetch("/api/push/vapid");
              const { publicKey } = await vapidRes.json();
              if (publicKey) {
                const existing = await reg.pushManager.getSubscription();
                if (existing) await existing.unsubscribe();
                const sub = await reg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(publicKey),
                });
                const subJson = sub.toJSON();
                await fetch("/api/push/subscribe", {
                  method: "POST",
                  headers: { ...headers, "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({ ...subJson, lang }),
                });
                console.log("[PUSH] Subscription refreshed successfully");
              }
            }
          }
        } catch (e) { console.warn("[PUSH] Auto re-subscribe failed:", e); }
      })();

      return () => clearInterval(alertInterval);
    }
  }, [user, token, loadMeds, loadAlerts]);

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
      if (res.ok) { loadMeds(); loadAlerts(); }
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

  const [scanDetectedText, setScanDetectedText] = useState("");

  const openManualEntry = () => {
    setManualName(""); setManualDosage(""); setManualQty(""); setManualExpiry("");
    setManualDoses({ morning: "1", midday: "", afternoon: "", night: "" });
    setManualMessage(""); setManualSaving(false); setShowManual(true);
  };
  const submitManualMed = async () => {
    if (!manualName.trim() || !user?.id) return;
    setManualSaving(true); setManualMessage("");
    try {
      const res = await fetch(`/api/import-scan`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
        body: (() => {
          const fd = new FormData();
          fd.append("family_id", String(user.family_id));
          fd.append("user_id", String(user.id));
          fd.append("fast_import", "1");
          fd.append("manual_name", manualName.trim());
          fd.append("manual_dosage", manualDosage.trim() || "N/A");
          fd.append("manual_qty", manualQty.trim() || "0");
          fd.append("manual_expiry", manualExpiry.trim() || "");
          if (manualDoses.morning) fd.append("manual_morning", manualDoses.morning);
          if (manualDoses.midday) fd.append("manual_midday", manualDoses.midday);
          if (manualDoses.afternoon) fd.append("manual_afternoon", manualDoses.afternoon);
          if (manualDoses.night) fd.append("manual_night", manualDoses.night);
          fd.append("file", new Blob(["manual"]), "manual.txt");
          return fd;
        })(),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setManualMessage(t("manual_saved"));
        loadMeds();
        setTimeout(() => setShowManual(false), 1500);
      } else {
        setManualMessage(data.error || t("manual_error"));
      }
    } catch { setManualMessage(t("manual_error")); } finally { setManualSaving(false); }
  };

  const openEditModal = (med) => {
    setEditMed(med);
    setEditName(med.nombre || "");
    setEditDosage(med.dosis || "");
    setEditStock(String(med.stock ?? ""));
    setEditExpiry(med.caducidad ? med.caducidad.slice(0, 10) : "");
    setEditFreq(med.frecuencia || "1");
    setEditMessage("");
    setEditSaving(false);
    setShowEditModal(true);
  };

  const submitEditMed = async () => {
    if (!editMed?.medicine_id || !user?.id || !editName.trim()) return;
    setEditSaving(true); setEditMessage("");
    try {
      const medRes = await fetch(`/api/medicines/${editMed.medicine_id}`, {
        method: "PUT", headers: { ...headers, "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({
          family_id: user.family_id,
          user_id: user.id,
          name: editName.trim(),
          dosage: editDosage.trim() || "N/A",
          current_stock: Number(editStock) || 0,
          expiration_date: editExpiry || null,
        }),
      });
      if (editMed.id && editFreq.trim()) {
        await fetch(`/api/schedules/${editMed.id}`, {
          method: "PUT", headers: { ...headers, "Content-Type": "application/json" }, credentials: "include",
          body: JSON.stringify({
            family_id: user.family_id,
            medicine_id: editMed.medicine_id,
            user_id: user.id,
            dose_time: editMed.hora || "08:00",
            frequency: editFreq.trim(),
          }),
        });
      }
      const data = await medRes.json().catch(() => ({}));
      if (medRes.ok) {
        setEditMessage(t("edit_saved"));
        loadMeds();
        setTimeout(() => setShowEditModal(false), 1200);
      } else {
        setEditMessage(data.error || t("edit_error"));
      }
    } catch { setEditMessage(t("edit_error")); } finally { setEditSaving(false); }
  };

  // Comprimir imagen con canvas (como Expo Go: resize 1000px, quality 0.6)
  const compressImage = useCallback((file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const maxW = 1000;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => resolve(blob || file), "image/jpeg", 0.6);
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScanFile(file); setScanPreview(URL.createObjectURL(file));
    setScanResult(null); setScanError(""); setScanBirthDate("");
    setScanDetectedText(""); setShowScan(true);
  };

  const uploadScan = async () => {
    if (!scanFile || !user?.id) return;
    setScanUploading(true); setScanError(""); setScanDetectedText("");
    try {
      // Comprimir imagen como Expo Go
      const compressed = await compressImage(scanFile);
      const form = new FormData();
      form.append("family_id", String(user.family_id));
      form.append("user_id", String(user.id));
      form.append("fast_ocr", "1");
      if (scanBirthDate.trim()) {
        form.append("birth_date", scanBirthDate.trim());
      }
      form.append("file", compressed, "scan.jpg");

      const tryUpload = async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 120000);
        try {
          const res = await fetch(`/api/import-scan`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: form,
            signal: controller.signal,
          });
          const data = await res.json().catch(() => ({}));
          return { res, data };
        } finally { clearTimeout(timeout); }
      };

      let result = await tryUpload();
      // Reintento una vez si falla (como Expo Go)
      if (!result.res.ok) {
        await new Promise((r) => setTimeout(r, 1000));
        result = await tryUpload();
      }

      const detText = result.data.detected_text_full || result.data.detected_text || "";
      if (detText) setScanDetectedText(detText);
      if (!result.res.ok) {
        setScanError(result.data.error || "No se pudo importar el medicamento.");
      } else {
        setScanResult(result.data);
        loadMeds();
      }
    } catch (err) {
      setScanError(err.name === "AbortError" ? "Tiempo de espera agotado. Intenta de nuevo." : "Error de conexión: " + (err.message || ""));
    } finally { setScanUploading(false); }
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
    const itemWidth = 60 + 8;
    const scrollX = idx * itemWidth + 30 - carouselRef.current.clientWidth / 2;
    carouselRef.current.scrollTo({ left: Math.max(0, scrollX), behavior: "smooth" });
  }, [selectedDate, daysArray]);

  useEffect(() => {
    if (!user || !carouselRef.current) return;
    const todayIdx = daysArray.findIndex((d) => d.isToday);
    if (todayIdx < 0) return;
    const itemWidth = 60 + 8;
    const scrollX = todayIdx * itemWidth + 30 - carouselRef.current.clientWidth / 2;
    const timer = setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollTo({ left: Math.max(0, scrollX), behavior: "auto" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [user, daysArray]);

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

  if (!user) return <LoginUI setUser={handleSetUser} oauthAppleMessage={oauthAppleMsg} />;

  const locale = lang === "de-CH" ? "de-CH" : lang === "en" ? "en-US" : "es-ES";

  return (
    <div className="min-h-dvh bg-[#F2F4F8] pb-28">
      {/* ── Top Bar con safe area para iPhone ── */}
      <div className="bg-[#0f172a] text-white px-5 pt-[env(safe-area-inset-top,12px)] pb-4">
        <div className="flex justify-between items-center pt-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">M</div>
              <h1 className="text-sm font-bold text-emerald-400">MediControl</h1>
              <span className="text-[8px] font-black bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded">{t("beta_tag")}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{user.nombre} · {t("live_caption")}</p>
          </div>
          <div className="flex items-center gap-2 flex-none">
            {notifPermission !== "granted" && (
              <button onClick={requestNotifications}
                className="bg-blue-500 text-white text-[10px] font-bold px-2.5 py-2 rounded-xl active:scale-95 transition-transform">
                🔔
              </button>
            )}
            <button onClick={handleLogout}
              className="bg-red-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg active:scale-95 transition-transform">
              {t("logout")} ✕
            </button>
          </div>
        </div>
        {/* Language selector + feedback */}
        <div className="flex items-center gap-2 mt-3">
          {["de-CH","es","en"].map((l) => (
            <button key={l} onClick={() => changeLang(l)}
              className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-colors ${lang === l ? "bg-white text-slate-900" : "bg-slate-800 text-slate-400"}`}>
              {l === "de-CH" ? "DE" : l.toUpperCase()}
            </button>
          ))}
          <div className="flex-1" />
          {!fbAlreadySent && (
            <button onClick={() => setShowFeedback(true)}
              className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg">
              ⭐ Feedback
            </button>
          )}
        </div>
      </div>

      {/* ── Legal Disclaimer Popup ── */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
          <form action="#" method="GET" onSubmit={acceptDisclaimer}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col"
            style={{ maxHeight: "85vh" }}>
            <div className="p-6 pb-3 overflow-y-auto flex-1 overscroll-contain">
              <div className="flex justify-center gap-2 mb-4">
                {["de-CH", "es", "en"].map((k) => (
                  <a key={k} href="#" role="button"
                    onClick={(e) => { e.preventDefault(); setDisclaimerLang(k); }}
                    className={`text-xs font-bold px-4 py-1.5 rounded-full no-underline ${disclaimerLang === k ? "bg-[#0f172a] text-white" : "bg-slate-100 text-slate-500"}`}>
                    {k === "de-CH" ? "Deutsch" : k === "es" ? "Español" : "English"}
                  </a>
                ))}
              </div>
              <div className="text-center mb-4">
                <div className="mx-auto mb-3 w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-2xl">⚕️</div>
                <h2 className="text-lg font-bold text-slate-800">{td("disclaimer_title")}</h2>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-slate-700 leading-relaxed">{td("disclaimer_text")}</p>
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                {td("disclaimer_email_note")}
              </p>
            </div>
            <div className="p-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <input type="submit"
                value={`${td("disclaimer_accept")} ✓`}
                className="w-full bg-[#007AFF] text-white text-sm font-bold py-4 rounded-xl shadow-lg active:bg-blue-700 transition-colors cursor-pointer" />
              <a href="#" role="button"
                onClick={acceptDisclaimer}
                className="block text-center text-xs text-slate-400 underline py-1 no-underline">
                {td("disclaimer_accept")}
              </a>
            </div>
          </form>
        </div>
      )}

      {/* ── Feedback Popup ── */}
      {showFeedback && !showDisclaimer && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4" onClick={dismissFeedback}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {fbSent ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-base font-bold text-slate-800">{t("feedback_thanks")}</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-4">
                  <div className="mx-auto mb-2 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-xl">⭐</div>
                  <h2 className="text-base font-bold text-slate-800">{t("feedback_title")}</h2>
                  <p className="text-xs text-slate-500 mt-1">{t("feedback_subtitle")}</p>
                </div>
                {/* Star rating */}
                <div className="flex justify-center gap-2 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <button key={star} onClick={() => setFbRating(star)}
                      className={`text-3xl transition-transform active:scale-110 ${star <= fbRating ? "" : "opacity-30 grayscale"}`}>
                      ⭐
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm min-h-[80px] mb-3 resize-none"
                  placeholder={t("feedback_placeholder")}
                  value={fbText} onChange={(e) => setFbText(e.target.value)}
                />
                <div className="flex gap-2">
                  <button onClick={submitFeedback} disabled={fbRating === 0}
                    className="flex-1 bg-[#007AFF] text-white text-sm font-bold py-3 rounded-xl disabled:opacity-50 active:scale-[0.98] transition-transform">
                    {t("feedback_send")}
                  </button>
                  <button onClick={dismissFeedback}
                    className="flex-1 bg-slate-100 text-slate-600 text-sm font-bold py-3 rounded-xl active:scale-[0.98] transition-transform">
                    {t("feedback_later")}
                  </button>
                </div>
              </>
            )}
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

      {/* ── Billing / Trial Banner ── */}
      {billing && billing.trial && (
        <div className="mx-4 mt-3 bg-blue-50 border border-blue-300 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-blue-800">
                {t("trial_days")}: {billing.days_left > 0 ? `${billing.days_left} ${t("days_remaining")}` : "⏰"}
              </p>
              <p className="text-[10px] text-blue-600">
                {billing.max_medicines ? `${billing.current_medicines || 0}/${billing.max_medicines} ${t("meds_limit")}` : ""}
              </p>
            </div>
            <a href="/billing" className="bg-[#007AFF] text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0">{t("view_plans")}</a>
          </div>
          {billing.max_medicines && billing.current_medicines >= billing.max_medicines && (
            <div className="mt-2 bg-amber-100 border border-amber-300 rounded-lg p-2">
              <p className="text-[11px] font-bold text-amber-800">{t("limit_reached")} {billing.max_medicines} {t("meds_limit")}.</p>
              <p className="text-[10px] text-amber-700">{t("limit_text")}</p>
            </div>
          )}
        </div>
      )}
      {billing && billing.trial_expired && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-300 rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-red-800">{t("trial_expired_title")}</p>
            <p className="text-[10px] text-red-600">{t("trial_expired_text")}</p>
          </div>
          <a href="/billing" className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0">{t("activate_plan")}</a>
        </div>
      )}
      {billing && !billing.active && !billing.trial && !billing.trial_expired && (
        <div className="mx-4 mt-3 bg-red-50 border border-red-300 rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-red-800">{t("sub_inactive")}</p>
            <p className="text-[10px] text-red-600">{t("sub_inactive_text")}</p>
          </div>
          <a href="/billing" className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0">{t("activate_plan")}</a>
        </div>
      )}

      {/* ── Status: Alertas (principal) ── */}
      <div className="px-4 flex gap-2 pb-2 pt-3">
        <button onClick={() => { setShowAlerts((p) => !p); if (!showAlerts) loadAlerts(); }}
          className="flex-1 bg-[#111827] rounded-xl px-4 py-3 shadow-sm text-center relative">
          <p className="text-[9px] font-bold text-blue-300 uppercase">{t("alerts")}</p>
          <p className="text-xs font-bold text-white mt-1">{showAlerts ? t("view_less") : t("view_alerts")}</p>
          {alerts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {alerts.length}
            </span>
          )}
        </button>
        <button onClick={loadAlerts}
          className="flex-none bg-slate-700 rounded-xl px-4 py-3 shadow-sm min-w-[60px] text-center">
          <p className="text-[9px] font-bold text-slate-300 uppercase">{t("refresh_alerts")}</p>
          <p className="text-xs font-bold text-white mt-1">{alertsLoading ? "..." : "🔄"}</p>
        </button>
      </div>

      {/* ── Alerts Panel ── */}
      {showAlerts && (
        <div className="mx-4 mt-2 bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase">{t("alerts")} ({alerts.length})</p>
            <div className="flex gap-2">
              <button onClick={async () => {
                try {
                  const r = await fetch("/api/push/test", { method: "POST", headers, credentials: "include" });
                  const data = await r.json();
                  if (data.ok) {
                    alert(`Push enviado (${data.sent}/${data.subscriptions} suscripciones). Revisa tu dispositivo.`);
                  } else if (data.error === "no_subscriptions") {
                    alert("No hay suscripciones push. Pulsa la campana azul para activar notificaciones primero.");
                  } else {
                    alert(`Error: ${data.message || data.error || "Desconocido"}`);
                  }
                } catch { alert("Error de conexión con el servidor"); }
              }} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-bold">
                Test Push
              </button>
              <button onClick={loadAlerts} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-bold">
                {alertsLoading ? "..." : "Refresh"}
              </button>
            </div>
          </div>
          {notifPermission !== "granted" && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 mb-2">
              <p className="text-xs text-amber-800 font-medium">
                Las notificaciones push no están activadas.
              </p>
              <button onClick={requestNotifications}
                className="mt-1 text-xs bg-amber-500 text-white px-3 py-1 rounded-lg font-bold">
                Activar notificaciones
              </button>
            </div>
          )}
          {alerts.length ? alerts.map((a) => (
            <div key={a.id} className="py-2 border-b border-slate-100 last:border-0 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">{a.med_name || a.message}{a.med_dosage ? ` · ${a.med_dosage}` : ""}</p>
                <p className="text-xs text-red-500 font-medium">{a.dose_time ? `${a.dose_time} · ` : ""}{a.alert_date || ""}</p>
              </div>
              <button onClick={async () => {
                try {
                  await fetch("/api/alerts/read", { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ alert_id: a.id }) });
                  loadAlerts();
                } catch {}
              }} className="text-slate-400 hover:text-emerald-500 text-lg ml-2 flex-none" title="Marcar como leída">✓</button>
            </div>
          )) : <p className="text-sm text-emerald-600 font-semibold">{t("no_stock_alerts")}</p>}
        </div>
      )}

      {/* ── Scan Card ── */}
      <div className="mx-4 mt-3 bg-white rounded-xl p-4 shadow-sm">
        <p className="text-sm font-bold text-slate-800">{t("scan_med")}</p>
        <p className="text-xs text-slate-500 mt-1">{t("scan_or_manual")}</p>
        <input ref={fileInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileSelect} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileSelect} />
        <div className="flex gap-2 mt-3 flex-wrap">
          <button onClick={() => fileInputRef.current?.click()}
            className="bg-sky-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl active:scale-95 transition-transform">🖼️ {t("choose_photo")}</button>
          <button onClick={() => cameraInputRef.current?.click()}
            className="bg-indigo-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl active:scale-95 transition-transform">📷 {t("take_photo")}</button>
          <button onClick={openManualEntry}
            className="bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl active:scale-95 transition-transform">✏️ {t("manual_entry")}</button>
        </div>
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

      {/* ── Week Carousel (hoy siempre centrado, color distinto) ── */}
      <div ref={carouselRef} className="mx-4 mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide scroll-smooth snap-x snap-mandatory">
        {daysArray.map((item, i) => (
          <button key={i} onClick={() => setSelectedDate(item.date)}
            className={`flex-none w-[60px] py-2.5 rounded-xl flex flex-col items-center transition-all snap-center
              ${item.isToday
                ? (item.isSelected ? "bg-blue-500 text-white scale-110 shadow-lg ring-2 ring-blue-300" : "bg-blue-100 border-2 border-blue-500 text-blue-700 scale-105")
                : (item.isSelected ? "bg-[#111827] text-white scale-110 shadow-lg" : "bg-white text-slate-600 shadow-sm")}`}>
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
            <MedCard key={med.id} med={med} t={t} onToggle={toggleMed} onDose={openDoseModal} onEdit={openEditModal} dayCompleted={dayCompleted} />
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
                  <MedCard key={med.id} med={med} t={t} onToggle={toggleMed} onDose={openDoseModal} onEdit={openEditModal} dayCompleted={dayCompleted} />
                ))}
              </div>
            </div>
          ) : null)}
          {allItems.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl"><p className="text-slate-400 text-sm">{t("no_records")}</p></div>
          )}
        </div>
      )}

      {/* ── Bottom Nav: 112 | Alertas | Escanear | Más ── */}
      <nav className="fixed bottom-4 left-0 right-0 px-4 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center bg-[#0f172a]/95 backdrop-blur-xl py-4 rounded-2xl shadow-2xl border border-white/10">
          <button onClick={() => window.location.href = "tel:112"}
            className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-lg active:scale-90 transition-transform" title="Emergencia 112">📞</button>
          <button onClick={() => { setShowAlerts((p) => !p); if (!showAlerts) loadAlerts(); }}
            className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white text-lg active:scale-90 transition-transform relative">
            🔔
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                {alerts.length > 99 ? "99+" : alerts.length}
              </span>
            )}
          </button>
          <button onClick={() => fileInputRef.current?.click()}
            className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-white text-lg active:scale-90 transition-transform">📷</button>
          <button onClick={() => setShowMoreDrawer(true)}
            className="w-12 h-12 bg-slate-600 rounded-xl flex items-center justify-center text-white text-lg active:scale-90 transition-transform">⋯</button>
        </div>
      </nav>

      {/* ── Drawer: Funciones opcionales (Premium) ── */}
      {showMoreDrawer && (
        <div className="fixed inset-0 z-[90] bg-black/50 flex items-end justify-center" onClick={() => setShowMoreDrawer(false)}>
          <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[70vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">{t("optional_features")}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{t("optional_features_sub")}</p>
              </div>
              <button onClick={() => setShowMoreDrawer(false)} className="text-slate-400 text-xl leading-none p-2">✕</button>
            </div>
            {!billing?.active && (
              <div className="mx-4 mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm font-bold text-amber-800">{t("premium_required")}</p>
                <p className="text-xs text-amber-700 mt-1">{t("premium_required_sub")}</p>
                <a href="/billing" className="mt-3 inline-block bg-amber-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl">{t("upgrade_premium")}</a>
              </div>
            )}
            <div className="p-4 space-y-2 overflow-y-auto max-h-[55vh]">
              <button onClick={async () => { setShowMoreDrawer(false); if (billing?.active) { await loadDoctor(); setShowSos(true); } else window.location.href = "/billing"; }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${billing?.active ? "bg-amber-50 hover:bg-amber-100" : "bg-slate-50 opacity-75"}`}>
                <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-2xl">🏥</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{t("sos")} — {t("doctor_contact")}</p>
                  <p className="text-xs text-slate-500">{t("doctor_title")}</p>
                </div>
                {!billing?.active && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Premium</span>}
              </button>
              <button onClick={async () => { setShowMoreDrawer(false); if (billing?.active) { setShowStockReport(true); await loadStockReport(); } else window.location.href = "/billing"; }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${billing?.active ? "bg-teal-50 hover:bg-teal-100" : "bg-slate-50 opacity-75"}`}>
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-2xl">📦</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{t("stock_report")}</p>
                  <p className="text-xs text-slate-500">{t("stock_report_sub")}</p>
                </div>
                {!billing?.active && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Premium</span>}
              </button>
              <button onClick={async () => { setShowMoreDrawer(false); if (billing?.active) { setShowBp(true); await loadBpReadings(); } else window.location.href = "/billing"; }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${billing?.active ? "bg-rose-50 hover:bg-rose-100" : "bg-slate-50 opacity-75"}`}>
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-2xl">💉</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{t("bp_title")}</p>
                  <p className="text-xs text-slate-500">{t("bp_sub")}</p>
                </div>
                {!billing?.active && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Premium</span>}
              </button>
              <button onClick={async () => { setShowMoreDrawer(false); if (billing?.active) { setShowInteractions(true); await loadInteractions(); } else window.location.href = "/billing"; }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${billing?.active ? "bg-amber-50 hover:bg-amber-100" : "bg-slate-50 opacity-75"}`}>
                <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-2xl">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{t("interactions_title")}</p>
                  <p className="text-xs text-slate-500">{t("interactions_sub")}</p>
                </div>
                {!billing?.active && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Premium</span>}
              </button>
              <button onClick={() => {
                setShowMoreDrawer(false);
                if (billing?.active) setShowWellnessAi(true);
                else window.location.href = "/billing";
              }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-colors ${billing?.active ? "bg-violet-50 hover:bg-violet-100" : "bg-slate-50 opacity-75"}`}>
                <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center text-2xl">💬</div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{t("wellness_title")}</p>
                  <p className="text-xs text-slate-500">{t("wellness_sub")}</p>
                </div>
                {!billing?.active && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">Premium</span>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Onboarding: pasos con sugerencias (iOS/Android) ── */}
      {showOnboarding && user && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                {onboardingStep === 0 ? t("onboarding_welcome") : `Paso ${onboardingStep + 1}`}
              </h2>
              <div className="w-16 h-16 mx-auto mt-4 mb-4 rounded-2xl flex items-center justify-center text-3xl bg-blue-100">
                {onboardingStep === 0 ? "👋" : onboardingStep === 1 ? "🔔" : onboardingStep === 2 ? (/Android/.test(navigator.userAgent) ? "📱" : "📲") : "✅"}
              </div>
              <p className="text-sm font-bold text-slate-700">
                {onboardingStep === 0 ? t("onboarding_step1") : onboardingStep === 1 ? (/iPad|iPhone|iPod/.test(navigator.userAgent) ? t("onboarding_step2_ios") : t("onboarding_step2_android")) : t("onboarding_step3")}
              </p>
              <p className="text-xs text-slate-500 mt-2">
                {onboardingStep === 0 ? t("onboarding_step1_sub") : onboardingStep === 1 ? (/iPad|iPhone|iPod/.test(navigator.userAgent) ? t("onboarding_step2_ios_sub") : t("onboarding_step2_android_sub")) : t("onboarding_step3_sub")}
              </p>
            </div>
            <div className="p-4 flex gap-2">
              <button onClick={() => { setShowOnboarding(false); try { localStorage.setItem(`onboarding_done_${user.id}`, "1"); } catch {} }}
                className="flex-1 py-3 text-slate-500 text-sm font-bold rounded-xl">{t("onboarding_skip")}</button>
              <button onClick={() => {
                if (onboardingStep >= 2) {
                  setShowOnboarding(false);
                  try { localStorage.setItem(`onboarding_done_${user.id}`, "1"); } catch {};
                } else setOnboardingStep(s => s + 1);
              }}
                className="flex-1 py-3 bg-blue-500 text-white text-sm font-bold rounded-xl">
                {onboardingStep >= 2 ? t("onboarding_done") : t("onboarding_next")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ── */}
      {showSos && (
        <Modal onClose={() => { setShowSos(false); setShowDoctorForm(false); }} title={t("doctor_title")}>
          {showDoctorForm ? (
            <form onSubmit={saveDoctor} className="space-y-3">
              <p className="text-xs text-slate-500">{t("doctor_add")}</p>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("doctor_first_name")} *</label>
                <input value={doctorFirstName} onChange={(e) => setDoctorFirstName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" placeholder="Ej: Juan" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("doctor_last_name")} *</label>
                <input value={doctorLastName} onChange={(e) => setDoctorLastName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" placeholder="Ej: García" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("doctor_email")}</label>
                <input type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" placeholder="email@ejemplo.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("doctor_phone")}</label>
                <input type="tel" value={doctorPhone} onChange={(e) => setDoctorPhone(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" placeholder="+41 79 123 45 67" />
              </div>
              {doctorMessage && <p className={`text-xs ${doctorMessage.includes("obligatorios") ? "text-amber-600" : "text-emerald-600"}`}>{doctorMessage}</p>}
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowDoctorForm(false)}
                  className="flex-1 bg-slate-200 text-slate-700 text-xs font-bold py-3 rounded-xl">{t("close")}</button>
                <button type="submit" disabled={doctorSaving}
                  className="flex-1 bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl disabled:opacity-50">{doctorSaving ? t("doctor_saving") : t("doctor_save")}</button>
              </div>
            </form>
          ) : doctor ? (<>
            <p className="text-sm font-semibold text-slate-800">{doctor.first_name} {doctor.last_name}</p>
            {(doctor.street || doctor.house_number) && <p className="text-xs text-slate-500 mt-1">{doctor.street} {doctor.house_number}</p>}
            {(doctor.postal_code || doctor.city) && <p className="text-xs text-slate-500">{doctor.postal_code} {doctor.city}</p>}
            <p className="text-xs text-slate-500 mt-2">Email: {doctor.email || "-"}</p>
            <p className="text-xs text-slate-500">Tel: {doctor.phone || "-"}</p>
            <textarea className="w-full mt-3 border border-slate-200 rounded-xl p-3 text-sm min-h-[100px]"
              placeholder={lang === "es" ? "Mensaje para el médico..." : lang === "de-CH" ? "Nachricht an den Arzt..." : "Message for doctor..."}
              value={sosMessage} onChange={(e) => setSosMessage(e.target.value)} />
            <div className="flex gap-2 mt-3 flex-wrap">
              {doctor.phone && <button onClick={() => window.location.href = `tel:${doctor.phone}`}
                className="flex-1 min-w-[100px] bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl">{t("call")}</button>}
              {doctor.email && <button onClick={() => window.location.href = `mailto:${doctor.email}?subject=${encodeURIComponent("Consulta médica")}&body=${encodeURIComponent(sosMessage)}`}
                className="flex-1 min-w-[100px] bg-[#111827] text-white text-xs font-bold py-3 rounded-xl">{t("send_email")}</button>}
              <button onClick={() => setShowDoctorForm(true)}
                className="flex-1 min-w-[100px] bg-slate-200 text-slate-700 text-xs font-bold py-3 rounded-xl">{t("doctor_edit")}</button>
            </div>
          </>) : (<>
            <p className="text-sm text-slate-500 mb-3">{t("no_doctor")}</p>
            <p className="text-xs text-slate-600 mb-3">{t("doctor_add")} — {lang === "es" ? "nombre, apellido, email y teléfono para activar el SOS." : lang === "de-CH" ? "Name, Nachname, E-Mail und Telefon für SOS." : "Name, surname, email and phone to activate SOS."}</p>
            <button onClick={() => setShowDoctorForm(true)}
              className="w-full bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl">{t("doctor_add")}</button>
          </>)}
        </Modal>
      )}

      {showBp && (
        <Modal onClose={() => setShowBp(false)} title={t("bp_title")}>
          <p className="text-xs text-slate-500 mb-3">{t("bp_sub")}</p>
          <form onSubmit={saveBp} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("bp_systolic")}</label>
                <input type="number" min="1" max="300" value={bpSystolic} onChange={(e) => setBpSystolic(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" placeholder="120" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("bp_diastolic")}</label>
                <input type="number" min="1" max="200" value={bpDiastolic} onChange={(e) => setBpDiastolic(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" placeholder="80" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase">{t("bp_pulse")}</label>
              <input type="number" min="30" max="200" value={bpPulse} onChange={(e) => setBpPulse(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1" placeholder="72" />
            </div>
            {bpMessage && <p className={`text-xs ${bpMessage === t("bp_saved") ? "text-emerald-600" : "text-amber-600"}`}>{bpMessage}</p>}
            <button type="submit" disabled={bpSaving}
              className="w-full bg-rose-500 text-white text-xs font-bold py-3 rounded-xl disabled:opacity-50">{bpSaving ? t("bp_saving") : t("bp_save")}</button>
          </form>
          <p className="text-xs font-bold text-slate-500 uppercase mt-4">{t("bp_recent")}</p>
          {bpReadings.length ? (
            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
              {bpReadings.map((r) => (
                <div key={r.id} className="flex justify-between text-sm py-1.5 border-b border-slate-100 last:border-0">
                  <span className="font-semibold text-slate-800">{r.systolic}/{r.diastolic}</span>
                  <span className="text-slate-500">{r.pulse ? `${r.pulse} bpm · ` : ""}{new Date(r.recorded_at).toLocaleString(lang === "es" ? "es-ES" : lang === "de-CH" ? "de-CH" : "en", { dateStyle: "short", timeStyle: "short" })}</span>
                </div>
              ))}
            </div>
          ) : <p className="text-xs text-slate-400 mt-1">{t("bp_empty")}</p>}
        </Modal>
      )}

      {showInteractions && (
        <Modal onClose={() => setShowInteractions(false)} title={t("interactions_title")}>
          <p className="text-xs text-slate-500 mb-3">{t("interactions_sub")}</p>
          {interactionsLoading ? (
            <p className="text-sm text-slate-500 py-4 text-center">{t("interactions_loading")}</p>
          ) : interactionsData ? (
            <>
              {interactionsData.interactions?.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {interactionsData.interactions.map((i, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                      <p className="text-sm font-bold text-slate-800">{i.drug_a} + {i.drug_b}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        i.severity === "major" ? "bg-red-200 text-red-800" :
                        i.severity === "moderate" ? "bg-amber-200 text-amber-800" : "bg-slate-200 text-slate-600"
                      }`}>
                        {i.severity === "major" ? t("interactions_severity_major") :
                         i.severity === "moderate" ? t("interactions_severity_moderate") : t("interactions_severity_minor")}
                      </span>
                      <p className="text-xs text-slate-600 mt-2">{i.description}</p>
                      {i.management && <p className="text-xs text-amber-700 mt-1 font-medium">{i.management}</p>}
                    </div>
                  ))}
                </div>
              ) : interactionsData.drugNames?.length < 2 ? (
                <p className="text-sm text-slate-500 py-4">{t("interactions_few_meds")}</p>
              ) : (
                <p className="text-sm text-emerald-600 font-medium py-4">{t("interactions_none")}</p>
              )}
              <div className="mt-4 bg-slate-100 rounded-xl p-3">
                <p className="text-xs font-bold text-slate-700">⚠️ {t("interactions_consult")}</p>
              </div>
              <button onClick={loadInteractions} disabled={interactionsLoading}
                className="w-full mt-3 bg-amber-600 text-white text-xs font-bold py-3 rounded-xl disabled:opacity-50">
                {interactionsLoading ? t("interactions_loading") : t("interactions_check")}
              </button>
            </>
          ) : null}
        </Modal>
      )}

      {showWellnessAi && (
        <Modal onClose={() => setShowWellnessAi(false)} title={t("wellness_title")}>
          <p className="text-xs text-slate-500 mb-3">{t("wellness_sub")}</p>
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-violet-950 leading-relaxed">{t("wellness_coming_soon")}</p>
          </div>
          <button
            type="button"
            onClick={() => setShowWellnessAi(false)}
            className="w-full bg-violet-600 text-white text-xs font-bold py-3 rounded-xl">
            {t("wellness_ok")}
          </button>
        </Modal>
      )}

      {showScan && (
        <Modal onClose={() => { setShowScan(false); setScanFile(null); setScanPreview(null); setScanResult(null); setScanError(""); setScanBirthDate(""); setScanDetectedText(""); }} title={t("scan_med")}>
          {scanPreview && <img src={scanPreview} alt="scan" className="w-full h-48 object-cover rounded-xl" />}
          {!scanPreview && !scanResult && (
            <div className="mt-2 text-center">
              <p className="text-xs text-slate-500 mb-2">Sube una foto de la caja del medicamento.</p>
              <button type="button" onClick={() => fileInputRef.current?.click()}
                className="bg-sky-500 text-white text-xs font-bold py-3 px-6 rounded-xl">{t("gallery")}</button>
            </div>
          )}
          {scanError && (
            <div className="mt-2">
              <p className="text-sm text-red-500 font-medium">{scanError}</p>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs font-bold text-amber-800 mb-1">{t("scan_birth_label")}</p>
                <p className="text-[10px] text-amber-600 mb-2">{t("scan_birth_hint")}</p>
                <input type="text"
                  inputMode="numeric"
                  placeholder="DD.MM.YYYY"
                  value={scanBirthDate}
                  onChange={(e) => setScanBirthDate(e.target.value.replace(/[^\d.]/g, "").slice(0, 10))}
                  className="w-full border border-amber-300 rounded-lg px-3 py-2 text-sm bg-white" />
              </div>
            </div>
          )}
          {scanDetectedText && (
            <div className="mt-2 bg-slate-50 border border-slate-200 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-600 mb-1">{t("detected_text_title")}</p>
              <pre className="text-[10px] text-slate-500 whitespace-pre-wrap leading-relaxed font-mono max-h-48 overflow-y-auto">{scanDetectedText}</pre>
            </div>
          )}
          {scanResult && (
            <div className="mt-2 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <p className="text-sm font-bold text-emerald-700">
                {scanResult.action === "merged" ? "Stock actualizado" : "Medicamento creado"}
              </p>
              <p className="text-xs text-slate-600 mt-1">{scanResult.extracted?.name} · {scanResult.extracted?.dosage}</p>
              {scanResult.extracted?.qty > 0 && <p className="text-xs text-slate-500">Cantidad: {scanResult.extracted.qty} unidades</p>}
              {scanResult.validated_by_birth_date && <p className="text-[10px] text-blue-500 mt-1">Validado por fecha de nacimiento</p>}
            </div>
          )}
          {scanPreview && (
            <div className="flex flex-col gap-2 mt-3">
              {scanUploading && (
                <p className="text-xs font-bold text-amber-700 bg-amber-100 rounded-lg px-3 py-2 text-center">
                  ⏳ {t("scan_do_not_close")}
                </p>
              )}
              <div className="flex gap-2">
              {!scanResult && (
                <button type="button" onClick={uploadScan} disabled={scanUploading || !scanFile}
                  className="flex-1 bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl disabled:opacity-50">
                  {scanUploading ? t("importing") : scanError ? "Reintentar" : t("upload")}
                </button>
              )}
              <button type="button" onClick={() => { setShowScan(false); setScanFile(null); setScanPreview(null); setScanResult(null); setScanError(""); setScanBirthDate(""); setScanDetectedText(""); }}
                className={`${scanResult ? "w-full" : "flex-1"} bg-[#111827] text-white text-xs font-bold py-3 rounded-xl`}>{t("close")}</button>
              </div>
            </div>
          )}
        </Modal>
      )}

      {/* ── Manual Entry Modal ── */}
      {showManual && (
        <Modal onClose={() => setShowManual(false)} title={t("manual_title")}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase">{t("med_name")} *</label>
              <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                value={manualName} onChange={(e) => setManualName(e.target.value)}
                placeholder="Ej: Spiricort, Metamizol..." autoFocus />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase">{t("med_dosage")}</label>
              <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                value={manualDosage} onChange={(e) => setManualDosage(e.target.value)}
                placeholder="Ej: 60 mg, 500 mcg..." />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase">{t("dose_per_block")}</label>
              <p className="text-[10px] text-slate-500 mt-0.5 mb-1">{t("dose_per_block_hint")}</p>
              <div className="grid grid-cols-4 gap-2 mt-1">
                {["morning","midday","afternoon","night"].map((block) => (
                  <div key={block}>
                    <label className="block text-[10px] text-slate-500">{t(`block_${block}`)}</label>
                    <input type="text" placeholder="0"
                      value={manualDoses[block]}
                      onChange={(e) => setManualDoses({ ...manualDoses, [block]: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-2 py-2 text-sm"
                      inputMode="decimal" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("med_qty")}</label>
                <input type="number" min="0" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                  value={manualQty} onChange={(e) => setManualQty(e.target.value)}
                  placeholder="30" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("med_expiry")}</label>
                <input type="date" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                  value={manualExpiry} onChange={(e) => setManualExpiry(e.target.value)} />
              </div>
            </div>
            {manualMessage && (
              <p className={`text-xs font-medium ${manualMessage === t("manual_saved") ? "text-emerald-600" : "text-red-500"}`}>
                {manualMessage}
              </p>
            )}
            <div className="flex gap-2 pt-1">
              <button onClick={submitManualMed} disabled={manualSaving || !manualName.trim()}
                className="flex-1 bg-emerald-500 text-white text-xs font-bold py-3 rounded-xl disabled:opacity-50 active:scale-[0.98] transition-transform">
                {manualSaving ? t("manual_saving") : t("manual_save")}
              </button>
              <button onClick={() => setShowManual(false)}
                className="flex-1 bg-[#111827] text-white text-xs font-bold py-3 rounded-xl active:scale-[0.98] transition-transform">{t("close")}</button>
            </div>
          </div>
        </Modal>
      )}

      {showEditModal && editMed && (
        <Modal onClose={() => setShowEditModal(false)} title={t("edit_title")}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase">{t("med_name")} *</label>
              <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase">{t("med_dosage")}</label>
              <input className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                value={editDosage} onChange={(e) => setEditDosage(e.target.value)} placeholder="60 mg" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase">{t("dose_qty")}</label>
              <div className="flex gap-2 mt-1">
                {["1/2", "1", "2", "3", "4"].map((v) => (
                  <button key={v} type="button" onClick={() => setEditFreq(v)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${editFreq === v ? "bg-blue-500 text-white shadow-md scale-105" : "bg-slate-100 text-slate-600"}`}>
                    {v}
                  </button>
                ))}
              </div>
              <input className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm mt-2"
                value={editFreq} onChange={(e) => setEditFreq(e.target.value)}
                placeholder="Ej: 1, 1/2, 2..." />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("med_qty")}</label>
                <input type="number" min="0" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                  value={editStock} onChange={(e) => setEditStock(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">{t("expiry_label")}</label>
                <input type="date" className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm mt-1"
                  value={editExpiry} onChange={(e) => setEditExpiry(e.target.value)} />
              </div>
            </div>
            {editMessage && (
              <p className={`text-xs font-medium ${editMessage === t("edit_saved") ? "text-emerald-600" : "text-red-500"}`}>
                {editMessage}
              </p>
            )}
            <div className="flex gap-2 pt-1">
              <button onClick={submitEditMed} disabled={editSaving || !editName.trim()}
                className="flex-1 bg-amber-400 text-slate-900 text-xs font-bold py-3 rounded-xl disabled:opacity-50 active:scale-[0.98] transition-transform">
                {editSaving ? t("edit_saving") : t("edit_save")}
              </button>
              <button onClick={() => setShowEditModal(false)}
                className="flex-1 bg-[#111827] text-white text-xs font-bold py-3 rounded-xl active:scale-[0.98] transition-transform">{t("close")}</button>
            </div>
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

      {showStockReport && (
        <Modal onClose={() => { setShowStockReport(false); setStockReportData(null); setReportMessage(""); }} title={t("stock_report")}>
          <p className="text-xs text-slate-500 mb-3">{t("stock_report_sub")}</p>
          {stockReportLoading ? (
            <p className="text-sm text-slate-500 py-4">Cargando...</p>
          ) : stockReportData ? (
            <>
              <div className="flex gap-2 mb-3">
                <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-emerald-700">{stockReportData.summary?.ok ?? 0}</div>
                  <div className="text-[10px] text-emerald-600">OK</div>
                </div>
                <div className="flex-1 bg-amber-50 border border-amber-200 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-amber-700">{stockReportData.summary?.bajo ?? 0}</div>
                  <div className="text-[10px] text-amber-600">Bajo</div>
                </div>
                <div className="flex-1 bg-red-50 border border-red-200 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-red-700">{stockReportData.summary?.faltante ?? 0}</div>
                  <div className="text-[10px] text-red-600">Faltante</div>
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-xl mb-3">
                {stockReportData.items?.length ? stockReportData.items.map((m) => (
                  <div key={m.id} className="flex justify-between items-center py-2 px-3 border-b border-slate-100 last:border-0 text-sm">
                    <span className="font-medium text-slate-800">{m.name}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${m.status === "faltante" ? "bg-red-100 text-red-700" : m.status === "bajo" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                      {m.current_stock} {m.status === "faltante" ? "⚠" : m.status === "bajo" ? "↓" : "✓"}
                    </span>
                  </div>
                )) : <p className="p-3 text-sm text-slate-500">No hay medicamentos.</p>}
              </div>
              <div className="flex gap-2">
                <a href={`/api/stock-report/pdf?user_id=${user?.id}`} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-slate-100 text-slate-700 text-xs font-bold py-3 rounded-xl text-center">
                  {t("download_pdf")}
                </a>
                <button onClick={sendStockReportEmail} disabled={reportSending}
                  className="flex-1 bg-teal-500 text-white text-xs font-bold py-3 rounded-xl disabled:opacity-50">
                  {reportSending ? t("sending") : t("send_report_email")}
                </button>
              </div>
              {reportMessage && (
                <p className={`text-xs mt-2 font-medium ${reportMessage === t("report_sent") ? "text-emerald-600" : "text-red-500"}`}>
                  {reportMessage}
                </p>
              )}
            </>
          ) : reportMessage ? (
            <p className="text-sm text-red-500 py-2">{reportMessage}</p>
          ) : null}
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

function MedCard({ med, t, onToggle, onDose, onEdit, dayCompleted }) {
  const freq = med.frecuencia && med.frecuencia !== "1" ? med.frecuencia : "1";
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm transition-all ${med.completado ? "border-2 border-emerald-400 bg-emerald-50/50" : "border border-slate-100"}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-none ${med.completado ? "bg-emerald-500 text-white" : "bg-slate-100"}`}>
          {med.completado ? "✓" : "💊"}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${med.completado ? "text-emerald-700" : "text-slate-800"}`}>{med.nombre}</p>
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <span className="inline-flex items-center bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-lg">{freq} {t("dose_unit")}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">{med.hora?.substring(0,5)}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">{med.dosis || ""}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500">{t("stock")} {med.stock}</span>
          </div>
          {med.caducidad && <p className="text-[10px] text-slate-400 mt-0.5">{t("expiry_label")}: {new Date(med.caducidad).toLocaleDateString()}</p>}
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
        <button onClick={() => onEdit(med)}
          className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium py-2.5 px-3 rounded-xl active:scale-95 transition-transform">✏️ {t("edit_med")}</button>
        {!med.completado && (
          <button onClick={() => onDose(med)}
            className="bg-slate-100 text-slate-600 text-xs font-medium py-2.5 px-3 rounded-xl active:scale-95 transition-transform">{t("update_dose")}</button>
        )}
      </div>
    </div>
  );
}
