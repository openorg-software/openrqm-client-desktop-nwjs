
# openrqm-client-desktop-nwjs
# App Modules
# SPDX-License-Identifier: GPL-2.0-only
# Copyright (C) 2019 Benjamin Schilling

.PHONY: all build install clean uninstall

all: clean build

build:
		sudo npm install -g npm@6.13.6
		sudo printf 'N\n' | sudo npm install -g @angular/cli
		sudo npm install --save-dev @angular-devkit/build-angular
		ng build

		wget -nc https://dl.nwjs.io/v0.44.1/nwjs-v0.44.1-linux-x64.tar.gz
		tar -zxvf nwjs-v0.44.1-linux-x64.tar.gz
		mkdir -p nwjs-v0.44.1-linux-x64/package.nw
		cp nw-package.json nwjs-v0.44.1-linux-x64/package.nw/package.json
		cp -r dist/openrqm-client-desktop-nwjs/* nwjs-v0.44.1-linux-x64/package.nw/
		mv nwjs-v0.44.1-linux-x64/nw nwjs-v0.44.1-linux-x64/openrqm-client

install: 
		mkdir -p $(DESTDIR)/opt/
		cp -r nwjs-v0.44.1-linux-x64  $(DESTDIR)/opt/openrqm-client
		mkdir -p $(DESTDIR)/etc/profile.d/
		printf '#!/bin/bash\nexport PATH=$$PATH:/opt/openrqm-client' > $(DESTDIR)/etc/profile.d/101-openrqm-client.sh
		chmod 755 $(DESTDIR)/etc/profile.d/101-openrqm-client.sh

clean:
		rm -f -r dist
		rm -f -r nwjs-v0.44.1-linux-x64

uninstall:
		rm -r  $(DESTDIR)/opt/openrqm-client