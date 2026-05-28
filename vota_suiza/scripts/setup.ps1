# Setup VotaSuiza MVP
Write-Host "=== VotaSuiza Setup ===" -ForegroundColor Red

# Flutter .env
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "[OK] Creado .env (Flutter) - edita con tus claves" -ForegroundColor Green
} else {
    Write-Host "[--] .env ya existe" -ForegroundColor Yellow
}

# Web .env.local
if (-not (Test-Path "web\.env.local")) {
    Copy-Item "web\.env.example" "web\.env.local"
    Write-Host "[OK] Creado web\.env.local - edita con tus claves" -ForegroundColor Green
} else {
    Write-Host "[--] web\.env.local ya existe" -ForegroundColor Yellow
}

# Web npm install
if (Test-Path "web\package.json") {
    Write-Host "Instalando dependencias web..." -ForegroundColor Cyan
    Push-Location web
    npm install 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Dependencias web instaladas" -ForegroundColor Green
    } else {
        Write-Host "[!!] Error en npm install - ejecuta manualmente: cd web && npm install" -ForegroundColor Red
    }
    Pop-Location
}

Write-Host ""
Write-Host "Proximos pasos:" -ForegroundColor Cyan
Write-Host "  1. Edita .env y web\.env.local con tus claves API"
Write-Host "  2. Configura Firebase (ver README.md)"
Write-Host "  3. Web:  cd web && npm run dev  -> http://localhost:3001"
Write-Host "  4. Flutter: flutter create . && flutter pub get && flutter run"
