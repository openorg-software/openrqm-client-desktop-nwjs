import { Component, OnInit, ViewChild } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';
// To display application version
import { version } from '../../../package.json';

@Component({
    selector: 'app-rqmserver-settings-dialog',
    templateUrl: './rqmserver-settings-dialog.component.html',
    styleUrls: ['./rqmserver-settings-dialog.component.css']
})
export class RQMServerSettingsDialogComponent implements OnInit {
    public version: string = version;
    closeResult: string;

    @ViewChild('serverUrlInputField', { static: false }) serverUrlInputField;
    serverUrl: string = "";

    constructor(private rqmSettingsService: RQMSettingsService) {
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