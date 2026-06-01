param(
  [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Stop"

function Write-Info($msg) { Write-Host $msg -ForegroundColor Cyan }
function Write-Ok($msg) { Write-Host $msg -ForegroundColor Green }
function Write-WarnMsg($msg) { Write-Host $msg -ForegroundColor Yellow }

function Extract-LabelFromSendTo([string]$sendTo) {
  if ([string]::IsNullOrWhiteSpace($sendTo)) { return $null }
  $clean = $sendTo.Trim()
  # Expected: AW-XXXXXXXXXXX/label
  if ($clean -match "^AW-[0-9]+\/(.+)$") {
    return $matches[1]
  }
  return $null
}

function Upsert-EnvVar([string]$filePath, [string]$key, [string]$value) {
  $line = "$key=$value"
  if (-not (Test-Path $filePath)) {
    Set-Content -Path $filePath -Value $line -Encoding UTF8
    return
  }

  $lines = Get-Content -Path $filePath -Encoding UTF8
  $updated = $false
  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "^$([regex]::Escape($key))=") {
      $lines[$i] = $line
      $updated = $true
    }
  }
  if (-not $updated) {
    $lines += $line
  }
  Set-Content -Path $filePath -Value $lines -Encoding UTF8
}

Write-Info ""
Write-Info "=== MediControl | Configuracion automatica conversiones Google Ads ==="
Write-Info "Este asistente actualiza .env.local y te deja comandos para Vercel."
Write-Info ""

$root = Resolve-Path $ProjectRoot
Set-Location $root

$envPath = Join-Path $root ".env.local"

Write-Info "Pega el send_to de TRIAL (ejemplo: AW-17972132760/AbCdEFg123)"
$trialSendTo = Read-Host "send_to TRIAL"
$trialLabel = Extract-LabelFromSendTo $trialSendTo
if (-not $trialLabel) {
  throw "Formato invalido para TRIAL. Debe ser AW-<id>/<label>."
}

Write-Info "Pega el send_to de SUBSCRIBE (opcional, ENTER para omitir)"
$subscribeSendTo = Read-Host "send_to SUBSCRIBE"
$subscribeLabel = $null
if (-not [string]::IsNullOrWhiteSpace($subscribeSendTo)) {
  $subscribeLabel = Extract-LabelFromSendTo $subscribeSendTo
  if (-not $subscribeLabel) {
    throw "Formato invalido para SUBSCRIBE. Debe ser AW-<id>/<label>."
  }
}

Upsert-EnvVar -filePath $envPath -key "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_TRIAL" -value $trialLabel

if ($subscribeLabel) {
  Upsert-EnvVar -filePath $envPath -key "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SUBSCRIBE" -value $subscribeLabel
}

Write-Ok ""
Write-Ok "OK: .env.local actualizado."
Write-Ok "Ruta: $envPath"

Write-Info ""
Write-Info "=== Variables detectadas ==="
Write-Host "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_TRIAL=$trialLabel"
if ($subscribeLabel) {
  Write-Host "NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SUBSCRIBE=$subscribeLabel"
} else {
  Write-WarnMsg "SUBSCRIBE omitido."
}

Write-Info ""
Write-Info "=== Comandos listos para Vercel (copiar/pegar) ==="
Write-Host "vercel env add NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_TRIAL production"
Write-Host "$trialLabel"
if ($subscribeLabel) {
  Write-Host ""
  Write-Host "vercel env add NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL_SUBSCRIBE production"
  Write-Host "$subscribeLabel"
}
Write-Host ""
Write-Host "vercel --prod"

Write-Info ""
Write-Info "Despues del deploy:"
Write-Host "1) Acepta cookies de marketing en la web."
Write-Host "2) Completa un trial de prueba."
Write-Host "3) Verifica en Tag Assistant: event=conversion y send_to correcto."
Write-Host "4) En Google Ads puede tardar 1-3h en reflejar conversiones."

Write-Ok ""
Write-Ok "Listo."
