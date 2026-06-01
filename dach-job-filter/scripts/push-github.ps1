#Requires -Version 5.1
<#
.SYNOPSIS
  Prepara Git en esta carpeta (dach-job-filter) y hace push a GitHub.

.DESCRIPTION
  1) git init si no existe .git
  2) git add + commit (si hay cambios)
  3) git remote origin + git push

  Crea antes un repo VACIO en GitHub (sin README) y copia la URL HTTPS o SSH.

.PARAMETER RepoUrl
  Ejemplo: https://github.com/tu-usuario/dach-job-filter.git

.EXAMPLE
  .\scripts\push-github.ps1 -RepoUrl https://github.com/mi-org/dach-job-filter.git

.EXAMPLE
  $env:GITHUB_REPO_URL = "https://github.com/mi-org/dach-job-filter.git"
  .\scripts\push-github.ps1
#>
param(
  [Parameter(Mandatory = $false)]
  [string] $RepoUrl = "",
  [switch] $SkipCommit
)

$ErrorActionPreference = "Stop"

# Raíz del proyecto = padre de /scripts
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $ProjectRoot

function Write-Step([string]$msg) {
  Write-Host ""
  Write-Host "==> $msg" -ForegroundColor Cyan
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "[ERROR] Git no esta en el PATH. Instala Git desde https://git-scm.com" -ForegroundColor Red
  exit 1
}

if (-not (git config user.name)) {
  Write-Host "[AVISO] Configura tu nombre para Git, ejemplo:" -ForegroundColor Yellow
  Write-Host '  git config --global user.name "Tu Nombre"'
  Write-Host '  git config --global user.email "tu@email.com"'
  exit 1
}

if (-not $RepoUrl -or $RepoUrl.Trim() -eq "") {
  $RepoUrl = [Environment]::GetEnvironmentVariable("GITHUB_REPO_URL", "Process")
}
if (-not $RepoUrl -or $RepoUrl.Trim() -eq "") {
  Write-Host ""
  Write-Host "Uso:" -ForegroundColor Yellow
  Write-Host '  .\scripts\push-github.ps1 -RepoUrl https://github.com/USUARIO/dach-job-filter.git'
  Write-Host ""
  Write-Host "O variable de entorno (PowerShell):" -ForegroundColor Yellow
  Write-Host '  $env:GITHUB_REPO_URL = "https://github.com/USUARIO/dach-job-filter.git"'
  Write-Host '  .\scripts\push-github.ps1'
  Write-Host ""
  Write-Host "En GitHub: New repository -> nombre dach-job-filter -> sin README -> copiar URL." -ForegroundColor Gray
  exit 2
}

$RepoUrl = $RepoUrl.Trim()

Write-Step "Carpeta: $ProjectRoot"

if (-not (Test-Path (Join-Path $ProjectRoot ".git"))) {
  Write-Step "git init -b main"
  git init -b main
}

$branch = (git branch --show-current 2>$null)
if (-not $branch) {
  git checkout -b main 2>$null
  $branch = "main"
}

if (-not $SkipCommit) {
  Write-Step "git add / commit"
  git add -A
  $dirty = git status --porcelain
  if ($dirty) {
    $msg = "DACH Job Filter MVP ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))"
    git commit -m $msg
    Write-Host "Commit creado." -ForegroundColor Green
  }
  else {
    Write-Host "No hay cambios nuevos para commitear." -ForegroundColor Gray
  }
}

Write-Step "Remoto origin -> $RepoUrl"
git remote remove origin 2>$null
git remote add origin $RepoUrl

Write-Step "git push -u origin $branch"
git push -u origin $branch

if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "[ERROR] push fallo. Si el repo en GitHub tiene README/commit inicial:" -ForegroundColor Red
  Write-Host "  Opcion A: borra el repo y crea uno vacio (sin README)." -ForegroundColor Yellow
  Write-Host "  Opcion B: git pull origin $branch --rebase && git push -u origin $branch" -ForegroundColor Yellow
  exit 3
}

Write-Host ""
Write-Host "Listo. Repositorio subido a GitHub." -ForegroundColor Green
Write-Host "Siguiente: Render (API) y Vercel (frontend) como en README.md seccion GitHub y despliegue." -ForegroundColor Gray
