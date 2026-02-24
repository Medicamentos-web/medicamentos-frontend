"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Script from "next/script";

const CONSENT_KEY = "cookie_consent_v1";

function readStoredConsent() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      necessary: true,
      analytics: Boolean(parsed?.analytics),
      marketing: Boolean(parsed?.marketing),
    };
  } catch {
    return null;
  }
}

function persistConsent(consent) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      necessary: true,
      analytics: Boolean(consent.analytics),
      marketing: Boolean(consent.marketing),
      ts: new Date().toISOString(),
    })
  );
}

export default function CookieConsentManager() {
  const [ready, setReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
    setReady(true);
  }, []);

  const adsEnabled = useMemo(() => ready && consent.marketing, [ready, consent.marketing]);

  const acceptAll = () => {
    const nextConsent = { necessary: true, analytics: true, marketing: true };
    setConsent(nextConsent);
    persistConsent(nextConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptNecessaryOnly = () => {
    const nextConsent = { necessary: true, analytics: false, marketing: false };
    setConsent(nextConsent);
    persistConsent(nextConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const saveSettings = () => {
    persistConsent(consent);
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {adsEnabled && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=AW-17971521405"
            strategy="afterInteractive"
          />
          <Script id="google-ads-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17971521405');
            `}
          </Script>
        </>
      )}

      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white/95 backdrop-blur p-4 shadow-2xl">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm font-semibold text-slate-900">Cookies & Datenschutz</p>
            <p className="mt-1 text-xs text-slate-600">
              Wir verwenden notwendige Cookies für Login/Sicherheit und optionale Cookies für Statistik
              und Werbung (Google Ads).{" "}
              <Link href="/privacy" className="font-semibold text-emerald-700 hover:underline">
                Datenschutz
              </Link>{" "}
              ·{" "}
              <Link href="/cookies" className="font-semibold text-emerald-700 hover:underline">
                Cookie-Richtlinie
              </Link>
            </p>

            {showSettings && (
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <label className="flex items-center justify-between py-1 text-sm">
                  <span className="text-slate-700">Notwendige Cookies</span>
                  <span className="text-xs font-bold text-emerald-700">Immer aktiv</span>
                </label>
                <label className="flex items-center justify-between py-1 text-sm">
                  <span className="text-slate-700">Analyse</span>
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent((p) => ({ ...p, analytics: e.target.checked }))}
                  />
                </label>
                <label className="flex items-center justify-between py-1 text-sm">
                  <span className="text-slate-700">Marketing (Google Ads)</span>
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent((p) => ({ ...p, marketing: e.target.checked }))}
                  />
                </label>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={acceptAll}
                className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={acceptNecessaryOnly}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => (showSettings ? saveSettings() : setShowSettings(true))}
                className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"
              >
                {showSettings ? "Einstellungen speichern" : "Konfigurieren"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
