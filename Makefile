
# openrqm-client-desktop-nwjs
# App Modules
# SPDX-License-Identifier: GPL-2.0-only
# Copyright (C) 2019 - 2026 Benjamin Schilling

.PHONY: all build install clean uninstall

all: clean build

build:
		bash build-linux.sh

install:
		mkdir -p $(DESTDIR)/opt/
		cp -r src-tauri/target/release/bundle/deb $(DESTDIR)/opt/openrqm-client || \
		  cp -r src-tauri/target/release/bundle/appimage $(DESTDIR)/opt/openrqm-client
		mkdir -p $(DESTDIR)/etc/profile.d/
		printf '#!/bin/bash\nexport PATH=$$PATH:/opt/openrqm-client' > $(DESTDIR)/etc/profile.d/101-openrqm-client.sh
		chmod 755 $(DESTDIR)/etc/profile.d/101-openrqm-client.sh

clean:
		rm -f -r dist
		cargo clean --manifest-path src-tauri/Cargo.toml

uninstall:
		rm -r $(DESTDIR)/opt/openrqm-client
