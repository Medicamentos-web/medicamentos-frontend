import Link from "next/link";

export const metadata = {
  title: "Cookie-Richtlinie | MediControl",
  description:
    "Cookies, Einwilligung und Google Ads bei MediControl — Transparenz für Google Play und DSGVO.",
};

export default function CookiesPage() {
  return (
    <main className="min-h-dvh bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Cookie-Richtlinie</h1>
        <p className="mt-3 text-sm text-slate-600">
          Diese Richtlinie erklärt, welche Cookies und ähnliche Technologien MediControl nutzt und wie
          Sie diese steuern. Sie ergänzt die{" "}
          <Link href="/privacy" className="font-semibold text-emerald-700 underline">
            Datenschutzerklärung
          </Link>{" "}
          und entspricht den Anforderungen von Google Play zur Offenlegung von Werbe-/Mess-Tags.
        </p>

        <section className="mt-6 space-y-3 text-sm text-slate-700">
          <h2 className="text-lg font-bold text-slate-900">1. Notwendige Cookies</h2>
          <p>
            Diese Cookies (oder lokale Speicherung wie <code className="rounded bg-slate-100 px-1">localStorage</code>{" "}
            für Sitzung und Einwilligung) sind für Login, Sicherheit und Kernfunktionen der Anwendung
            erforderlich und können nicht deaktiviert werden.
          </p>

          <h2 className="text-lg font-bold text-slate-900">2. Analyse-Cookies</h2>
          <p>
            Analyse-Cookies helfen uns, die Nutzung zu verstehen und die App zu verbessern. Sie werden
            nur nach Einwilligung aktiviert.
          </p>

          <h2 className="text-lg font-bold text-slate-900">3. Marketing und Google Ads</h2>
          <p>
            Wenn Sie <strong>Marketing</strong> akzeptieren, kann ein Skript von Google geladen werden
            (z. B. Google Tag / Conversion-Messung, Kennung AW-17971521405). Dadurch können Google und
            verbundene Dienste Daten verarbeiten, um die Wirksamkeit von Anzeigen zu messen. Ohne Ihre
            Einwilligung wird dieses Skript nicht geladen.
          </p>

          <h2 className="text-lg font-bold text-slate-900">4. Einwilligung verwalten</h2>
          <p>
            Beim ersten Besuch können Sie „Alle akzeptieren“, „Nur notwendige“ wählen oder Ihre
            Einstellungen individuell konfigurieren. Ihre Auswahl wird lokal gespeichert.
          </p>

          <h2 className="text-lg font-bold text-slate-900">5. Browser-Einstellungen</h2>
          <p>
            Sie können Cookies auch in Ihrem Browser löschen oder blockieren; dadurch kann die
            Funktionalität der App eingeschränkt sein.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/privacy" className="text-emerald-600 underline">
            Datenschutz
          </Link>
          <span className="text-slate-300">·</span>
          <Link href="/terms" className="text-emerald-600 underline">
            Nutzungsbedingungen
          </Link>
        </div>
      </div>
    </main>
  );
}
