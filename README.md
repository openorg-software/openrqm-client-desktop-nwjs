# OpenRQM Desktop Client

This OpenRQM Desktop Client is a [nw.js](https://nwjs.io/) project.
The GUI is created using HTML and CSS while all functionality is written in [Dart](https://dart.dev/) and converted to JavaScript using [dart2js](https://dart.dev/tools/dart2js).

## How to run / build

### Running for development purposes

The client can be run using `webdev serve` and accessed via a webbrowser (ideally Google Chrome) as described on the [dart web](https://dart.dev/tutorials/web/get-started) documentation.

### Build for release

Building for can be performed using `webdev build`. It will result in the compiled JavaScript code in the then created `build` directory. 
Afterwards running `<Path to nw.js>\nw.exe .` on Windows or `<Path to nw>\nw .` on Linux can be used to run the application.

Afterwards to package the software for release  please follow the guildelines of [nw.js](http://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/).

## Design & Architecture

The design and architecture is described in the documents in `doc` directory.

## License

SPDX-License-Identifier: GPL-2.0-only

## Copyright

Copyright (C) 2019 Benjamin Schilling