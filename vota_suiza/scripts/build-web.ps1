# build-web.ps1 — Construye y verifica la web
$ErrorActionPreference = "Continue"
$webRoot = Join-Path (Split-Path -Parent $PSScriptRoot) "web"

Write-Host "==> Verificando TypeScript..." -ForegroundColor Cyan
Push-Location $webRoot
try {
    npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[X] Errores de TypeScript encontrados" -ForegroundColor Red
    } else {
        Write-Host "[OK] TypeScript OK" -ForegroundColor Green
    }

    Write-Host ""
    Write-Host "==> Construyendo Next.js (production build)..." -ForegroundColor Cyan
    npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] Build correcta. Lanza con: npm start" -ForegroundColor Green
    } else {
        Write-Host "[X] Build fallida" -ForegroundColor Red
    }
} finally {
    Pop-Location
}
