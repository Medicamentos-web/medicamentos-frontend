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

# Generar AAB (solo modulo :app — clean fuerza nuevo archivo; sin esto Gradle puede dejar UP-TO-DATE y la hora no cambia)
Write-Host "[3/3] Generating AAB (clean + :app:bundleRelease)..." -ForegroundColor Yellow
Set-Location "$projectRoot\android"
.\gradlew.bat :app:clean :app:bundleRelease --no-configuration-cache

$aabPath = "$projectRoot\android\app\build\outputs\bundle\release\app-release.aab"
if (Test-Path $aabPath) {
    $nowLocal = Get-Date
    # API .NET: mas fiable que solo la propiedad PowerShell en algunos discos/Explorador
    [System.IO.File]::SetLastWriteTime($aabPath, $nowLocal)
    try {
        [System.IO.File]::SetCreationTime($aabPath, $nowLocal)
    } catch {
        # CreationTime a veces no se puede cambiar; no es critico
    }

    # Copia con fecha/hora en el nombre (nuevo archivo = Explorador muestra hora clara; mismo contenido que app-release.aab)
    $verLine = Select-String -Path "$projectRoot\android\app\build.gradle" -Pattern "versionCode\s+(\d+)" | Select-Object -First 1
    $vCode = if ($verLine) { $verLine.Matches.Groups[1].Value } else { "0" }
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $outDir = Split-Path -Parent $aabPath
    $stampedPath = Join-Path $outDir "MediControl-v${vCode}-${stamp}.aab"
    Copy-Item -LiteralPath $aabPath -Destination $stampedPath -Force
    [System.IO.File]::SetLastWriteTime($stampedPath, $nowLocal)

    $size = (Get-Item $aabPath).Length / 1MB
    Write-Host "`nOK AAB generado: $aabPath" -ForegroundColor Green
    Write-Host "  Tamano MB: $([math]::Round($size, 2))" -ForegroundColor Gray
    Write-Host "  Fecha/hora aplicada al archivo: $($nowLocal.ToString('dd.MM.yyyy HH:mm:ss'))" -ForegroundColor Gray
    Write-Host "  Copia con hora en el nombre (recomendada para subir a Play):" -ForegroundColor Gray
    Write-Host "    $stampedPath" -ForegroundColor White
    Write-Host "`nSi el Explorador sigue mostrando hora vieja: F5 o cerrar y abrir la carpeta." -ForegroundColor DarkYellow
    Write-Host "Siguiente paso: subir a Play Console (play.google.com/console)" -ForegroundColor Cyan
} else {
    Write-Host "`nERROR: No se encontró el AAB. Revisa los logs." -ForegroundColor Red
    exit 1
}
