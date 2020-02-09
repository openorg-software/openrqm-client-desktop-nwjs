/*
openrqm-client-desktop-nwjs
RQMDocumentsExporter Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';
import { DocumentService } from 'openrqm-api'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rqmdocument-exporter',
  templateUrl: './rqmdocument-exporter.component.html',
  styleUrls: ['./rqmdocument-exporter.component.css']
})
export class RQMDocumentExporterComponent implements OnInit {

  closeResult: string;
  rqmSettingsService: RQMSettingsService
  rqmDocumentService: DocumentService;
  documentId: String;


  constructor(rqmSettingsService: RQMSettingsService, rqmDocumentService: DocumentService, private route: ActivatedRoute) {
    this.rqmSettingsService = rqmSettingsService;
    this.rqmDocumentService = rqmDocumentService;
  }

  ngOnInit() {
    this.documentId = this.route.snapshot.paramMap.get('id');
  }

  exportDocument() {
    console.log("export document");
    this.rqmDocumentService.exportDocument(Number(this.documentId)).subscribe(
      next => {
        console.log(next);
        const blob = new Blob([next], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(next);
        window.open(url);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('export document done');
      }
    );
  }




}
