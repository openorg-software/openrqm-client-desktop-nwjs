/*
openrqm-client-desktop-nwjs
RQMDocumentTheme Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IxActiveModal } from '@siemens/ix-angular';

import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

import { ThemesService, RQMTheme, OpenAPI } from '../openrqm-api'

@Component({
  standalone: false,
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

  constructor(readonly activeModal: IxActiveModal, private themesService: ThemesService, private userService: RQMUserService, private settingsService: RQMSettingsService, private route: ActivatedRoute) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
    this.proColor = this.activeModal.data.proseColor;
    this.reqColor = this.activeModal.data.reqColor;
    this.documentId = this.activeModal.data.documentId;
  }

  ngOnInit() {
    this.themesService.getThemesOfDocument(this.documentId).subscribe(
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
