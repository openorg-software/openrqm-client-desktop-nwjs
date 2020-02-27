/*
openrqm-client-desktop-nwjs
RQMServerSettingsModal Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';
// To display application version
import { version } from '../../../package.json';

@Component({
  selector: 'app-rqmserver-settings-modal',
  templateUrl: './rqmserver-settings-modal.component.html',
  styleUrls: ['./rqmserver-settings-modal.component.css']
})
export class RQMServerSettingsModalComponent implements OnInit {
  public version: string = version;
  closeResult: string;

  @ViewChild('serverIpInputField', { static: false }) serverIpInputField;
  @ViewChild('serverPortInputField', { static: false }) serverPortInputField;
  serverIp: string = "";
  serverPort: number = -1;

  constructor(private rqmSettingsService: RQMSettingsService) {
    this.serverIp = this.rqmSettingsService.rqmSettingsModel.serverIpAddress;
    this.serverPort = this.rqmSettingsService.rqmSettingsModel.serverPort;
  }

  ngOnInit() {
    
  }

  ///Saves the currently set settings.
  saveSettings() {
    this.rqmSettingsService.rqmSettingsModel.serverIpAddress = this.serverIpInputField.nativeElement.value;
    this.rqmSettingsService.rqmSettingsModel.serverPort = this.serverPortInputField.nativeElement.value;
    this.rqmSettingsService.saveSettings();
  }



}
