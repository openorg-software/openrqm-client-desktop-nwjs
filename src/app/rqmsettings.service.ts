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

  public rqmSettingsModel: RQMSettingsModel;

  static settingsFileName = 'openrqm-settings.json';

  filePath: string;

  constructor() {
    this.filePath = RQMSettingsService.getFilePath();
    this.checkSettingsFile();
    this.loadSettings().then(
      data => {
        this.rqmSettingsModel = data;
      }
    );
  }

  private checkSettingsFile() {
    if (window.nw) {
      console.log("NW.js available, when checking settings file");
      if (window.nw.require('fs').existsSync(this.filePath)) {
        console.log("OpenRQM settings file available");
      } else {
        console.log("OpenRQM settings file not available, creating initial one.");
        this.rqmSettingsModel = new RQMSettingsModel("127.0.0.1", 8090);
        this.saveSettings();
      }
    }
  }

  private async loadSettings(): Promise<RQMSettingsModel> {
    let jsonString: string;
    if (window.nw) {
      console.log("NW.js available when loading settings.");
      console.log(this.filePath);
      window.nw.require('fs').readFileSync(this.filePath, (err, data) => {
        if (err) throw err;
        jsonString = data;
        let jsonObject: SettingsJsonObject = JSON.parse(jsonString);
        return new RQMSettingsModel(jsonObject.serverIpAddress, jsonObject.serverPort);
      });
    } else {
      console.log("NW.js not available, falling back to development mode, server at 127.0.0.1:8090.");
      jsonString = "{\"serverIpAddress\":\"127.0.0.1\",\"serverPort\":8090}";
      let jsonObject: SettingsJsonObject = JSON.parse(jsonString);
      return new RQMSettingsModel(jsonObject.serverIpAddress, jsonObject.serverPort);
    }
  }

  saveServerIpAddress(serverIpAddres: string) {
    this.rqmSettingsModel.serverIpAddress = serverIpAddres;
    this.saveSettings();
  }

  saveServerPort(serverPort: number) {
    this.rqmSettingsModel.serverPort = serverPort;
    this.saveSettings();
  }

  getApiBasePath(): string {
    this.filePath = RQMSettingsService.getFilePath();
    this.checkSettingsFile();
    this.loadSettings()
    let serverIp: string = this.rqmSettingsModel.serverIpAddress;
    let serverPort: Number = this.rqmSettingsModel.serverPort;
    let path: string = 'http://' + serverIp + ':' + serverPort + '/api/v1';
    return path;
  }

  saveSettings() {
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
    if (window.nw) {
      return window.nw.require('path').join(window.nw.App.dataPath, RQMSettingsService.settingsFileName);
    } else {
      console.log("NW.js not available, falling back to development mode.");
      return "";
    }
  }
}