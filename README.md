# OpenRQM Desktop Client

This OpenRQM Desktop Client is a [NW.js](https://nwjs.io/) project using [angular-cli](https://cli.angular.io/).

[![Build Status](https://dev.azure.com/OpenRQM/OpenRQM/_apis/build/status/openrqm.openrqm-client-desktop-nwjs?branchName=development)](https://dev.azure.com/OpenRQM/OpenRQM/_build/latest?definitionId=4&branchName=development)  [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fopenrqm%2Fopenrqm-client-desktop-nwjs.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fopenrqm%2Fopenrqm-client-desktop-nwjs?ref=badge_shield) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=openrqm_openrqm-client-desktop-nwjs&metric=alert_status)](https://sonarcloud.io/dashboard?id=openrqm_openrqm-client-desktop-nwjs)

## Content

* [OpenRQM Desktop Client](#openrqm-desktop-client)
  + [Content](#content)
  + [Hints for reading the OpenRQM Client documentation](#hints-for-reading-the-openrqm-client-documentation)
  + [How to run / build](#how-to-run--build)
    - [Development server](#development-server)
    - [Build](#build)
  + [Design & Architecture](#design--architecture)
  + [Features](#features)
  + [License](#license)
  + [Copyright](#copyright)

## Hints for reading the OpenRQM Client documentation

The documents can be read best using [Visual Studio Code](https://code.visualstudio.com/) or [Atom](https://atom.io/) using the [Markdown Preview Enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/) extension since all drawings are created using [PlantUML](http://plantuml.com/).

## How to run / build

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Then the nw-package.json has to be copied to the `dist/openrqm-client-desktop-nwjs/` directory.
 
Afterwards running `<Path to nw.js>\nw.exe dist/openrqm-client-desktop-nwjs/.` on Windows or `<Path to nw>/nw dist/openrqm-client-desktop-nwjs/.` on Linux can be used to run the application.

To package the software for release please follow the guildelines of [nw.js](http://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` . The app will automatically reload if you change any of the source files.

## Design & Architecture

The design and architecture is described in the documents in the `doc` directory.

## Features

| Feature                                    | Status  | Release |
| ------------------------------------------ | ------- | ------- |
| Basic workspace explorer & document viewer | done    | MVP     |
| User management                            |         | MVP     |
| Linking                                    |         | MVP     |
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

Copyright (C) 2019 Benjamin Schilling

