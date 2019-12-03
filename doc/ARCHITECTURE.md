# OpenRQM Client Architecture

The OpenRQM client consists of 3 major views.

1. Login View - For displaying the login screen
2. Workspace View - For displaying all workspaces and their documents
3. Document View - For displaying the elements of a document 

The interface to the OpenRQM server is described in [openrqm-docs](https://github.com/openrqm/openrqm-docs).

## Functional description of components

### NW.js

NW.js is used for packaging and deployment of the application.
NW.js allows to run web application as stand-alone applications by providing a webkit environment which displays the website and provides node.js libraries for cross-platform development.

#### nw-package.json
The only NW.js specific file is the nw-package.json file, it tells NW.js what the main html file is and how the application .

### Angular 

#### 


## License

SPDX-License-Identifier: GPL-2.0-only

## Copyright

Copyright (C) 2019 Benjamin Schilling