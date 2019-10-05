/*
openrqm-client-desktop-nwjs
RQMSettings Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmsettings',
  templateUrl: './rqmsettings.component.html',
  styleUrls: ['./rqmsettings.component.css']
})
export class RQMSettingsComponent implements OnInit {

  closeResult: string;
  rqmSettingsService: RQMSettingsService

  @ViewChild('serverIpInputField', { static: false }) serverIpInputField;
  @ViewChild('serverPortInputField', { static: false }) serverPortInputField;

  constructor(rqmSettingsService: RQMSettingsService) {
    this.rqmSettingsService = rqmSettingsService;
  }

  ngOnInit() {
  }

  ///Set the values from the rqmSettingsService in the GUI
  ngAfterViewInit() {
    this.serverIpInputField.nativeElement.value = this.rqmSettingsService.rqmSettingsModel.serverIpAddress;
    this.serverPortInputField.nativeElement.value = this.rqmSettingsService.rqmSettingsModel.serverPort;
  }

  ///Saves the currently set settings.
  saveSettings() {
    this.rqmSettingsService.rqmSettingsModel.serverIpAddress = this.serverIpInputField.nativeElement.value;
    this.rqmSettingsService.rqmSettingsModel.serverPort = this.serverPortInputField.nativeElement.value;
    this.rqmSettingsService.saveSettings();
  }



}
