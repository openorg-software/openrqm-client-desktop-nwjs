# OpenRQM Client Architecture

The OpenRQM client consists of 3 major views.

1. Login View - For displaying the login screen
2. Workspace View - For displaying all workspaces and their documents
3. Document View - For displaying the elements of a document 

The interface to the OpenRQM server is described in [openrqm-docs](https://github.com/openrqm/openrqm-docs).

## Functional description of components

### Tauri

[Tauri](https://tauri.app/) is used for packaging and deployment of the application.
Tauri wraps the Angular web frontend in a native desktop shell using the operating system's built-in WebView (WebKit on Linux/macOS, WebView2 on Windows), keeping the binary size small and avoiding a bundled browser engine.

The Tauri-specific files live in the `src-tauri/` directory:

- `tauri.conf.json` — application metadata, window configuration, bundle targets, and plugin settings
- `src/lib.rs` — Rust entry point; plugins (e.g. `tauri-plugin-store`) are registered here
- `capabilities/default.json` — permission grants for Tauri plugin APIs exposed to the frontend
- `Cargo.toml` — Rust dependencies

### Angular

#### 


## License

SPDX-License-Identifier: GPL-2.0-only

## Copyright

Copyright (C) 2019 Benjamin Schilling