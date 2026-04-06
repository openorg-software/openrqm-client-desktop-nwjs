# SPDX-License-Identifier: GPL-2.0-only
# Copyright (C) 2019 - 2026 Benjamin Schilling
$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

npm install
npm run build
cargo tauri build --bundles nsis,msi
