import { Component, OnInit, ViewChild } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
    selector: 'app-rqmserver-settings-dialog',
    templateUrl: './rqmserver-settings-dialog.component.html',
    styleUrls: ['./rqmserver-settings-dialog.component.css']
})
export class RQMServerSettingsDialogComponent implements OnInit {
    public version: string = "0.0.1";
    closeResult: string;

    @ViewChild('serverUrlInputField') serverUrlInputField;
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