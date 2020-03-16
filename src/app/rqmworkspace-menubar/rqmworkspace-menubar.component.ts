/*
openrqm-client-desktop-nwjs
RQMWorkspaceMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { UserManagementService } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { RQMUserSettingsDialogComponent } from '../rqmuser-settings-dialog/rqmuser-settings-dialog.component';
import { RQMServerSettingsDialogComponent } from '../rqmserver-settings-dialog/rqmserver-settings-dialog.component';
import { RQMAddWorkspaceComponent } from '../rqmadd-workspace/rqmadd-workspace.component';

@Component({
  selector: 'app-rqmworkspace-menubar',
  templateUrl: './rqmworkspace-menubar.component.html',
  styleUrls: ['./rqmworkspace-menubar.component.css']
})
export class RQMWorkspaceMenubarComponent implements OnInit {

  navbarOpen = false;

  closeResult: string;

  constructor(public dialog: MatDialog, private userManagementService: UserManagementService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    this.userManagementService.configuration.basePath = this.settingsService.getApiBasePath();
    this.userManagementService.configuration.apiKeys = {};
    this.userManagementService.configuration.apiKeys['token'] = this.userService.getToken();
  }

  ngOnInit() {
  }

  openDialog(component: any, dataValue?: any): any {
    return this.dialog.open(component, {
      width: '80vw',
      data: dataValue
    });
  }

  openDialogNewWorkspace() {
    const dialogRef = this.openDialog(RQMAddWorkspaceComponent,
      {
        parentId: null,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogServerSettings() {
    const dialogRef = this.openDialog(RQMServerSettingsDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogUserSettings() {
    const dialogRef = this.openDialog(RQMUserSettingsDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.userManagementService.logout(0);
  }

}
