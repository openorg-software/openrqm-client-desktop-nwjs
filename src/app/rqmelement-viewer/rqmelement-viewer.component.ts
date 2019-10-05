/*
openrqm-client-desktop-nwjs
RQMElementViewer Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component } from '@angular/core';
import { ElementService, RQMElement } from 'openrqm-api';

@Component({
  selector: 'app-rqmelement-viewer',
  templateUrl: './rqmelement-viewer.component.html',
  styleUrls: ['./rqmelement-viewer.component.css']
})
export class RQMElementViewerComponent {

  elementService: ElementService;

  model: {
    id: number;
    content: string;
    elementTypeId: number;
    rank: string;
    parentElementId: number;
    documentId: number;
  };

  constructor(elementService: ElementService) {
    this.elementService = elementService;
  }

  saveElement() {
    let element = {} as RQMElement;
    element.content = this.model.content;
    element.id = this.model.id;
    element.elementTypeId = this.model.elementTypeId;
    element.rank = this.model.rank;
    element.parentElementId = this.model.parentElementId;
    element.documentId = this.model.documentId;
    console.log(this.model);
    console.log(element);
    console.log(this.elementService);
    this.elementService.putElement(element).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('save element done');
      }
    );
  }

}