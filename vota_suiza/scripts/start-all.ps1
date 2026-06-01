# start-all.ps1 — Arranca el MVP de VotaSuiza en un comando
# Uso: powershell -ExecutionPolicy Bypass -File scripts/start-all.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "===========================================" -ForegroundColor Red
Write-Host "  VotaSuiza - Arranque del MVP" -ForegroundColor Red
Write-Host "===========================================" -ForegroundColor Red
Write-Host ""

# --- 1. Comprobar .env.local ---
$envFile = Join-Path $root "web\.env.local"
$envExample = Join-Path $root "web\.env.example"

if (-not (Test-Path $envFile)) {
    Write-Host "[!] web\.env.local no existe. Creando desde .env.example..." -ForegroundColor Yellow
    Copy-Item $envExample $envFile
    Write-Host ""
    Write-Host "    EDITA $envFile con tus claves antes de continuar:" -ForegroundColor Cyan
    Write-Host "      - GEMINI_API_KEY       (https://aistudio.google.com/apikey)"
    Write-Host "      - ELEVENLABS_API_KEY   (https://elevenlabs.io)"
    Write-Host "      - NEXT_PUBLIC_FIREBASE_* (https://console.firebase.google.com)"
    Write-Host ""
    Write-Host "    Cuando termines, vuelve a ejecutar este script." -ForegroundColor Yellow
    exit 0
}

# --- 2. Verificar claves minimas ---
$envContent = Get-Content $envFile -Raw
$missing = @()

if ($envContent -notmatch 'GEMINI_API_KEY=\S+') {
    $missing += "GEMINI_API_KEY"
}
if ($envContent -notmatch 'NEXT_PUBLIC_FIREBASE_API_KEY=\S+') {
    $missing += "NEXT_PUBLIC_FIREBASE_API_KEY (la app web puede arrancar pero los votos/logros no funcionaran)"
}

if ($missing.Count -gt 0) {
    Write-Host "[!] Variables de entorno vacias o sin valor:" -ForegroundColor Yellow
    $missing | ForEach-Object { Write-Host "      - $_" -ForegroundColor Yellow }
    Write-Host ""
    $continuar = Read-Host "Continuar igualmente? (s/N)"
    if ($continuar -ne "s") { exit 0 }
}

# --- 3. Instalar dependencias si falta node_modules ---
$nodeModules = Join-Path $root "web\node_modules"
if (-not (Test-Path $nodeModules)) {
    Write-Host "[+] Instalando dependencias web (esto tarda ~3 minutos)..." -ForegroundColor Cyan
    Push-Location (Join-Path $root "web")
    npm install
    Pop-Location
} else {
    Write-Host "[OK] node_modules ya existe" -ForegroundColor Green
}

# --- 4. Lanzar dev server ---
Write-Host ""
Write-Host "[+] Lanzando Next.js dev server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "    URL: http://localhost:3001" -ForegroundColor Green
Write-Host "    Ctrl+C para detener" -ForegroundColor Gray
Write-Host ""

Push-Location (Join-Path $root "web")
try {
    npm run dev
} finally {
    Pop-Location
}
