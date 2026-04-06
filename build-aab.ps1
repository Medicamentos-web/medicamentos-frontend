# Script para generar el AAB de MediControl (Windows)
# Uso: .\build-aab.ps1

$ErrorActionPreference = "Stop"
$projectRoot = $PSScriptRoot

# Java de Android Studio (ajusta si está en otra ruta)
$javaPath = "C:\Program Files\Android\Android Studio\jbr"
if (-not (Test-Path $javaPath)) {
    $javaPath = "C:\Program Files\Android\Android Studio\jre"
}
if (-not (Test-Path $javaPath)) {
    Write-Host "ERROR: No se encontró Java de Android Studio. Instala Android Studio o configura JAVA_HOME manualmente." -ForegroundColor Red
    exit 1
}

$env:JAVA_HOME = $javaPath
Write-Host "Java: $env:JAVA_HOME" -ForegroundColor Cyan

# Build Next.js
Write-Host "`n[1/3] Building Next.js..." -ForegroundColor Yellow
Set-Location $projectRoot
npm run build | Out-Null

# Sync Capacitor
Write-Host "[2/3] Syncing Capacitor..." -ForegroundColor Yellow
npx cap sync android | Out-Null

# Generar AAB
Write-Host "[3/3] Generating AAB..." -ForegroundColor Yellow
Set-Location "$projectRoot\android"
.\gradlew.bat bundleRelease

$aabPath = "$projectRoot\android\app\build\outputs\bundle\release\app-release.aab"
if (Test-Path $aabPath) {
    # Marca de modificacion = hora local actual (Gradle a veces deja un timestamp que no coincide con el reloj del PC)
    $nowLocal = Get-Date
    (Get-Item -LiteralPath $aabPath).LastWriteTime = $nowLocal

    $size = (Get-Item $aabPath).Length / 1MB
    Write-Host "`nOK AAB generado: $aabPath" -ForegroundColor Green
    Write-Host "  Tamano MB: $([math]::Round($size, 2))" -ForegroundColor Gray
    Write-Host "  Fecha/hora local (Explorador): $($nowLocal.ToString('dd.MM.yyyy HH:mm:ss'))" -ForegroundColor Gray
    Write-Host "`nSiguiente paso: subir a Play Console (play.google.com/console)" -ForegroundColor Cyan
} else {
    Write-Host "`nERROR: No se encontró el AAB. Revisa los logs." -ForegroundColor Red
    exit 1
}
