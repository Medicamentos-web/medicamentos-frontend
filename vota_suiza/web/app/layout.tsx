import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { SettingsProvider } from "@/components/SettingsProvider";

export const metadata: Metadata = {
  title: "VotaSuiza — Política suiza interactiva",
  description: "Dialoga con partidos políticos suizos, simula votaciones y consulta estadísticas anónimas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SettingsProvider>
          <NavBar />
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
