#Requires -Version 7.0
<#
.SYNOPSIS
    Run the frontend and backend in production mode (parallel).
.DESCRIPTION
    Runs the built Spring Boot jar and serves the built frontend via
    `vite preview`. Run .\build.ps1 first to produce the artifacts.
.NOTES
    Backend  -> http://localhost:8080
    Frontend -> http://localhost:4173
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

$jar = Join-Path $root 'backend\target\history-backend-0.0.1-SNAPSHOT.jar'
$dist = Join-Path $root 'frontend\dist'

if (-not (Test-Path $jar)) {
    Write-Error "Backend jar not found: $jar`nRun .\build.ps1 first."
    exit 1
}
if (-not (Test-Path $dist)) {
    Write-Error "Frontend dist not found: $dist`nRun .\build.ps1 first."
    exit 1
}

function Stop-Tree([System.Diagnostics.Process]$proc) {
    if ($proc -and -not $proc.HasExited) {
        taskkill /T /F /PID $proc.Id 2>$null | Out-Null
    }
}

$backend = Start-Process `
    -FilePath java `
    -ArgumentList '-jar', $jar `
    -WorkingDirectory (Join-Path $root 'backend') `
    -NoNewWindow -PassThru

$frontend = Start-Process `
    -FilePath cmd `
    -ArgumentList '/c', 'npm.cmd', 'run', 'preview' `
    -WorkingDirectory (Join-Path $root 'frontend') `
    -NoNewWindow -PassThru

Write-Host 'Backend  running at http://localhost:8080' -ForegroundColor Green
Write-Host 'Frontend running at http://localhost:4173' -ForegroundColor Green
Write-Host 'Press Ctrl+C to stop.' -ForegroundColor Yellow

try {
    while (-not $backend.HasExited -and -not $frontend.HasExited) {
        Start-Sleep -Seconds 1
    }
} finally {
    Stop-Tree $backend
    Stop-Tree $frontend
    Write-Host 'Shut down.' -ForegroundColor Yellow
}
