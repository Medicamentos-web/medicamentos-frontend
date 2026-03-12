#!/usr/bin/env node
/**
 * Verifica que la configuración de Capacitor esté correcta
 * y que la URL de la app sea accesible.
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const APP_URL = "https://medicamentos-frontend.vercel.app";

console.log("🔍 Verificando configuración Capacitor...\n");

// 1. Verificar capacitor.config
const configPath = path.join(__dirname, "capacitor.config.ts");
if (fs.existsSync(configPath)) {
  console.log("✅ capacitor.config.ts existe");
  const config = fs.readFileSync(configPath, "utf8");
  if (config.includes(APP_URL)) {
    console.log("✅ URL de producción configurada:", APP_URL);
  } else {
    console.log("⚠️  Revisa la URL en capacitor.config.ts");
  }
} else {
  console.log("❌ capacitor.config.ts no encontrado");
}

// 2. Verificar carpetas nativas
const iosPath = path.join(__dirname, "ios", "App");
const androidPath = path.join(__dirname, "android", "app");
if (fs.existsSync(iosPath)) {
  console.log("✅ Proyecto iOS existe (ios/App)");
} else {
  console.log("❌ Carpeta ios/App no encontrada");
}
if (fs.existsSync(androidPath)) {
  console.log("✅ Proyecto Android existe (android/app)");
} else {
  console.log("❌ Carpeta android/app no encontrada");
}

// 3. Verificar que la URL responde
console.log("\n🌐 Comprobando que la app está accesible...");
https
  .get(APP_URL, (res) => {
    if (res.statusCode === 200) {
      console.log("✅ La app responde correctamente (HTTP 200)");
    } else {
      console.log("⚠️  La app respondió con HTTP", res.statusCode);
    }
    console.log("\n📱 Para probar:");
    console.log("   • iOS (necesitas Mac): npm run cap:open:ios");
    console.log("   • Android: instala Android Studio, luego npm run cap:open:android");
  })
  .on("error", (err) => {
    console.log("❌ No se pudo conectar a", APP_URL, "-", err.message);
  });
