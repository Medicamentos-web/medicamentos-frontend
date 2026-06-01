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
  Write-Host "Ahora pega (Ctrl+V) en 'Mehrere Anderungen vornehmen'." -ForegroundColor Gray
}

$rsaMedikamentenApp = @"
Final URL	Path 1	Path 2	Headline 1	Headline 2	Headline 3	Description 1	Description 2
https://medicamentos-frontend.vercel.app/	medikamente	app	Medikamente sicher verwalten	MediControl fur Ihre Familie	Jetzt kostenlos testen	Verwalten Sie Medikamente fur die ganze Familie einfach und sicher.	Erinnerungen Bestand und Ablaufdaten in einer App.
"@

$rsaErinnerung = @"
Final URL	Path 1	Path 2	Headline 1	Headline 2	Headline 3	Description 1	Description 2
https://medicamentos-frontend.vercel.app/	erinnerung	familie	Medikamenten-Erinnerung App	Nie wieder Einnahme vergessen	Jetzt kostenlos testen	Erhalten Sie rechtzeitig Erinnerungen fur Ihre Einnahmen.	Scannen oder manuell eingeben und direkt starten.
"@

$rsaFamilienpflege = @"
Final URL	Path 1	Path 2	Headline 1	Headline 2	Headline 3	Description 1	Description 2
https://medicamentos-frontend.vercel.app/	familie	pflege	Weniger Stress im Pflegealltag	Familien-Medikamentenplan digital	Mehr Sicherheit fur Angehorige	Verwalten Sie Medikamente zentral fur die ganze Familie.	Jetzt gratis starten mit MediControl.
"@

$negativeKeywords = @"
Negative keyword
atorvastatin
lisinopril
metformin
amoxicillin
ibuprofen 600
rezeptpflichtiges medikament
"@

Write-Host "Asistente de importacion automatizada para Google Ads Editor" -ForegroundColor Cyan
Write-Host "Proyecto: MediControl (DE policy-safe)" -ForegroundColor Cyan

Wait-Step "Paso 1: Entra en AG_Medikamenten_App -> Mehrere Anderungen vornehmen -> Responsive Suchanzeigen."
Copy-Block "RSA AG_Medikamenten_App", $rsaMedikamentenApp

Wait-Step "Paso 2: Entra en AG_Erinnerung -> Mehrere Anderungen vornehmen -> Responsive Suchanzeigen."
Copy-Block "RSA AG_Erinnerung", $rsaErinnerung

Wait-Step "Paso 3: Entra en AG_Familienpflege -> Mehrere Anderungen vornehmen -> Responsive Suchanzeigen."
Copy-Block "RSA AG_Familienpflege", $rsaFamilienpflege

Wait-Step "Paso 4: Entra en Campaign MC_DE_Search_Conversions -> Negative keywords -> Mehrere Anderungen vornehmen."
Copy-Block "Negative Drug Terms", $negativeKeywords

Write-Host ""
Write-Host "Listo. Ahora ejecuta: 'Anderungen uberprufen' y luego 'Post'." -ForegroundColor Green
