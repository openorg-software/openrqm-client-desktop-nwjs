/*
openrqm-client-desktop-nwjs
RQMDocumentsExporter Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, Input } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';
import { ExportService } from 'openrqm-api'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rqmdocument-exporter',
  templateUrl: './rqmdocument-exporter.component.html',
  styleUrls: ['./rqmdocument-exporter.component.css']
})
export class RQMDocumentExporterComponent implements OnInit {

  closeResult: string;
  settingService: RQMSettingsService
  rqmExportService: ExportService;
  documentId: String;

  @Input() type: string;

  constructor(rqmExportService: ExportService, private route: ActivatedRoute, settingsService: RQMSettingsService) {
    this.settingService = settingsService;
    this.rqmExportService = rqmExportService;
    this.rqmExportService.configuration.basePath = this.settingService.getApiBasePath();
  }

  ngOnInit() {
    this.documentId = this.route.snapshot.paramMap.get('id');
  }

  exportDocument() {
    if(this.type == "pdf"){
      this.rqmExportService.exportPdf(Number(this.documentId), 1).subscribe(
        next => {
          console.log(next);
          const url = window.URL.createObjectURL(next);
          window.open(url);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('export PDF document done');
        }
      );
    } else if (this.type == "markdown"){
      this.rqmExportService.exportMarkdown(Number(this.documentId), 1).subscribe(
        next => {
          console.log(next);
          const url = window.URL.createObjectURL(next);
          window.open(url);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('export markdown document done');
        }
      );
    } else {
      console.log("unhandled exporter");
    }
  }
  
}
