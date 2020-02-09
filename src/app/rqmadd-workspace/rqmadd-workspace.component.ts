/*
openrqm-client-desktop-nwjs
RQMAddWorkspace Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { WorkspaceService, RQMWorkspace } from 'openrqm-api'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-rqmadd-workspace',
  templateUrl: './rqmadd-workspace.component.html',
  styleUrls: ['./rqmadd-workspace.component.css']
})
export class RQMAddWorkspaceComponent implements OnInit {

  workspaceService: WorkspaceService;

  @ViewChild('workspaceName', { static: false }) workspaceName;

  @Input() public parentId: any;

  constructor(workspaceService: WorkspaceService, public activeModal: NgbActiveModal) {
    this.workspaceService = workspaceService;
  }

  ngOnInit() {
    console.log(this.parentId);
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
    this.passBack();
    //window.location.reload();
  }

  passBack() {
    this.activeModal.close();
  }
}
