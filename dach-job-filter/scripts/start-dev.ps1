# Arranque en dos ventanas (si no usas `npm run dev` desde la raíz de dach-job-filter)
$Root = Split-Path -Parent $PSScriptRoot

Write-Host "DACH Job Filter — API puerto 8765 · Web puerto 3000" -ForegroundColor Cyan

Start-Process powershell -WorkingDirectory (Join-Path $Root "backend") -ArgumentList "-NoExit", "-Command", @"
  Write-Host '[API] http://127.0.0.1:8765' -ForegroundColor Green
  py -3.13 -m uvicorn main:app --reload --host 127.0.0.1 --port 8765
  if (`$LASTEXITCODE -ne 0) {
    Write-Host 'Fallo py -3.13. Prueba: python -m uvicorn main:app --reload --host 127.0.0.1 --port 8765' -ForegroundColor Yellow
    pause
  }
"@

Start-Sleep -Seconds 2

Start-Process powershell -WorkingDirectory (Join-Path $Root "frontend") -ArgumentList "-NoExit", "-Command", @"
  Write-Host '[WEB] http://127.0.0.1:3000' -ForegroundColor Green
  npm run dev -- --hostname 127.0.0.1 --port 3000
"@

Write-Host "Dos ventanas abiertas. Si el API no arranca, prueba otro puerto en backend/package.json y frontend/.env.local" -ForegroundColor Gray
