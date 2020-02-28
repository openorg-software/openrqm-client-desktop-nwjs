/*
openrqm-client-desktop-nwjs
RQMAddWorkspace Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { WorkspacesService, RQMWorkspace } from 'openrqm-api'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RQMSettingsService } from '../rqmsettings.service';


@Component({
  selector: 'app-rqmadd-workspace',
  templateUrl: './rqmadd-workspace.component.html',
  styleUrls: ['./rqmadd-workspace.component.css']
})
export class RQMAddWorkspaceComponent implements OnInit {

  @ViewChild('workspaceName', { static: false }) workspaceName: { nativeElement: { value: string; }; };
  @Input() public parentId: number = -1;
  parentName: string = "";

  constructor(private workspaceService: WorkspacesService, private settingsService: RQMSettingsService) {
    this.workspaceService.configuration.basePath = this.settingsService.getApiBasePath();
  }

  ngOnInit() {
    if(this.parentId != null){
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
      }
    );
    //window.location.reload();
  }
}
