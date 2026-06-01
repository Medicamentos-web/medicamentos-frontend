param(
  [switch]$AutoFixKnownPages = $true
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== MediControl | Ads Policy Auto Check ===" -ForegroundColor Cyan
Write-Host "Objetivo: detectar y limpiar terminos de medicamentos restringidos en contenido publico." -ForegroundColor Gray

$restrictedTerms = @(
  "atorvastatin",
  "lisinopril",
  "metformin",
  "metamizol",
  "spiricort",
  "metozerok"
)

$publicRoots = @(
  "app",
  "components",
  "public",
  "lib"
)

$extensions = @(".js", ".jsx", ".ts", ".tsx", ".html", ".md", ".txt", ".json")

function Get-ProjectRoot {
  $cwd = (Get-Location).Path
  if (Test-Path (Join-Path $cwd "app")) { return $cwd }
  throw "Ejecuta este script desde la raiz del proyecto (donde existe la carpeta 'app')."
}

function Find-RestrictedTerms([string]$rootPath) {
  $results = @()
  foreach ($root in $publicRoots) {
    $target = Join-Path $rootPath $root
    if (-not (Test-Path $target)) { continue }

    Get-ChildItem -Path $target -Recurse -File | Where-Object {
      $extensions -contains $_.Extension.ToLowerInvariant()
    } | ForEach-Object {
      $file = $_.FullName
      $content = Get-Content -Path $file -Raw -ErrorAction SilentlyContinue
      if (-not $content) { return }
      foreach ($term in $restrictedTerms) {
        if ($content -match [regex]::Escape($term)) {
          $results += [PSCustomObject]@{
            File = $file
            Term = $term
          }
        }
      }
    }
  }
  return $results
}

function SafeReplace-InKnownPages([string]$rootPath) {
  $knownFiles = @(
    (Join-Path $rootPath "app\landing\page.jsx"),
    (Join-Path $rootPath "app\promo\page.jsx"),
    (Join-Path $rootPath "app\page.jsx")
  )

  $replacements = @{
    "Spiricort 20mg" = "Medikament B"
    "MetoZerok 50mg" = "Medikament C"
    "Spiricort" = "Medikament B"
    "MetoZerok" = "Medikament C"
    "Metamizol" = "Medikament B"
  }

  $changed = @()
  foreach ($file in $knownFiles) {
    if (-not (Test-Path $file)) { continue }
    $raw = Get-Content -Path $file -Raw
    $new = $raw
    foreach ($k in $replacements.Keys) {
      $new = $new -replace [regex]::Escape($k), $replacements[$k]
    }
    if ($new -ne $raw) {
      Set-Content -Path $file -Value $new -Encoding UTF8
      $changed += $file
    }
  }
  return $changed
}

$projectRoot = Get-ProjectRoot
Write-Host "Proyecto: $projectRoot" -ForegroundColor Gray

if ($AutoFixKnownPages) {
  $changedFiles = SafeReplace-InKnownPages -rootPath $projectRoot
  if ($changedFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "Auto-fix aplicado en:" -ForegroundColor Yellow
    $changedFiles | ForEach-Object { Write-Host " - $_" }
  }
}

$hits = Find-RestrictedTerms -rootPath $projectRoot

Write-Host ""
if ($hits.Count -eq 0) {
  Write-Host "OK: No se detectaron terminos restringidos en contenido publico." -ForegroundColor Green
} else {
  Write-Host "ATENCION: Se detectaron terminos restringidos en archivos publicos:" -ForegroundColor Red
  $hits | Sort-Object File, Term -Unique | ForEach-Object {
    Write-Host (" - " + $_.Term + " -> " + $_.File)
  }
}

Write-Host ""
Write-Host "=== Siguiente paso manual en Google Ads (obligatorio) ===" -ForegroundColor Cyan
Write-Host "1) En PMax y Search elimina assets/ads viejos con nombres de farmacos." -ForegroundColor Gray
Write-Host "2) Deja solo assets policy-safe." -ForegroundColor Gray
Write-Host "3) Desactiva URL expansion temporalmente en PMax." -ForegroundColor Gray
Write-Host "4) Solicita Request review." -ForegroundColor Gray

Write-Host ""
Write-Host "Comandos recomendados despues de limpiar (si quieres desplegar):" -ForegroundColor Cyan
Write-Host "git add app/landing/page.jsx app/promo/page.jsx app/page.jsx" -ForegroundColor Gray
Write-Host "git commit -m ""fix(ads-policy): remove restricted drug terms from public pages""" -ForegroundColor Gray
Write-Host "git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "Listo." -ForegroundColor Green
