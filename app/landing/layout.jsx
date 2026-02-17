export const metadata = {
  title: "MediControl — Ihre Medikamente. Unter Kontrolle.",
  description: "Die intelligente App für Medikamentenmanagement. Erinnerungen, Bestandskontrolle und Rezeptscanning — entwickelt in der Schweiz.",
  keywords: "Medikamente, App, Erinnerung, Schweiz, medication, reminder, medicamentos, recordatorio",
  openGraph: {
    title: "MediControl — Ihre Medikamente. Unter Kontrolle.",
    description: "Intelligentes Medikamentenmanagement für Patienten und Familien in der Schweiz. Kostenlose 7-Tage-Testversion.",
    type: "website",
    locale: "de_CH",
    alternateLocale: ["es_ES", "en_US"],
    siteName: "MediControl",
  },
  twitter: {
    card: "summary_large_image",
    title: "MediControl — Ihre Medikamente. Unter Kontrolle.",
    description: "Intelligentes Medikamentenmanagement. Kostenlose Testversion.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingLayout({ children }) {
  return children;
}
