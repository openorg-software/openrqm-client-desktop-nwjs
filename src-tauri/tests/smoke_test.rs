use std::{
  path::{Path, PathBuf},
  process::Command,
  thread,
  time::Duration,
};

use tauri::{test::{mock_builder, mock_context, noop_assets, MockRuntime}, Builder};

fn builder_with_plugins() -> Builder<MockRuntime> {
  mock_builder()
    .plugin(tauri_plugin_store::Builder::default().build())
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      Ok(())
    })
}

#[test]
fn test_app_builds_with_mock_runtime() {
  let app = builder_with_plugins()
    .build(mock_context(noop_assets()))
    .expect("app should build with mock runtime");

  let _webview = tauri::WebviewWindowBuilder::new(&app, "main", Default::default())
    .build()
    .expect("webview window should build");
}

#[test]
fn test_app_builds_with_real_context() {
  let app = builder_with_plugins()
    .build(tauri::generate_context!())
    .expect("app should build with real context");

  drop(app);
}

#[test]
fn test_app_runs_briefly() {
  let app = builder_with_plugins()
    .build(mock_context(noop_assets()))
    .expect("app should build");

  let webview = tauri::WebviewWindowBuilder::new(&app, "main", Default::default())
    .build()
    .expect("webview should build");

  thread::spawn(move || {
    thread::sleep(Duration::from_secs(1));
    webview.close().expect("webview should close cleanly");
  });

  app.run(|_app, _event| {});
}

#[test]
fn test_built_binary_starts_without_immediate_crash() {
  if cfg!(target_os = "linux")
    && std::env::var_os("DISPLAY").is_none()
    && std::env::var_os("WAYLAND_DISPLAY").is_none()
  {
    eprintln!("Skipping binary smoke test: no DISPLAY or WAYLAND_DISPLAY available");
    return;
  }

  let binary = built_binary_path();
  if !binary.exists() {
    eprintln!("Skipping binary smoke test: built binary not found at {}", binary.display());
    return;
  }

  let mut child = Command::new(&binary)
    .spawn()
    .unwrap_or_else(|error| panic!("failed to launch {}: {error}", binary.display()));

  thread::sleep(Duration::from_secs(1));

  if let Some(status) = child
    .try_wait()
    .expect("failed to query child process status")
  {
    panic!(
      "binary exited too early with status {status} ({})",
      binary.display()
    );
  }

  child.kill().expect("failed to stop smoke test process");
  child.wait().expect("failed to reap smoke test process");
}

fn built_binary_path() -> PathBuf {
  if let Some(path) = std::env::var_os("CARGO_BIN_EXE_openrqm-client") {
    return PathBuf::from(path);
  }

  let manifest_dir = Path::new(env!("CARGO_MANIFEST_DIR"));
  let target_dir = manifest_dir.join("target").join("debug");
  let binary_name = if cfg!(target_os = "windows") {
    "openrqm-client.exe"
  } else {
    "openrqm-client"
  };

  target_dir.join(binary_name)
}
