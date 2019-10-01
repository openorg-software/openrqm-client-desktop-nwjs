/*
openrqm-client-desktop-nwjs
RQMElementViewer Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-rqmelement-viewer',
  templateUrl: './rqmelement-viewer.component.html',
  styleUrls: ['./rqmelement-viewer.component.css']
})
export class RQMElementViewerComponent {
  model: {
    id: Number;
    content: String;
    type: Number;
    rank: String;
    parent: Number;
  };

  constructor() { }

}