/*
openrqm-client-desktop-nwjs
RQMDocumentsExporter Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmdocument-exporter',
  templateUrl: './rqmdocument-exporter.component.html',
  styleUrls: ['./rqmdocument-exporter.component.css']
})
export class RQMDocumentExporterComponent implements OnInit {

  closeResult: string;
  rqmSettingsService: RQMSettingsService


  constructor(rqmSettingsService: RQMSettingsService) {
    this.rqmSettingsService = rqmSettingsService;
  }

  ngOnInit() {
  }


}
