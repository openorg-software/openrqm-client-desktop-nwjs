# openrqm-client-desktop-nwjs
# Windows build wrapper script
# SPDX-License-Identifier: GPL-2.0-only
# Copyright (C) 2019 Benjamin Schilling

#Requires -Version 5.1
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

function Check-Tools {
    $missing = [System.Collections.Generic.List[string]]::new()

    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        $missing.Add("node  -> https://nodejs.org  (or: winget install OpenJS.NodeJS)")
    }
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        $missing.Add("npm   -> ships with Node.js")
    }
    if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
        $missing.Add("cargo -> https://rustup.rs   (or: winget install Rustlang.Rustup)")
    }

    if ($missing.Count -gt 0) {
        Write-Host "ERROR: Missing required tools:" -ForegroundColor Red
        foreach ($tool in $missing) {
            Write-Host "  - $tool" -ForegroundColor Red
        }
        exit 1
    }
}

Check-Tools

Write-Host "==> Installing npm dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "==> Building Angular frontend..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "==> Building Tauri application (Windows: nsis + msi)..." -ForegroundColor Cyan
cargo tauri build --bundles nsis,msi
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "==> Build complete. Artifacts:" -ForegroundColor Green
$bundleDir = Join-Path $PSScriptRoot "src-tauri\target\release\bundle"
if (Test-Path $bundleDir) {
    Get-ChildItem -Path $bundleDir -Recurse -Include "*.exe", "*.msi" |
        Sort-Object FullName |
        ForEach-Object { Write-Host "  $($_.FullName)" }
} else {
    Write-Host "  (bundle directory not found — build may have failed silently)"
}
