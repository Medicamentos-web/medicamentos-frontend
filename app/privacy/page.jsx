export const metadata = {
  title: "Datenschutz | MediControl",
  description: "Informationen zur Verarbeitung personenbezogener Daten bei MediControl.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Datenschutzerklärung</h1>
        <p className="mt-3 text-sm text-slate-600">
          Diese Seite beschreibt, wie MediControl personenbezogene Daten verarbeitet.
        </p>

        <section className="mt-6 space-y-3 text-sm text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">1. Verantwortlicher</h2>
          <p>MediControl (Schweiz).</p>

          <h2 className="text-lg font-bold text-slate-900">2. Verarbeitete Daten</h2>
          <p>
            Kontodaten (Name, E-Mail), Nutzungsdaten der Anwendung, technische Logs sowie optionale
            Marketing-/Analyseereignisse nur nach Einwilligung.
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Zweck der Verarbeitung</h2>
          <p>
            Bereitstellung der Plattform, Sicherheit/Authentifizierung, Support sowie optionale
            Erfolgsmessung von Kampagnen (Google Ads).
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Rechtsgrundlagen</h2>
          <p>
            Vertragserfüllung für notwendige Funktionen, berechtigtes Interesse für Sicherheit und
            ausdrückliche Einwilligung für Marketing-/Tracking-Cookies.
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Speicherdauer</h2>
          <p>Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist.</p>

          <h2 className="text-lg font-bold text-slate-900">6. Betroffenenrechte</h2>
          <p>
            Sie können Auskunft, Berichtigung, Löschung, Einschränkung oder Datenübertragbarkeit
            beantragen und erteilte Einwilligungen widerrufen.
          </p>
        </section>
      </div>
    </main>
  );
}
