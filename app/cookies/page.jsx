export const metadata = {
  title: "Cookie-Richtlinie | MediControl",
  description: "Informationen zu Cookies und Einwilligung bei MediControl.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-dvh bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Cookie-Richtlinie</h1>
        <p className="mt-3 text-sm text-slate-600">
          Diese Richtlinie erklärt, welche Cookies MediControl nutzt und wie Sie diese steuern.
        </p>

        <section className="mt-6 space-y-3 text-sm text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">1. Notwendige Cookies</h2>
          <p>
            Diese Cookies sind für Login, Sicherheit und Kernfunktionen der Anwendung erforderlich und
            können nicht deaktiviert werden.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Analyse-Cookies</h2>
          <p>
            Analyse-Cookies helfen uns, die Nutzung zu verstehen und die App zu verbessern. Sie werden
            nur nach Einwilligung aktiviert.
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Marketing-Cookies</h2>
          <p>
            Marketing-Cookies (z. B. Google Ads) dienen der Erfolgsmessung von Anzeigenkampagnen und
            werden nur nach Einwilligung geladen.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Einwilligung verwalten</h2>
          <p>
            Beim ersten Besuch können Sie \"Alle akzeptieren\", \"Nur notwendige\" wählen oder Ihre
            Einstellungen individuell konfigurieren.
          </p>
        </section>
      </div>
    </main>
  );
}
