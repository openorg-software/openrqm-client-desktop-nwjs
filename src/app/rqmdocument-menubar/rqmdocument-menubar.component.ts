/*
openrqm-client-desktop-nwjs
RQMDocumentMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';


import { UserManagementService } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { RQMUserSettingsDialogComponent } from '../rqmuser-settings-dialog/rqmuser-settings-dialog.component';
import { RQMServerSettingsDialogComponent } from '../rqmserver-settings-dialog/rqmserver-settings-dialog.component';
import { RQMAddWorkspaceComponent } from '../rqmadd-workspace/rqmadd-workspace.component';
import { RQMDocumentExporterComponent } from '../rqmdocument-exporter/rqmdocument-exporter.component';
import { RQMDocumentThemeComponent } from '../rqmdocument-theme/rqmdocument-theme.component';

@Component({
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

  // For Linking
  @ViewChild('exportModal', { static: false }) exportModal: any;
  linkingInProgress: boolean = false;
  @Output() doLinking = new EventEmitter<boolean>();

  // For Theme
  @Output() requirementColorChange = new EventEmitter<string>();
  @Output() proseColorChange = new EventEmitter<string>();
  @Input() requirementColor: string = "";
  @Input() proseColor: string = "";

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private userManagementService: UserManagementService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    this.userManagementService.configuration.basePath = this.settingsService.getApiBasePath();
    this.userManagementService.configuration.apiKeys = {};
    this.userManagementService.configuration.apiKeys['token'] = this.userService.getToken();
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


  openDialog(component: any, dataValue?: any): any {
    return this.dialog.open(component, {
      width: '80vw',
      data: dataValue
    });
  }


  openDialogExportModalPDF() {
    const dialogRef = this.openDialog(RQMDocumentExporterComponent,
      {
        documentId: this.documentId,
        type: "pdf"
      }
    );
    dialogRef.componentInstance.documentId = this.documentId;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogExportModalMarkdown() {
    const dialogRef = this.openDialog(RQMDocumentExporterComponent,
      {
        documentId: this.documentId,
        type: "markdown"
      }
    );
    dialogRef.componentInstance.documentId = this.documentId;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogDocumentTheme() {
    const dialogRef = this.openDialog(RQMDocumentThemeComponent,
      {
        documentId: this.documentId,
        proseColor: this.proseColor,
        reqColor: this.requirementColor
      }
    );

    dialogRef.componentInstance.requirementColorOutput.subscribe(
      event => {
        this.onRequirementColorChange(event);
      }
    );
    dialogRef.componentInstance.proseColorOutput.subscribe(
      event => {
        this.onProseColorChange(event);
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  openDialogNewWorkspace() {
    const dialogRef = this.openDialog(RQMAddWorkspaceComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogServerSettings() {
    const dialogRef = this.openDialog(RQMServerSettingsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogUserSettings() {
    const dialogRef = this.openDialog(RQMUserSettingsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
