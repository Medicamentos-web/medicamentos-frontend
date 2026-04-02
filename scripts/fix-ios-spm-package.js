/**
 * Capacitor en Windows escribe rutas con \ en Package.swift; en Swift eso rompe el string (\n, etc.).
 * SPM en macOS (Codemagic) necesita rutas con /.
 */
const fs = require("fs");
const path = require("path");

const pkgPath = path.join(__dirname, "..", "ios", "App", "CapApp-SPM", "Package.swift");
if (!fs.existsSync(pkgPath)) {
  process.exit(0);
}

let s = fs.readFileSync(pkgPath, "utf8");
const replacement =
  '.package(name: "CapacitorSplashScreen", path: "../../../node_modules/@capacitor/splash-screen")';
const fixed = s.replace(
  /\.package\(name: "CapacitorSplashScreen", path: "[^"]+"\)/,
  replacement
);

if (s !== fixed) {
  fs.writeFileSync(pkgPath, fixed);
  console.log("fix-ios-spm-package: rutas corregidas en CapApp-SPM/Package.swift");
}
