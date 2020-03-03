/*
openrqm-client-desktop-nwjs
RQMDocumentTheme Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  @Input() reqColor: string = "";
  @Input() proColor: string = "";

  constructor(private themesService: ThemesService, private userService: RQMUserService, private settingsService: RQMSettingsService, private route: ActivatedRoute) {
    this.themesService.configuration.basePath = this.settingsService.getApiBasePath();
    this.themesService.configuration.apiKeys = {};
    this.themesService.configuration.apiKeys['token'] = this.userService.getToken();
  }

  ngOnInit() {
    this.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
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

  ngAfterViewInit() {
    this.requirementColor.nativeElement.value = this.reqColor;
    this.proseColor.nativeElement.value = this.proColor;
  }

  saveView() {
    this.requirementColorOutput.emit(this.requirementColor.nativeElement.value);
    this.proseColorOutput.emit(this.proseColor.nativeElement.value);
  }

}
