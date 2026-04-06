#!/usr/bin/env bash
# SPDX-License-Identifier: GPL-2.0-only
# Copyright (C) 2019 Benjamin Schilling
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

install_system_deps() {
    echo "==> Installing system dependencies..."
    sudo apt-get update -qq
    sudo apt-get install -y \
        libwebkit2gtk-4.1-dev \
        libssl-dev \
        libgtk-3-dev \
        libayatana-appindicator3-dev \
        librsvg2-dev \
        patchelf
}

check_tools() {
    local missing=()
    command -v node  >/dev/null 2>&1 || missing+=("node (https://nodejs.org)")
    command -v npm   >/dev/null 2>&1 || missing+=("npm")
    command -v cargo >/dev/null 2>&1 || missing+=("cargo (https://rustup.rs)")
    if [ ${#missing[@]} -gt 0 ]; then
        echo "ERROR: Missing required tools:"
        printf '  - %s\n' "${missing[@]}"
        exit 1
    fi
}

if [ "${SKIP_SYSTEM_DEPS:-}" != "1" ]; then
    install_system_deps
fi

check_tools

echo "==> Installing npm dependencies..."
npm ci --legacy-peer-deps

echo "==> Building Angular frontend..."
npm run build

echo "==> Building Tauri application (Linux: deb + AppImage)..."
cargo tauri build --bundles deb,appimage

echo ""
echo "==> Build complete. Artifacts:"
find src-tauri/target/release/bundle -name "*.deb" -o -name "*.AppImage" 2>/dev/null | sort
