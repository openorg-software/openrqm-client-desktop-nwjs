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

  public rqmSettingsModel: RQMSettingsModel = new RQMSettingsModel("", -1);
  static settingsFileName = 'openrqm-settings.json';
  filePath: string;
  serverUrl: string = '';

  constructor(){
    this.filePath = RQMSettingsService.getFilePath();
    this.developmentMode = this.checkSettingsFile();
    if(this.developmentMode == this.DEVELOPMENT_MODE_ON){
      this.rqmSettingsModel.serverIpAddress = "192.168.0.110";
      this.rqmSettingsModel.serverPort = 8090;
    }
  }

  getApiBasePath(): string {
    if(this.developmentMode == this.DEVELOPMENT_MODE_OFF){
      this.rqmSettingsModel = this.loadSettings();
      return 'http://' + this.rqmSettingsModel.serverIpAddress + ':' + this.rqmSettingsModel.serverPort + '/api/v1';
    } else {
        console.log("NW.js not available, falling back to development mode, server at " + this.rqmSettingsModel.serverIpAddress + " with port " + this.rqmSettingsModel.serverPort);
        return 'http://' +  this.rqmSettingsModel.serverIpAddress + ':' + this.rqmSettingsModel.serverPort + '/api/v1';
    }
  }

  private checkSettingsFile(): boolean {
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
    let jsonString: string;
    window.nw.require('fs').readFileSync(this.filePath, (err, data) => {
      if (err) throw err;
      jsonString = data;
    });
    let jsonObject: SettingsJsonObject = JSON.parse(jsonString);
    return new RQMSettingsModel(jsonObject.serverIpAddress, jsonObject.serverPort);
  }

  saveServerIpAddress(serverIpAddres: string) {
    this.rqmSettingsModel.serverIpAddress = serverIpAddres;
    this.saveSettings();
  }

  saveServerPort(serverPort: number) {
    this.rqmSettingsModel.serverPort = serverPort;
    this.saveSettings();
  }

  saveSettings() {
    if(this.developmentMode == this.DEVELOPMENT_MODE_OFF){
      window.nw.require('fs').writeFileSync(this.filePath, JSON.stringify(this.rqmSettingsModel), function (err) {
        if (err) {
          console.info("There was an error attempting to save your data.");
          console.warn(err.message);
          return;
        } else {
          console.log("Saved settings");
        }
      });
    } else {
    console.log('save settings while development mode is on');
    }
    
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