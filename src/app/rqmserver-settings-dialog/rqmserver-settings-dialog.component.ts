import { Component, OnInit, ViewChild } from '@angular/core';
import { IxActiveModal } from '@siemens/ix-angular';
import { RQMSettingsService } from '../rqmsettings.service';
// To display application version
declare const require: (path: string) => { version: string };
const packageJson = require('../../../package.json');

@Component({
  standalone: false,
  selector: 'app-rqmserver-settings-dialog',
  templateUrl: './rqmserver-settings-dialog.component.html',
  styleUrls: ['./rqmserver-settings-dialog.component.css']
})
export class RQMServerSettingsDialogComponent implements OnInit {
    public version: string = packageJson.version;
    closeResult: string;

    @ViewChild('serverUrlInputField') serverUrlInputField;
    serverUrl: string = "";

    constructor(readonly activeModal: IxActiveModal, private rqmSettingsService: RQMSettingsService) {
        this.serverUrl = this.rqmSettingsService.rqmSettingsModel.serverUrl;
    }

    ngOnInit() {

    }

    ///Saves the currently set settings.
    saveSettings() {
        this.rqmSettingsService.rqmSettingsModel.serverUrl = this.serverUrlInputField.nativeElement.value;
        this.rqmSettingsService.saveSettings();
    }
}
