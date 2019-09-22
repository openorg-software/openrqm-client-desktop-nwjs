import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rqmsettings',
  templateUrl: './rqmsettings.component.html',
  styleUrls: ['./rqmsettings.component.scss']
})
export class RQMSettingsComponent implements OnInit {

  menuLabelSettings: string = "Settings";

  constructor() { }

  ngOnInit() {
  }

}
