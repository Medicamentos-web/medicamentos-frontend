import "./globals.css";

export const metadata = {
  title: "Gestión de Medicamentos Multifamiliar",
  description: "Dashboard familiar de tomas, inventario y estado diario.",
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
      </head>
      <body className="min-h-dvh bg-slate-50">
        {children}
      </body>
    </html>
  );
}
