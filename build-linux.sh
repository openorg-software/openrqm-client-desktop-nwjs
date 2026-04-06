#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-2.0-only
# Copyright (C) 2019 - 2026 Benjamin Schilling
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"

npm install
npm run build
cargo tauri build --bundles deb,appimage
