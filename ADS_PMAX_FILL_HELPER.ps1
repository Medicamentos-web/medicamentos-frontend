param(
  [string]$FinalUrl = "https://medicamentos-frontend.vercel.app/landing"
)

$ErrorActionPreference = "Stop"

function Copy-Step {
  param(
    [string]$Label,
    [string]$Value
  )
  Set-Clipboard -Value $Value
  Write-Host ""
  Write-Host "--------------------------------------------------" -ForegroundColor Cyan
  Write-Host "Copiado: $Label" -ForegroundColor Green
  Write-Host $Value -ForegroundColor White
  Write-Host "Pegalo en Google Ads y pulsa ENTER..." -ForegroundColor Yellow
  Read-Host | Out-Null
}

Write-Host ""
Write-Host "Asistente PMax: relleno rapido de recursos" -ForegroundColor Cyan
Write-Host "Pantalla objetivo: grupo de recursos (Titulos/Descripciones/URL final)." -ForegroundColor Gray
Write-Host ""

# URL final (obligatoria)
Copy-Step -Label "URL final" -Value $FinalUrl

# 3 Titulos (obligatorio segun tu pantalla)
$headlines = @(
  "Medikamente sicher verwalten",
  "MediControl fur Ihre Familie",
  "Jetzt kostenlos testen"
)
for ($i = 0; $i -lt $headlines.Count; $i++) {
  Copy-Step -Label ("Titulo " + ($i + 1)) -Value $headlines[$i]
}

# 1 Titulo largo (opcional recomendable)
Copy-Step -Label "Titulo largo" -Value "Verwalten Sie Medikamente fur die ganze Familie einfach und sicher"

# 2 Descripciones (obligatorio segun tu pantalla)
$descriptions = @(
  "Erinnerungen, Bestand und Ablaufdaten in einer App.",
  "Ideal fur Familien und pflegende Angehorige."
)
for ($i = 0; $i -lt $descriptions.Count; $i++) {
  Copy-Step -Label ("Descripcion " + ($i + 1)) -Value $descriptions[$i]
}

# Opcionales utiles (si los agregas en la misma pantalla)
Copy-Step -Label "Texto destacado (callout)" -Value "Kostenlos testen"
Copy-Step -Label "Texto destacado (callout)" -Value "iOS und Android"
Copy-Step -Label "Structured Snippet Header" -Value "Services"
Copy-Step -Label "Structured Snippet Value" -Value "Medikamenten-Erinnerungen"
Copy-Step -Label "Structured Snippet Value" -Value "Bestandskontrolle"
Copy-Step -Label "Structured Snippet Value" -Value "Ablaufdaten-Warnungen"

Write-Host ""
Write-Host "Listo. Ahora pulsa 'Guardar' en Google Ads y luego 'Solicitar revision' si aplica." -ForegroundColor Green
Write-Host ""
