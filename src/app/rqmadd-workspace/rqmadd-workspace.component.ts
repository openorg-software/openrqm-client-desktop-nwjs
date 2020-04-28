/*
openrqm-client-desktop-nwjs
RQMAddWorkspace Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WorkspacesService, RQMWorkspace } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';


@Component({
  selector: 'app-rqmadd-workspace',
  templateUrl: './rqmadd-workspace.component.html',
  styleUrls: ['./rqmadd-workspace.component.css']
})
export class RQMAddWorkspaceComponent implements OnInit {

  @ViewChild('workspaceName', { static: false }) workspaceName: { nativeElement: { value: string; }; };
  private parentId: number = -1;
  parentName: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private router: Router, private workspaceService: WorkspacesService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    this.workspaceService.configuration.basePath = this.settingsService.getApiBasePath();
    this.workspaceService.configuration.apiKeys = {};
    this.workspaceService.configuration.apiKeys['token'] = this.userService.getToken();
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
        this.openSnackBar("Added workspace " + workspace.name + ".");
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
