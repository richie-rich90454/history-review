#Requires -Version 7.0
<#
.SYNOPSIS
    Build the frontend and backend.
.DESCRIPTION
    Builds the SolidJS frontend (npm run build) and Spring Boot backend
    (mvnw clean package -DskipTests). Tests are skipped because they
    require a running MySQL instance.
.NOTES
    Output:
      Frontend -> frontend/dist/
      Backend  -> backend/target/history-backend-0.0.1-SNAPSHOT.jar
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

Write-Host '== Building frontend ==' -ForegroundColor Cyan
Push-Location (Join-Path $root 'frontend')
try {
    npm run build
    if ($LASTEXITCODE -ne 0) { throw "Frontend build failed (exit $LASTEXITCODE)" }
} finally { Pop-Location }

Write-Host ''
Write-Host '== Building backend ==' -ForegroundColor Cyan
Push-Location (Join-Path $root 'backend')
try {
    .\mvnw.cmd clean package -DskipTests
    if ($LASTEXITCODE -ne 0) { throw "Backend build failed (exit $LASTEXITCODE)" }
} finally { Pop-Location }

Write-Host ''
Write-Host 'Build complete.' -ForegroundColor Green
Write-Host '  Frontend dist: frontend/dist/'
Write-Host '  Backend jar:   backend/target/history-backend-0.0.1-SNAPSHOT.jar'
