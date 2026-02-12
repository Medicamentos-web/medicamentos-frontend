"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getMedicinesByDate } from "../services/medService";
import { updateMedStock } from "../services/stockService";
import { getAlerts } from "../services/alertService";
import LoginUI from "../components/LoginUI";

// URLs relativas: Next.js reescribe /api/*, /auth/* al backend (ver next.config.mjs)

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("userSession");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [meds, setMeds] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [lastCheckout, setLastCheckout] = useState("");
  const [lastBeepAt, setLastBeepAt] = useState(0);
  const [lastNotifyAt, setLastNotifyAt] = useState(0);
  const dateInputRef = useRef(null);

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    try {
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        Notification.requestPermission().catch(() => {});
      }
    } catch {
      // Notificaciones no soportadas en este navegador
    }
  }, []);

  useEffect(() => {
    if (!user || typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }
    // No registrar SW/push en túneles o contextos inseguros (evita DOMException)
    if (typeof window !== "undefined" && window.location.hostname !== "localhost" && !window.location.hostname.startsWith("192.168.")) {
      return;
    }
    let active = true;
    navigator.serviceWorker
      .register("/sw.js")
      .then(async () => {
        const res = await fetch(`/api/push/vapid`);
        const data = await res.json();
        if (!data.publicKey) return;
        const sub = await navigator.serviceWorker.ready.then((reg) =>
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(data.publicKey),
          })
        );
        if (!active) return;
        await fetch(`/api/push/subscribe`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(sub),
        });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [user]);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [data, alertData] = await Promise.all([
        getMedicinesByDate(user.id, selectedDate, user.family_id),
        getAlerts(user.family_id),
      ]);

      if (!data || !Array.isArray(data)) {
        setMeds({});
        return;
      }

      const rawMeds = data.map((m) => ({
        ...m,
        completado: m.estado === "tomado",
      }));

      const parseHora = (h) => {
        if (!h) return 0;
        return parseInt(h.split(":")[0], 10);
      };

      const groups = {
        "Mañana (05:00-11:59)": { icon: "🌅", color: "text-orange-400", data: [] },
        "Mediodía (12:00-15:59)": { icon: "☀️", color: "text-yellow-500", data: [] },
        "Tarde (16:00-19:59)": { icon: "🌇", color: "text-blue-400", data: [] },
        "Noche (20:00-04:59)": { icon: "🌙", color: "text-indigo-400", data: [] },
      };

      rawMeds
        .sort((a, b) => parseHora(a.hora) - parseHora(b.hora))
        .forEach((med) => {
          const hour = parseHora(med.hora);
          if (hour >= 5 && hour < 12) {
            groups["Mañana (05:00-11:59)"].data.push(med);
          } else if (hour >= 12 && hour < 16) {
            groups["Mediodía (12:00-15:59)"].data.push(med);
          } else if (hour >= 16 && hour < 20) {
            groups["Tarde (16:00-19:59)"].data.push(med);
          } else {
            groups["Noche (20:00-04:59)"].data.push(med);
          }
        });

      setMeds(groups);
      setAlerts(alertData || []);
    } catch (e) {
      console.error("🚨 Error de conexión con el Backend:", e);
      setMeds({});
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  }, [user, selectedDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const { pendingCount, overdueCount, nextDueLabel, dayCompleted } = useMemo(() => {
    const items = Object.values(meds).flatMap((group) => group.data);
    if (!items.length) {
      return { pendingCount: 0, overdueCount: 0, nextDueLabel: "", dayCompleted: false };
    }
    const now = new Date();
    const todayStr = selectedDate.toISOString().slice(0, 10);
    const isToday = todayStr === new Date().toISOString().slice(0, 10);
    let pending = 0;
    let overdue = 0;
    let nextDue = null;

    for (const med of items) {
      if (med.completado) continue;
      pending += 1;
      if (isToday && med.hora) {
        const [hh, mm] = med.hora.split(":").map(Number);
        const due = new Date(now);
        due.setHours(hh, mm, 0, 0);
        if (due <= now) {
          overdue += 1;
        } else if (!nextDue || due < nextDue) {
          nextDue = due;
        }
      }
    }

    return {
      pendingCount: pending,
      overdueCount: overdue,
      nextDueLabel: nextDue
        ? nextDue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "",
      dayCompleted: pending === 0,
    };
  }, [meds, selectedDate]);

  const carouselRef = useRef(null);
  const DAYS_BACK = 30;
  const DAYS_FORWARD = 30;

  const daysArray = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = -DAYS_BACK; i <= DAYS_FORWARD; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      d.setHours(0, 0, 0, 0);
      const isSelected = d.toDateString() === selectedDate.toDateString();
      const isToday = d.toDateString() === today.toDateString();
      const isPast = d < today;
      let style = "bg-white/5 border border-white/10 text-slate-500";
      if (isSelected && dayCompleted)
        style =
          "bg-red-500 text-white scale-110 z-10 shadow-[0_10px_20px_rgba(239,68,68,0.35)] border-white/40";
      else if (isSelected)
        style =
          "bg-[#007AFF] text-white scale-110 z-10 shadow-[0_10px_20px_rgba(0,122,255,0.3)] border-white/40";
      else if (isToday) style = "bg-emerald-500/30 text-white border border-emerald-400/40";
      else if (isPast) style = "bg-[#10B981] text-white opacity-60";
      days.push({ date: d, style, isSelected });
    }
    return days;
  }, [selectedDate, dayCompleted]);

  // Auto-scroll al día seleccionado
  useEffect(() => {
    if (!carouselRef.current) return;
    const idx = daysArray.findIndex((d) => d.isSelected);
    if (idx < 0) return;
    const el = carouselRef.current;
    const btnWidth = 64; // w-14 (56px) + gap (8px)
    const scrollTo = idx * btnWidth - el.clientWidth / 2 + btnWidth / 2;
    el.scrollTo({ left: scrollTo, behavior: "smooth" });
  }, [selectedDate, daysArray]);

  const handleToggleMed = async (medId, currentStatus) => {
    if (dayCompleted) return;
    const newStatus = currentStatus ? "pendiente" : "tomado";
    const success = await updateMedStock(
      medId,
      newStatus,
      user.family_id,
      selectedDate.toISOString().slice(0, 10)
    );
    if (success) loadData();
  };

  const playBeep = useCallback(() => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.05;
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch {
      // Ignorar si el navegador bloquea audio
    }
  }, []);

  useEffect(() => {
    if (!user || pendingCount === 0) return;
    const now = Date.now();
    if (now - lastBeepAt > 5 * 60 * 1000) {
      playBeep();
      setLastBeepAt(now);
    }
    if (
      typeof Notification !== "undefined" &&
      Notification.permission === "granted" &&
      now - lastNotifyAt > 10 * 60 * 1000
    ) {
      new Notification("Tomas pendientes", {
        body: `Tienes ${pendingCount} medicamento(s) pendientes.`,
      });
      setLastNotifyAt(now);
    }
  }, [pendingCount, user, lastBeepAt, lastNotifyAt, playBeep]);

  useEffect(() => {
    if (!user) return;
    const allCompleted = Object.values(meds).every((group) =>
      group.data.every((m) => m.completado)
    );
    const day = selectedDate.toISOString().slice(0, 10);
    if (!allCompleted || !meds || lastCheckout === day) return;

    fetch(`/api/daily-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        user_id: user.id,
        family_id: user.family_id,
        date: day,
      }),
    })
      .then(() => setLastCheckout(day))
      .catch(() => {});
  }, [meds, selectedDate, user, lastCheckout]);

  if (!mounted) {
    return (
      <div className="min-h-dvh bg-[#0a0c0e] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-6 shadow-2xl text-center text-sm text-slate-500">
          Cargando...
        </div>
      </div>
    );
  }

  if (!user) return <LoginUI setUser={setUser} />;

  return (
    <div className="min-h-screen bg-[#F4F7FA] font-sans text-slate-900 pb-32 overflow-x-hidden">
      <header className="bg-[#0a0c0e] text-white pt-6 pb-36 px-6 rounded-b-[3.5rem] relative shadow-2xl border-b border-emerald-500/20">
        <div className="max-w-md mx-auto flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-xs font-black italic text-[#10B981] uppercase tracking-[0.2em]">
              ElderCare_V39
            </h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              User: {user.nombre} • {loading ? "Sincronizando..." : "Online"}
            </span>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("userSession");
              setUser(null);
            }}
            className="text-xs font-black uppercase text-red-400 bg-red-400/10 px-4 py-2 rounded-xl border border-red-400/20 hover:bg-red-400 transition-all"
          >
            Cerrar ✕
          </button>
        </div>

        <div className="max-w-md mx-auto mb-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/70">
          Modo fácil · Botones grandes
        </div>

        {pendingCount > 0 ? (
          <div className="max-w-md mx-auto mb-4 rounded-3xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-200 animate-pulse">
            🔔 Tienes {pendingCount} pendientes{" "}
            {overdueCount > 0 ? `(${overdueCount} atrasadas)` : ""}{" "}
            {nextDueLabel ? `· Próxima: ${nextDueLabel}` : ""}
          </div>
        ) : dayCompleted ? (
          <div className="max-w-md mx-auto mb-4 rounded-3xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-emerald-200">
            ✅ Día completado · Lectura protegida
          </div>
        ) : null}

        <div className="max-w-md mx-auto text-center">
          <h2 className="text-6xl font-light tracking-tighter mb-4 text-white/90">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </h2>

          <div
            onClick={() => dateInputRef.current?.showPicker?.()}
            className="inline-flex items-center gap-3 px-6 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 cursor-pointer"
          >
            <span className="text-base">📅</span>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest italic">
              {selectedDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
            <input
              type="date"
              ref={dateInputRef}
              className="absolute opacity-0 pointer-events-none"
              onChange={(e) =>
                setSelectedDate(new Date(`${e.target.value}T00:00:00`))
              }
            />
          </div>
        </div>

        <div className="absolute -bottom-10 left-0 right-0 px-4">
          <div
            ref={carouselRef}
            className="max-w-md mx-auto bg-slate-900/80 backdrop-blur-2xl p-3 rounded-[2.5rem] border border-white/10 flex gap-2 overflow-x-auto scrollbar-hide"
          >
            {daysArray.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(new Date(item.date))}
                className={`flex-none w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${item.style}`}
              >
                <span className="text-[7px] font-black uppercase opacity-60 mb-0.5">
                  {item.date.toLocaleDateString("es-ES", { weekday: "short" })}
                </span>
                <span className="text-xl font-black italic">
                  {item.date.getDate()}
                </span>
                {item.date.getDate() === 1 && (
                  <span className="text-[6px] font-bold uppercase opacity-40">
                    {item.date.toLocaleDateString("es-ES", { month: "short" })}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 mt-20 space-y-10">
        {Object.values(meds).some((group) => group.data.length > 0) ? (
          Object.entries(meds).map(([bloque, info]) =>
            info.data.length > 0 ? (
              <section
                key={bloque}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <div className="flex items-center gap-3 mb-5 px-2">
                  <span className="text-xl">{info.icon}</span>
                  <h3
                    className={`text-[10px] font-black uppercase tracking-[0.3em] italic ${info.color}`}
                  >
                    {bloque}
                  </h3>
                  <span className="text-xs font-black uppercase text-slate-400">
                    {info.data.length} tomas
                  </span>
                  <div className="h-[1px] flex-1 bg-slate-200/50"></div>
                </div>
                <div className="space-y-5">
                  {info.data.map((m) => (
                    <div
                      key={m.id}
                      className={`w-full p-6 bg-white rounded-[2.5rem] shadow-xl border-2 transition-all ${
                        m.completado
                          ? "border-emerald-500/50 bg-emerald-50/30"
                          : "border-white"
                      } ${dayCompleted ? "opacity-70" : ""}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                            m.completado
                              ? "bg-emerald-500 text-white shadow-lg"
                              : "bg-slate-100 text-slate-300"
                          }`}
                        >
                          {m.completado ? "✓" : "💊"}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`text-lg font-black uppercase italic leading-none tracking-tighter ${
                              m.completado
                                ? "text-emerald-700"
                                : "text-slate-800"
                            }`}
                          >
                            {m.nombre}
                          </p>
                          <p className="text-xs font-bold text-slate-500 uppercase mt-2 tracking-tight">
                            Hora: {m.hora.substring(0, 5)} · Stock: {m.stock}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={dayCompleted}
                        onClick={() => handleToggleMed(m.id, m.completado)}
                        className={`mt-4 w-full rounded-2xl py-3 text-sm font-black uppercase tracking-widest ${
                          m.completado
                            ? "bg-emerald-500 text-white"
                            : "bg-[#007AFF] text-white"
                        } ${dayCompleted ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        {m.completado ? "Tomado ✅" : "Confirmar toma"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            ) : null
          )
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="text-5xl mb-4 grayscale opacity-20">🏥</div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] italic">
              No hay registros hoy
            </p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-6 left-0 right-0 px-6 z-50">
        <div className="max-w-md mx-auto flex justify-around items-center bg-slate-900/90 backdrop-blur-xl py-5 rounded-[2.5rem] shadow-2xl border border-white/10">
          <button
            onClick={() => (window.location.href = "tel:112")}
            className="w-14 h-14 bg-red-500 rounded-2xl shadow-lg flex items-center justify-center text-white text-2xl active:scale-90 transition-transform"
          >
            📞
          </button>
          <button className="w-14 h-14 bg-emerald-500 rounded-2xl shadow-lg flex items-center justify-center text-white text-2xl">
            📊
          </button>
          <button className="w-14 h-14 bg-white/10 rounded-2xl shadow-lg flex items-center justify-center text-white text-2xl">
            ⚙️
          </button>
        </div>
      </nav>
    </div>
  );
}
