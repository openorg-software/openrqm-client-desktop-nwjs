# OpenRQM Desktop Client

This OpenRQM Desktop Client is a [Tauri](https://tauri.app/) application using [Angular](https://angular.dev/) for the frontend.

[![Build and Release](https://github.com/openrqm/openrqm-client-desktop-nwjs/actions/workflows/build.yml/badge.svg)](https://github.com/openrqm/openrqm-client-desktop-nwjs/actions/workflows/build.yml) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fopenrqm%2Fopenrqm-client-desktop-nwjs.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fopenrqm%2Fopenrqm-client-desktop-nwjs?ref=badge_shield) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=openrqm_openrqm-client-desktop-nwjs&metric=alert_status)](https://sonarcloud.io/dashboard?id=openrqm_openrqm-client-desktop-nwjs)

## Content

* [OpenRQM Desktop Client](#openrqm-desktop-client)
  + [Content](#content)
  + [Hints for reading the OpenRQM Client documentation](#hints-for-reading-the-openrqm-client-documentation)
  + [How to run / build](#how-to-run--build)
    - [Prerequisites](#prerequisites)
    - [Development server](#development-server)
    - [Build](#build)
      * [Linux](#linux)
      * [Windows](#windows)
  + [Design & Architecture](#design--architecture)
  + [Features](#features)
  + [License](#license)
  + [Copyright](#copyright)

## Hints for reading the OpenRQM Client documentation

The documents can be read best using [Visual Studio Code](https://code.visualstudio.com/) using the [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/) extension since all drawings are created using [PlantUML](http://plantuml.com/).

## How to run / build

### Prerequisites

The following tools must be installed before building:

| Tool | Version | Installation |
| ---- | ------- | ------------ |
| [Node.js](https://nodejs.org/) | 20 LTS or later | https://nodejs.org/ |
| [Rust](https://www.rust-lang.org/) | stable | https://rustup.rs/ |
| [Tauri CLI](https://tauri.app/) | 2.x | `cargo install tauri-cli` |

**Linux** — additionally install the following system libraries:

```bash
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf
```

**Windows** — no additional system libraries required beyond the tools listed above.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4201/`. The app will automatically reload when source files change.

To start the full Tauri dev window (native shell wrapping the dev server):

```bash
npm run tauri:dev
```

### Build

#### Linux

Use the provided build script which installs system dependencies, builds the Angular frontend, and produces `.deb`, `.rpm`, and `.AppImage` bundles:

```bash
./build-linux.sh
```

To skip the automatic `apt-get` step (e.g. in CI or when dependencies are already installed):

```bash
SKIP_SYSTEM_DEPS=1 ./build-linux.sh
```

Artifacts are written to `src-tauri/target/release/bundle/`.

Alternatively, build via `make`:

```bash
make build
```

#### Windows

Use the provided PowerShell build script which builds the Angular frontend and produces `.msi` and `.nsis` installers:

```powershell
.\build-windows.ps1
```

Artifacts are written to `src-tauri\target\release\bundle\`.

### CI / CD

Pushes to `master` and `development` trigger the [GitHub Actions workflow](.github/workflows/build.yml), which builds for both Linux (`x86_64`) and Windows (`x86_64`) and publishes the bundles as a GitHub Release.

## Design & Architecture

The design and architecture is described in the documents in the `doc` directory.

## Features

| Feature                                    | Status  | Release |
| ------------------------------------------ | ------- | ------- |
| Basic workspace explorer & document viewer | done    | MVP     |
| User management                            | done    | MVP     |
| Linking                                    | done    | MVP     |
| PDF export                                 | done    | MVP     |
| Multiple views per document                |         |         |
| Baselining                                 |         |         |
| Shared edit                                |         |         |
| Multimedia content (figures, tables)       | done    |         |
| Tracing Graphs                             |         |         |

## License

SPDX-License-Identifier: GPL-2.0-only

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fopenrqm%2Fopenrqm-client-desktop-nwjs.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fopenrqm%2Fopenrqm-client-desktop-nwjs?ref=badge_large)

## Copyright

Copyright (C) 2019 - 2020 Benjamin Schilling
