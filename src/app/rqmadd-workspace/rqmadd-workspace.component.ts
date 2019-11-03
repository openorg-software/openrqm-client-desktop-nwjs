/*
openrqm-client-desktop-nwjs
RQMAddWorkspace Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';

import { WorkspaceService } from 'openrqm-api'

@Component({
  selector: 'app-rqmadd-workspace',
  templateUrl: './rqmadd-workspace.component.html',
  styleUrls: ['./rqmadd-workspace.component.css']
})
export class RQMAddWorkspaceComponent implements OnInit {

  workspaceService: WorkspaceService;

  constructor(workspaceService: WorkspaceService) {
    this.workspaceService = workspaceService;
  }

  ngOnInit() {
  }

  addWorkspace() {
    //this.workspaceService.
  }
}
