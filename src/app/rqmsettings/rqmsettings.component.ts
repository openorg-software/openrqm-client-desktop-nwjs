import { Component, OnInit } from '@angular/core';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmsettings',
  templateUrl: './rqmsettings.component.html',
  styleUrls: ['./rqmsettings.component.css']
})
export class RQMSettingsComponent implements OnInit {

  rqmSettingsService: RQMSettingsService

  constructor(rqmSettingsService: RQMSettingsService) {
    this.rqmSettingsService = rqmSettingsService;
  }

  ngOnInit() {
  }

  saveSettings() {
    this.rqmSettingsService.saveSettings();
  }

}
