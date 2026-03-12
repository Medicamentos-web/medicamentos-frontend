import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.medicontrol.app",
  appName: "MediControl",
  webDir: "capacitor-public",
  server: {
    // Carga la app desde la URL de producción (evita rebuild para cada cambio)
    url: "https://medicamentos-frontend.vercel.app",
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
    },
  },
  ios: {
    contentInset: "automatic",
  },
};

export default config;
