/*
openrqm-client-desktop-nwjs
RQMSettings Service
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Injectable } from '@angular/core';
import { RQMSettingsModel } from './rqmsettings-model'

interface SettingsJsonObject {
  serverIpAddress: string,
  serverPort: number;
}

@Injectable({
  providedIn: 'root'
})
export class RQMSettingsService {

  private DEVELOPMENT_MODE_ON: boolean = true;
  private DEVELOPMENT_MODE_OFF: boolean = false;
  public developmentMode: boolean = false;

  public rqmSettingsModel: RQMSettingsModel;
  static settingsFileName = 'openrqm-settings.json';
  filePath: string;

  serverIp: string = "";
  serverPort: Number = -1;
  serverUrl: string = '';

  constructor(){
    console.log('rqmsettings constructor');
    this.filePath = RQMSettingsService.getFilePath();
    this.developmentMode = this.checkSettingsFile();
    if(this.developmentMode == this.DEVELOPMENT_MODE_OFF){
        this.rqmSettingsModel = this.loadSettings();
        this.serverUrl = 'http://' + this.rqmSettingsModel.serverIpAddress + ':' + this.rqmSettingsModel.serverPort + '/api/v1'
        console.log('Using this server url: ' + this.serverUrl);
    } else {
        console.log("NW.js not available, falling back to development mode, server at 192.168.0.115 with port 8090.");
        this.serverUrl = 'http://' +  '192.168.0.115' + ':' + '8090' + '/api/v1'
    }
  }

  getApiBasePath(): string {
    return this.serverUrl;
  }

  private checkSettingsFile() :boolean {
    console.log('rqmsettings checkSettingsFile');
    if (window.nw) {
      console.log("NW.js available, when checking settings file");
      if (window.nw.require('fs').existsSync(this.filePath)) {
        console.log("OpenRQM settings file available");
      } else {
        console.log("OpenRQM settings file not available, creating initial one.");
        this.rqmSettingsModel = new RQMSettingsModel("127.0.0.1", 8090);
        this.saveSettings();
      }
      return this.DEVELOPMENT_MODE_OFF;
    }
    return this.DEVELOPMENT_MODE_ON;
  }

  private loadSettings(): RQMSettingsModel {
    console.log('rqmsettings loadSettings');
    let jsonString: string;
    console.log("NW.js available when loading settings.");
    console.log(this.filePath);
    window.nw.require('fs').readFileSync(this.filePath, (err, data) => {
      if (err) throw err;
      jsonString = data;
    });
    let jsonObject: SettingsJsonObject = JSON.parse(jsonString);
    return new RQMSettingsModel(jsonObject.serverIpAddress, jsonObject.serverPort);
  }

  saveServerIpAddress(serverIpAddres: string) {
    console.log('rqmsettings saveServerIpAddress');
    this.rqmSettingsModel.serverIpAddress = serverIpAddres;
    this.saveSettings();
  }

  saveServerPort(serverPort: number) {
    console.log('rqmsettings saveServerPort');
    this.rqmSettingsModel.serverPort = serverPort;
    this.saveSettings();
  }

  saveSettings() {
    console.log('rqmsettings saveSettings');
    window.nw.require('fs').writeFileSync(this.filePath, JSON.stringify(this.rqmSettingsModel), function (err) {
      if (err) {
        console.info("There was an error attempting to save your data.");
        console.warn(err.message);
        return;
      } else {
        console.log("Saved settings");
      }
    });
  }

  static getFilePath(): string {
    console.log('rqmsettings getFilePath');
    if (window.nw) {
      return window.nw.require('path').join(window.nw.App.dataPath, RQMSettingsService.settingsFileName);
    } else {
      console.log("NW.js not available, falling back to development mode.");
      return "";
    }
  }
}