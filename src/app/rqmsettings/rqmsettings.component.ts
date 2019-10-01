/*
openrqm-client-desktop-nwjs
RQMSettings Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmsettings',
  templateUrl: './rqmsettings.component.html',
  styleUrls: ['./rqmsettings.component.css']
})
export class RQMSettingsComponent implements OnInit {

  rqmSettingsService: RQMSettingsService

  constructor(rqmSettingsService: RQMSettingsService) {
    this.rqmSettingsService = rqmSettingsService;
  }

  ngOnInit() {
  }

  saveSettings() {
    this.rqmSettingsService.saveSettings();
  }

}
