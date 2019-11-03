/*
openrqm-client-desktop-nwjs
RQMAddWorkspace Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';

import { WorkspaceService, RQMWorkspace } from 'openrqm-api'

@Component({
  selector: 'app-rqmadd-workspace',
  templateUrl: './rqmadd-workspace.component.html',
  styleUrls: ['./rqmadd-workspace.component.css']
})
export class RQMAddWorkspaceComponent implements OnInit {

  workspaceService: WorkspaceService;

  @ViewChild('workspaceName', { static: false }) workspaceName;
  @ViewChild('workspaceId', { static: false }) workspaceId;

  constructor(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  ngOnInit() {
  }

  addWorkspace() {
    let workspace = {} as RQMWorkspace;
    workspace.name = this.workspaceName.nativeElement.value;
    workspace.id = 0;
    console.log(this.workspaceId.nativeElement.value);
    console.log(parseInt(this.workspaceId.nativeElement.value));
    workspace.workspaceId = parseInt(this.workspaceId.nativeElement.value);
    workspace.workspaces = null;
    workspace.documents = null;
    this.workspaceService.postWorkspace(workspace).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add workspace done');
      }
    );
  }
}
