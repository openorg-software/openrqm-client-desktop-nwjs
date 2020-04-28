/*
openrqm-client-desktop-nwjs
RQMSettings Service
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019-2020 Benjamin Schilling
*/

import { Injectable } from '@angular/core';
import { RQMSettingsModel } from './rqmsettings-model'

@Injectable({
  providedIn: 'root'
})
export class RQMSettingsService {

  private DEVELOPMENT_MODE_ON: boolean = true;
  private DEVELOPMENT_MODE_OFF: boolean = false;
  public developmentMode: boolean = false;

  public rqmSettingsModel: RQMSettingsModel = new RQMSettingsModel("");
  static settingsFileName = "openrqm-settings.json";
  private filePath: string = "";

  constructor() {
    this.filePath = RQMSettingsService.getFilePath();
    this.developmentMode = this.checkSettingsFile();
    if (this.developmentMode == this.DEVELOPMENT_MODE_ON) {
      this.rqmSettingsModel.serverUrl = "http://127.0.0.1:8090";
    }
  }

  getApiBasePath(): string {
    if (this.developmentMode == this.DEVELOPMENT_MODE_OFF) {
      this.rqmSettingsModel = this.loadSettings();
      return this.rqmSettingsModel.serverUrl;
    } else {
      console.log("NW.js not available, falling back to development mode, server at " + this.rqmSettingsModel.serverUrl);
      return this.rqmSettingsModel.serverUrl;
    }
  }

  private checkSettingsFile(): boolean {
    if (window.nw) {
      console.log("NW.js available, when checking settings file");
      if (window.nw.require('fs').existsSync(this.filePath)) {
        console.log("OpenRQM settings file available");
      } else {
        console.log("OpenRQM settings file not available, creating initial one.");
        this.rqmSettingsModel = new RQMSettingsModel("http://127.0.0.1:8090");
        this.saveSettings();
      }
      return this.DEVELOPMENT_MODE_OFF;
    }
    return this.DEVELOPMENT_MODE_ON;
  }

  private loadSettings(): RQMSettingsModel {
    let jsonString: string = window.nw.require('fs').readFileSync(this.filePath, (err, data) => {
      if (err) throw err;
      jsonString = data;

      console.log(jsonString);
    });
    console.log(jsonString);
    let jsonObject: RQMSettingsModel = JSON.parse(jsonString);
    return jsonObject;
  }

  saveServerUrl(serverUrl: string) {
    this.rqmSettingsModel.serverUrl = serverUrl;
    this.saveSettings();
  }

  saveSettings() {
    if (this.developmentMode == this.DEVELOPMENT_MODE_OFF) {
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