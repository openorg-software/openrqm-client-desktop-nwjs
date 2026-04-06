/*
openrqm-client-desktop-nwjs
RQMDocumentMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '@siemens/ix-angular';


import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';


import { UserManagementService, OpenAPI } from '../openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { RQMUserSettingsDialogComponent } from '../rqmuser-settings-dialog/rqmuser-settings-dialog.component';
import { RQMServerSettingsDialogComponent } from '../rqmserver-settings-dialog/rqmserver-settings-dialog.component';
import { RQMAddWorkspaceComponent } from '../rqmadd-workspace/rqmadd-workspace.component';
import { RQMDocumentExporterComponent } from '../rqmdocument-exporter/rqmdocument-exporter.component';
import { RQMDocumentThemeComponent } from '../rqmdocument-theme/rqmdocument-theme.component';

@Component({
  standalone: false,
  selector: 'app-rqmdocument-menubar',
  templateUrl: './rqmdocument-menubar.component.html',
  styleUrls: ['./rqmdocument-menubar.component.css']
})
export class RQMDocumentMenubarComponent implements OnInit {
  navbarOpen = false;
  closeResult: string;
  documentId: number;

  faCaret = faCaretLeft;
  typePdf: string = "pdf";
  typeMarkdown: string = "markdown";

  @ViewChild('exportModal') exportModal: any;
  linkingInProgress: boolean = false;
  @Output() doLinking = new EventEmitter<boolean>();

  @Output() requirementColorChange = new EventEmitter<string>();
  @Output() proseColorChange = new EventEmitter<string>();
  @Input() requirementColor: string = "";
  @Input() proseColor: string = "";

  constructor(private modalService: ModalService, private route: ActivatedRoute, private userManagementService: UserManagementService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
    console.log("constr req color" + this.requirementColor);
  }

  ngOnInit() {
    this.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("onInit req color" + this.requirementColor);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  startLinking() {
    this.linkingInProgress = true;
    this.doLinking.emit(true);
  }
  stopLinking() {
    this.linkingInProgress = false;
    this.doLinking.emit(false);
  }

  onRequirementColorChange(color: string) {
    this.requirementColor = color;
    this.requirementColorChange.emit(color);
  }

  onProseColorChange(color: string) {
    this.proseColor = color;
    this.proseColorChange.emit(color);
  }


  logout() {
    this.userManagementService.logout(0);
  }


  async openDialogExportModalPDF() {
    const instance = await this.modalService.open({
      content: RQMDocumentExporterComponent,
      data: { documentId: this.documentId, type: "pdf" }
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }

  async openDialogExportModalMarkdown() {
    const instance = await this.modalService.open({
      content: RQMDocumentExporterComponent,
      data: { documentId: this.documentId, type: "markdown" }
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }

  async openDialogExportModalRaw() {
    const instance = await this.modalService.open({
      content: RQMDocumentExporterComponent,
      data: { documentId: this.documentId, type: "raw" }
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }


  async openDialogDocumentTheme() {
    const instance = await this.modalService.open({
      content: RQMDocumentThemeComponent,
      data: {
        documentId: this.documentId,
        proseColor: this.proseColor,
        reqColor: this.requirementColor
      }
    });

    instance.htmlElement.addEventListener('requirementColorOutput', (event: CustomEvent) => {
      this.onRequirementColorChange(event.detail);
    });
    instance.htmlElement.addEventListener('proseColorOutput', (event: CustomEvent) => {
      this.onProseColorChange(event.detail);
    });

    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }


  async openDialogNewWorkspace() {
    const instance = await this.modalService.open({
      content: RQMAddWorkspaceComponent,
      data: {}
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }

  async openDialogServerSettings() {
    const instance = await this.modalService.open({
      content: RQMServerSettingsDialogComponent,
      data: {}
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }

  async openDialogUserSettings() {
    const instance = await this.modalService.open({
      content: RQMUserSettingsDialogComponent,
      data: {}
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }
}
