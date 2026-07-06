#Requires -Version 7.0
<#
.SYNOPSIS
    Run the frontend and backend in development mode (parallel).
.DESCRIPTION
    Starts the Spring Boot backend (mvnw spring-boot:run) and the Vite
    dev server (npm run dev) in the same console. Ctrl+C stops both.
.NOTES
    Backend  -> http://localhost:8080
    Frontend -> http://localhost:5173
#>
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

function Stop-Tree([System.Diagnostics.Process]$proc) {
    if ($proc -and -not $proc.HasExited) {
        taskkill /T /F /PID $proc.Id 2>$null | Out-Null
    }
}

$backend = Start-Process `
    -FilePath cmd `
    -ArgumentList '/c', 'mvnw.cmd', 'spring-boot:run' `
    -WorkingDirectory (Join-Path $root 'backend') `
    -NoNewWindow -PassThru

$frontend = Start-Process `
    -FilePath cmd `
    -ArgumentList '/c', 'npm.cmd', 'run', 'dev' `
    -WorkingDirectory (Join-Path $root 'frontend') `
    -NoNewWindow -PassThru

Write-Host 'Backend  running at http://localhost:8080' -ForegroundColor Green
Write-Host 'Frontend running at http://localhost:5173' -ForegroundColor Green
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
