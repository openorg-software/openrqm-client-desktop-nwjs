/*
openrqm-client-desktop-nwjs
RQMWorkspaceMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';

import { ModalService } from '@siemens/ix-angular';

import { UserManagementService, OpenAPI } from '../openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { RQMUserSettingsDialogComponent } from '../rqmuser-settings-dialog/rqmuser-settings-dialog.component';
import { RQMServerSettingsDialogComponent } from '../rqmserver-settings-dialog/rqmserver-settings-dialog.component';
import { RQMAddWorkspaceComponent } from '../rqmadd-workspace/rqmadd-workspace.component';
import { RQMManageAccessGroupsComponent } from '../rqmmanage-access-groups/rqmmanage-access-groups.component';

@Component({
  standalone: false,
  selector: 'app-rqmworkspace-menubar',
  templateUrl: './rqmworkspace-menubar.component.html',
  styleUrls: ['./rqmworkspace-menubar.component.css']
})
export class RQMWorkspaceMenubarComponent implements OnInit {

  navbarOpen = false;

  closeResult: string;

  constructor(private modalService: ModalService, private userManagementService: UserManagementService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
  }

  ngOnInit() {
  }

  async openDialogNewWorkspace() {
    const instance = await this.modalService.open({
      content: RQMAddWorkspaceComponent,
      data: { parentId: null }
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }

  async openDialogManageAccessGroups() {
    const instance = await this.modalService.open({
      content: RQMManageAccessGroupsComponent,
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

  logout() {
    this.userManagementService.logout(0);
  }

}
