/*
openrqm-client-desktop-nwjs
RQMSettings Service
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019-2020 Benjamin Schilling
*/

import { Injectable } from '@angular/core';
import { RQMSettingsModel } from './rqmsettings-model';
import { load, Store } from '@tauri-apps/plugin-store';

@Injectable({
  providedIn: 'root'
})
export class RQMSettingsService {

  static settingsFileName = 'openrqm-settings.json';

  public rqmSettingsModel: RQMSettingsModel = new RQMSettingsModel('http://127.0.0.1:8090');

  private store: Store | null = null;
  private storeReady: Promise<void>;

  constructor() {
    this.storeReady = this.initStore();
  }

  private async initStore(): Promise<void> {
    try {
      this.store = await load(RQMSettingsService.settingsFileName, {
        defaults: { serverUrl: this.rqmSettingsModel.serverUrl },
        autoSave: true
      });
      const serverUrl = await this.store.get<string>('serverUrl');
      if (serverUrl) {
        this.rqmSettingsModel.serverUrl = serverUrl;
      }
    } catch (e) {
      // Running in browser (ng serve) without Tauri — use in-memory defaults
      console.log('Tauri store not available, using in-memory settings:', e);
    }
  }

  getApiBasePath(): string {
    return this.rqmSettingsModel.serverUrl;
  }

  saveServerUrl(serverUrl: string): void {
    this.rqmSettingsModel.serverUrl = serverUrl;
    this.saveSettings();
  }

  saveSettings(): void {
    if (!this.store) {
      console.log('Tauri store not available — settings not persisted.');
      return;
    }
    this.store.set('serverUrl', this.rqmSettingsModel.serverUrl).catch(err => {
      console.warn('Failed to save settings:', err);
    });
  }
}
