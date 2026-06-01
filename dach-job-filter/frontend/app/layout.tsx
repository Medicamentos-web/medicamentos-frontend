import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DACH Job Filter · Empleo Suiza, Alemania, Austria",
    template: "%s · DACH Job Filter",
  },
  description:
    "Filtra ofertas DACH y consulta un directorio profesional de portales de empleo en Suiza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${fontSans.variable} font-sans min-h-screen`}>
        <noscript>
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f6f8fa] px-6 text-center text-slate-800">
            <p className="max-w-md text-sm leading-relaxed">
              <strong className="block text-base text-slate-900">
                JavaScript desactivado
              </strong>
              <span className="mt-2 block">
                Activa JavaScript en el navegador para usar DACH Job Filter.
              </span>
            </p>
          </div>
        </noscript>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
