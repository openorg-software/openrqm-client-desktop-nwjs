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
import { RQMUserSettingsModalComponent } from '../rqmuser-settings-modal/rqmuser-settings-modal.component';
import { RQMServerSettingsModalComponent } from '../rqmserver-settings-modal/rqmserver-settings-modal.component';
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

  openDialogNewWorkspace() {
    const dialogRef = this.dialog.open(RQMAddWorkspaceComponent, {
      width: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogServerSettings() {
    const dialogRef = this.dialog.open(RQMServerSettingsModalComponent, {
      width: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openDialogUserSettings() {
    const dialogRef = this.dialog.open(RQMUserSettingsModalComponent, {
      width: '80vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.userManagementService.logout(0);
  }

}
