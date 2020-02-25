/*
openrqm-client-desktop-nwjs
RQMServerSettingsModal Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmserver-settings-modal',
  templateUrl: './rqmserver-settings-modal.component.html',
  styleUrls: ['./rqmserver-settings-modal.component.css']
})
export class RQMServerSettingsModalComponent implements OnInit {

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
    this.serverIpInputField.value = this.rqmSettingsService.rqmSettingsModel.serverIpAddress;
    this.serverPortInputField.value = this.rqmSettingsService.rqmSettingsModel.serverPort;
  }

  ///Saves the currently set settings.
  saveSettings() {
    this.rqmSettingsService.rqmSettingsModel.serverIpAddress = this.serverIpInputField.nativeElement.value;
    this.rqmSettingsService.rqmSettingsModel.serverPort = this.serverPortInputField.nativeElement.value;
    this.rqmSettingsService.saveSettings();
  }



}
