import "./globals.css";

export const metadata = {
  title: "MediControl — Ihre Medikamente. Unter Kontrolle.",
  description: "Intelligentes Medikamentenmanagement für Patienten und Familien. Erinnerungen, Bestandskontrolle, Rezeptscanning.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0c0e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="author" content="MediControl Switzerland" />
        <meta name="copyright" content={`© ${new Date().getFullYear()} MediControl. All rights reserved. Swiss law applies.`} />
      </head>
      <body className="min-h-dvh bg-slate-50">
        {children}
      </body>
    </html>
  );
}
