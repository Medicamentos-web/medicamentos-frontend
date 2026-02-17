"use client";

import React, { useState, useEffect, useRef } from "react";

const TOTAL_DURATION = 28000;

const SLIDES = [
  { id: "logo", start: 0, end: 3500 },
  { id: "problem", start: 3500, end: 7500 },
  { id: "demo", start: 7500, end: 16000 },
  { id: "features", start: 16000, end: 22000 },
  { id: "cta", start: 22000, end: 28000 },
];

export default function PromoPage() {
  const [time, setTime] = useState(-500);
  const [started, setStarted] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const start = () => {
    setStarted(true);
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startRef.current;
      setTime(elapsed);
      if (elapsed < TOTAL_DURATION + 1000) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const active = (id) => {
    const s = SLIDES.find((sl) => sl.id === id);
    return s && time >= s.start && time < s.end;
  };

  const progress = (id) => {
    const s = SLIDES.find((sl) => sl.id === id);
    if (!s) return 0;
    return Math.max(0, Math.min(1, (time - s.start) / (s.end - s.start)));
  };

  const vis = (id) => active(id) ? 1 : 0;
  const fadeClass = (id) => {
    const s = SLIDES.find((sl) => sl.id === id);
    if (!s) return "opacity-0";
    const fadeIn = time >= s.start && time < s.start + 600;
    const fadeOut = time >= s.end - 400 && time < s.end;
    if (fadeIn) return "opacity-0 animate-[fadeIn_0.6s_ease_forwards]";
    if (fadeOut) return "opacity-100 animate-[fadeOut_0.4s_ease_forwards]";
    if (active(id)) return "opacity-100";
    return "opacity-0 pointer-events-none absolute";
  };

  const demoProgress = progress("demo");
  const demoStep = demoProgress < 0.35 ? 0 : demoProgress < 0.65 ? 1 : 2;

  const featProgress = progress("features");
  const featStep = featProgress < 0.33 ? 0 : featProgress < 0.66 ? 1 : 2;

  if (!started) {
    return (
      <div className="fixed inset-0 bg-[#0a0c10] flex items-center justify-center z-50" onClick={start}>
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg shadow-emerald-500/30">M</div>
          <p className="text-white text-xl font-bold mb-2">MediControl Promo</p>
          <p className="text-slate-500 text-sm mb-8">28 Sekunden · Vollbild empfohlen</p>
          <button onClick={start}
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-lg shadow-emerald-500/25 hover:scale-105 transition-transform">
            ▶ Start
          </button>
          <p className="text-slate-600 text-xs mt-6">Tipp: F11 für Vollbild, dann Bildschirm aufnehmen</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#0a0c10] overflow-hidden" style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}>
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 z-50">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-100 ease-linear"
          style={{ width: `${Math.min(100, (time / TOTAL_DURATION) * 100)}%` }} />
      </div>

      {/* ═══ SLIDE 1: Logo ═══ */}
      {(time < 4100) && (
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${active("logo") ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center">
            <div className={`mx-auto mb-8 transition-all duration-1000 ${time > 300 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-[2rem] flex items-center justify-center text-white font-bold text-5xl sm:text-6xl mx-auto shadow-2xl shadow-emerald-500/30">
                M
              </div>
            </div>
            <h1 className={`text-4xl sm:text-6xl font-extrabold text-white tracking-tight transition-all duration-700 delay-500 ${time > 500 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              MediControl
            </h1>
            <p className={`mt-4 text-lg sm:text-2xl font-medium transition-all duration-700 delay-1000 ${time > 1000 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Ihre Medikamente. Unter Kontrolle.
              </span>
            </p>
            <div className={`mt-6 flex items-center justify-center gap-2 transition-all duration-500 delay-[1800ms] ${time > 1800 ? "opacity-100" : "opacity-0"}`}>
              <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">🇨🇭 Swiss Quality</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══ SLIDE 2: Problem ═══ */}
      {(time >= 3000 && time < 8000) && (
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${active("problem") ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center px-6 max-w-2xl">
            <div className={`text-6xl sm:text-8xl mb-6 transition-all duration-700 ${time > 4000 ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
              😰
            </div>
            <h2 className={`text-3xl sm:text-5xl font-extrabold text-white leading-tight transition-all duration-700 ${time > 4200 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              Vergessen Sie Ihre<br />
              <span className="text-red-400">Medikamente?</span>
            </h2>
            <p className={`mt-6 text-lg sm:text-xl text-slate-400 transition-all duration-700 delay-500 ${time > 5000 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              50% der Patienten nehmen ihre Medikamente nicht korrekt ein.
            </p>
            <div className={`mt-8 flex justify-center gap-4 transition-all duration-500 ${time > 5800 ? "opacity-100" : "opacity-0"}`}>
              {["❌ Dosis vergessen", "❌ Bestand leer", "❌ Keine Übersicht"].map((t, i) => (
                <span key={i} className="text-xs sm:text-sm text-red-300/80 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ SLIDE 3: Demo ═══ */}
      {(time >= 7000 && time < 16500) && (
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${active("demo") ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center">
            <p className={`text-sm font-bold text-emerald-400 mb-4 tracking-widest uppercase transition-all duration-500 ${time > 8000 ? "opacity-100" : "opacity-0"}`}>
              Die Lösung
            </p>

            {/* Phone mockup */}
            <div className="relative mx-auto" style={{ width: "min(320px, 80vw)" }}>
              <div className="bg-slate-800 rounded-[2.5rem] p-3 shadow-2xl shadow-black/50 border border-slate-700">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-900 rounded-full z-10" />
                <div className="bg-[#0f172a] rounded-[2rem] overflow-hidden pt-8">
                  {/* App header */}
                  <div className="bg-[#0f172a] px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-emerald-400 text-[11px] font-bold">MEDICONTROL</div>
                        <div className="text-slate-500 text-[9px]">Heute, 11. Feb. 2026</div>
                      </div>
                      <div className="text-[10px] text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">Ana López</div>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="bg-[#F2F4F8] p-3 space-y-2.5" style={{ minHeight: 340 }}>
                    {/* Med 1 */}
                    <div className={`bg-white rounded-xl p-3 shadow-sm transition-all duration-500 ${time > 8500 ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg shrink-0">💊</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-slate-800">Euthyrox 50mg</div>
                          <div className="text-[10px] text-slate-500">08:00 · 1 Tablette</div>
                        </div>
                        <div className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full transition-all duration-700 ${demoStep >= 0 ? "bg-emerald-100 text-emerald-700 scale-110" : "bg-slate-100 text-slate-400"}`}>
                          {demoStep >= 0 ? "✓" : "—"}
                        </div>
                      </div>
                    </div>

                    {/* Med 2 */}
                    <div className={`bg-white rounded-xl p-3 shadow-sm transition-all duration-500 delay-200 ${time > 9000 ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-lg shrink-0">💊</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-slate-800">Spiricort 20mg</div>
                          <div className="text-[10px] text-slate-500">12:00 · 2 Tabletten</div>
                        </div>
                        <div className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full transition-all duration-700 ${demoStep >= 1 ? "bg-emerald-100 text-emerald-700 scale-110" : "bg-amber-100 text-amber-600"}`}>
                          {demoStep >= 1 ? "✓" : "⏳"}
                        </div>
                      </div>
                    </div>

                    {/* Med 3 */}
                    <div className={`bg-white rounded-xl p-3 shadow-sm transition-all duration-500 delay-[400ms] ${time > 9500 ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-lg shrink-0">💊</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-bold text-slate-800">MetoZerok 50mg</div>
                          <div className="text-[10px] text-slate-500">20:00 · 1 Tablette</div>
                        </div>
                        <div className={`text-[10px] font-bold px-2.5 py-1.5 rounded-full transition-all duration-700 ${demoStep >= 2 ? "bg-emerald-100 text-emerald-700 scale-110" : "bg-slate-100 text-slate-400"}`}>
                          {demoStep >= 2 ? "✓" : "—"}
                        </div>
                      </div>
                    </div>

                    {/* Notification popup */}
                    <div className={`transition-all duration-500 ${demoStep === 1 ? "opacity-100 translate-y-0" : demoStep > 1 ? "opacity-0 -translate-y-4" : "opacity-0 translate-y-8"}`}>
                      <div className="bg-slate-900 rounded-xl p-3 shadow-lg border border-slate-700 flex items-center gap-3">
                        <div className="text-xl">🔔</div>
                        <div>
                          <div className="text-[11px] font-bold text-white">Erinnerung</div>
                          <div className="text-[10px] text-slate-400">Spiricort 20mg — jetzt einnehmen</div>
                        </div>
                      </div>
                    </div>

                    {/* All done */}
                    <div className={`text-center transition-all duration-700 ${demoStep >= 2 ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mt-1">
                        <div className="text-lg">🎉</div>
                        <div className="text-[11px] font-bold text-emerald-700">Alle Dosen bestätigt!</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ SLIDE 4: Features ═══ */}
      {(time >= 15500 && time < 22500) && (
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${active("features") ? "opacity-100" : "opacity-0"}`}>
          <div className="max-w-xl mx-auto px-6 text-center">
            <p className={`text-sm font-bold text-emerald-400 mb-6 tracking-widest uppercase transition-all duration-500 ${time > 16500 ? "opacity-100" : "opacity-0"}`}>
              Alles in einer App
            </p>

            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: "🔔", title: "Erinnerungen", text: "Push zur richtigen Zeit", delay: 0 },
                { icon: "📸", title: "Rezept-Scan", text: "OCR erkennt alles", delay: 300 },
                { icon: "📦", title: "Bestandskontrolle", text: "Nie mehr leer", delay: 600 },
              ].map((f, i) => (
                <div key={i}
                  className={`transition-all duration-700 ${time > 16800 + f.delay ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-3 transition-all duration-500 ${featStep >= i ? "bg-emerald-500/20 scale-110 shadow-lg shadow-emerald-500/10" : "bg-slate-800"}`}>
                    {f.icon}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white">{f.title}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 mt-1">{f.text}</div>
                </div>
              ))}
            </div>

            <div className={`mt-8 flex justify-center gap-3 flex-wrap transition-all duration-500 ${time > 19000 ? "opacity-100" : "opacity-0"}`}>
              {["👨‍👩‍👧‍👦 Familienverwaltung", "🩺 Arzt-Kontakt", "🔒 Schweizer Datenschutz"].map((f, i) => (
                <span key={i} className="text-[11px] sm:text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ SLIDE 5: CTA ═══ */}
      {(time >= 21500) && (
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${active("cta") ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center px-6">
            <div className={`transition-all duration-1000 ${time > 22500 ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-3xl flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-2xl shadow-emerald-500/30">
                M
              </div>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-extrabold text-white mb-4 transition-all duration-700 delay-300 ${time > 22800 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              Jetzt kostenlos testen
            </h2>
            <p className={`text-lg sm:text-xl text-slate-400 mb-8 transition-all duration-700 delay-500 ${time > 23300 ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              7 Tage gratis · Keine Kreditkarte nötig
            </p>

            <div className={`transition-all duration-700 delay-700 ${time > 23800 ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-10 py-4 rounded-2xl text-lg shadow-lg shadow-emerald-500/25">
                medicontrol.app
              </div>
            </div>

            <div className={`mt-8 flex items-center justify-center gap-3 transition-all duration-500 delay-1000 ${time > 24500 ? "opacity-100" : "opacity-0"}`}>
              <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">🇨🇭 Made in Switzerland</span>
              <span className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">🔒 DSGVO-konform</span>
            </div>

            <p className={`mt-6 text-[10px] text-slate-600 transition-all duration-500 ${time > 25500 ? "opacity-100" : "opacity-0"}`}>
              Verfügbar als Web-App, iOS und Android
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      `}</style>
    </div>
  );
}
