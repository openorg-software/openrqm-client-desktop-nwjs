/*
openrqm-client-desktop-nwjs
RQMDocumentTheme Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

import { ThemesService, RQMTheme } from 'openrqm-api'

@Component({
  selector: 'app-rqmdocument-theme',
  templateUrl: './rqmdocument-theme.component.html',
  styleUrls: ['./rqmdocument-theme.component.css']
})
export class RQMDocumentThemeComponent implements OnInit {

  private documentId: number = -1;
  private themes: RQMTheme[];

  @Output() requirementColorOutput = new EventEmitter<string>();
  @Output() proseColorOutput = new EventEmitter<string>();

  @ViewChild('requirementColor', { static: false }) requirementColor: { nativeElement: { value: string; }; };
  @ViewChild('proseColor', { static: false }) proseColor: { nativeElement: { value: string; }; };

  public reqColor: string = "";
  public proColor: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private themesService: ThemesService, private userService: RQMUserService, private settingsService: RQMSettingsService, private route: ActivatedRoute) {
    this.themesService.configuration.basePath = this.settingsService.getApiBasePath();
    this.themesService.configuration.apiKeys = {};
    this.themesService.configuration.apiKeys['token'] = this.userService.getToken();
    this.proColor = data.proseColor;
    this.reqColor = data.reqColor;
    this.documentId = data.documentId;
  }

  ngOnInit() {
    this.themesService.getThemes(this.documentId).subscribe(
      themes => {
        console.log(themes);
        this.themes = themes;
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }

  saveTheme() {
    this.requirementColorOutput.emit(this.requirementColor.nativeElement.value);
    this.proseColorOutput.emit(this.proseColor.nativeElement.value);
  }

}
