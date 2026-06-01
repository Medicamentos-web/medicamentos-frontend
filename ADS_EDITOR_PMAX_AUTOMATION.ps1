$ErrorActionPreference = "Stop"

function Wait-Step($message) {
  Write-Host ""
  Write-Host "======================================================" -ForegroundColor Cyan
  Write-Host $message -ForegroundColor Yellow
  Write-Host "Pulsa ENTER cuando estes listo..." -ForegroundColor Gray
  Read-Host | Out-Null
}

function Copy-Block($title, $content) {
  Set-Clipboard -Value $content
  Write-Host ""
  Write-Host "Copiado al portapapeles: $title" -ForegroundColor Green
  Write-Host "Pega ahora (Ctrl+V) en Ads Editor / Web Google Ads." -ForegroundColor Gray
}

$headlines = @"
Medikamente sicher verwalten
MediControl fur Ihre Familie
Jetzt kostenlos testen
Fur iPhone und Android
Erinnerungen zur richtigen Zeit
Familien-Medikamentenplan
Bestand und Ablaufdaten im Blick
Weniger Stress im Alltag
Mehr Sicherheit fur Angehorige
In 2 Minuten startklar
"@

$longHeadlines = @"
Verwalten Sie Medikamente fur die ganze Familie einfach und sicher
Erinnerungen, Bestand und Ablaufdaten in einer App
MediControl hilft Familien im Alltag mit klaren Medikamentenplanen
Jetzt kostenlos starten und Medikamente digital organisieren
Mehr Sicherheit fur Angehorige und pflegende Familien
"@

$descriptions = @"
Erhalten Sie rechtzeitig Erinnerungen fur Ihre Einnahmen.
Verwalten Sie Medikamente fur die ganze Familie an einem Ort.
Scannen oder manuell eingeben und direkt starten.
Ideal fur Familien und pflegende Angehorige im Alltag.
Jetzt kostenlos testen und in wenigen Minuten loslegen.
"@

$callouts = @"
Kostenlos testen
Start in 2 Minuten
iOS und Android
Fur Familien geeignet
Datenschutzorientiert
"@

$snippets = @"
Services	Medikamenten-Erinnerungen
Services	Bestandskontrolle
Services	Ablaufdaten-Warnungen
Services	Familienverwaltung
"@

Write-Host "Asistente PMax policy-safe (sin terminos de medicamentos restringidos)" -ForegroundColor Cyan

Wait-Step "Paso 1: Entra en el grupo de recursos PMax > Headline assets."
Copy-Block "PMax Headlines", $headlines

Wait-Step "Paso 2: Entra en Long headline assets."
Copy-Block "PMax Long Headlines", $longHeadlines

Wait-Step "Paso 3: Entra en Description assets."
Copy-Block "PMax Descriptions", $descriptions

Wait-Step "Paso 4: Entra en Callout assets."
Copy-Block "PMax Callouts", $callouts

Wait-Step "Paso 5: Entra en Structured snippets (Header + Value)."
Copy-Block "PMax Structured Snippets", $snippets

Write-Host ""
Write-Host "Listo. Revisa que NO haya Atorvastatin/Lisinopril/Metformin en assets, imagenes o videos." -ForegroundColor Green
Write-Host "Luego: Anderungen uberprufen -> Post -> Request review." -ForegroundColor Green
