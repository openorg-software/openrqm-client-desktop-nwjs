/*
openrqm-client-desktop-nwjs
RQMSettings Service
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RQMSettingsService {

  mySettings = {
    "language": "en",
    "theme": "dark"
  };

  constructor() { }

  saveSettings() {
    var file = 'my-settings-file.json';
    var filePath = window.nw.require('path').join(window.nw.App.dataPath, file);
    window.nw.require('fs').writeFile(filePath, JSON.stringify(this.mySettings), function (err) {
      if (err) {
        console.info("There was an error attempting to save your data.");
        console.warn(err.message);
        return;
      } else {
        console.log("Saved settings");
      }
    });
  }







}
