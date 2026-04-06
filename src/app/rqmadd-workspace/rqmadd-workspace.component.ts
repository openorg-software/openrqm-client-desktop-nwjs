/*
openrqm-client-desktop-nwjs
RQMAddWorkspace Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IxActiveModal, ToastService } from '@siemens/ix-angular';

import { WorkspacesService, RQMWorkspace, OpenAPI } from '../openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';


@Component({
  standalone: false,
  selector: 'app-rqmadd-workspace',
  templateUrl: './rqmadd-workspace.component.html',
  styleUrls: ['./rqmadd-workspace.component.css']
})
export class RQMAddWorkspaceComponent implements OnInit {

  @ViewChild('workspaceName') workspaceName: { nativeElement: { value: string; }; };
  private parentId: number = -1;
  parentName: string = "";

  constructor(readonly activeModal: IxActiveModal, private toastService: ToastService, private router: Router, private workspaceService: WorkspacesService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
    const data = this.activeModal.data;
    this.parentId = data.parentId;
  }

  ngOnInit() {
    if (this.parentId != -1 && this.parentId != null) {
      this.workspaceService.getWorkspace(this.parentId).subscribe(
        workspace => {
          console.log(workspace);
          this.parentName = workspace.name;
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('get workspace done');
        }
      );
    } else {
      this.parentId = null;
      this.parentName = "Root";
    }
  }

  addWorkspace() {
    let workspace = {} as RQMWorkspace;
    workspace.name = this.workspaceName.nativeElement.value;
    workspace.id = 0;
    workspace.workspaceId = this.parentId;
    workspace.workspaces = null;
    workspace.documents = null;
    this.workspaceService.postWorkspace(workspace).subscribe(
      next => {
        console.log(next);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('add workspace done');
        this.router.navigate(['/workspace-tree']);
        this.toastService.show({ message: "Added workspace " + workspace.name + "." });
      }
    );
  }
}
