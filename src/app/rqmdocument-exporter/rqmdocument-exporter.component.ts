/*
openrqm-client-desktop-nwjs
RQMDocumentsExporter Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { ExportService } from 'openrqm-api'

@Component({
  selector: 'app-rqmdocument-exporter',
  templateUrl: './rqmdocument-exporter.component.html',
  styleUrls: ['./rqmdocument-exporter.component.css']
})
export class RQMDocumentExporterComponent implements OnInit {

  closeResult: string;
  documentId: string;

  @Input() type: string;

  constructor(private rqmExportService: ExportService, private route: ActivatedRoute, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    this.rqmExportService.configuration.basePath = this.settingsService.getApiBasePath();
    this.rqmExportService.configuration.apiKeys = {};
    this.rqmExportService.configuration.apiKeys['token'] = this.userService.getToken();
  }

  ngOnInit() {
    this.documentId = this.route.snapshot.paramMap.get('id');
  }

  exportDocument() {
    if (this.type == "pdf") {
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
    } else if (this.type == "markdown") {
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
