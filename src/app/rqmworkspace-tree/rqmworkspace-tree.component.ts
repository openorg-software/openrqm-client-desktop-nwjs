/*
openrqm-client-desktop-nwjs
RQMWorkspaceTree Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { WorkspacesService, RQMWorkspace } from 'openrqm-api';

import { RQMWorkspaceTreeViewItem } from './rqmworkspacetreeview-item';
import { RQMSettingsService } from '../rqmsettings.service';
@Component({
  selector: 'app-rqmworkspace-tree',
  templateUrl: './rqmworkspace-tree.component.html',
  styleUrls: ['./rqmworkspace-tree.component.css']
})
export class RQMWorkspaceTreeComponent implements OnInit {

  dropdownEnabled = true;
  items: RQMWorkspaceTreeViewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 1000
  });
  workspacesService: WorkspacesService;
  settingService: RQMSettingsService;

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];

  constructor(workspacesService: WorkspacesService, settingsService: RQMSettingsService
  ) {
    this.workspacesService = workspacesService;
    this.settingService = settingsService;
  }

  ngOnInit() {
    this.workspacesService.configuration.basePath = this.settingService.getApiBasePath();
    this.workspacesService.getWorkspaces().subscribe(
      (ws) => {
        console.log(ws);
        this.items = this.workspacesToTreeviewItems(ws);
      },
      err => {
        console.log(err);
      }
    );
  }

  workspacesToTreeviewItems(workspaces: RQMWorkspace[]): RQMWorkspaceTreeViewItem[] {
    let rootItems: RQMWorkspaceTreeViewItem[] = new Array();

    workspaces.forEach(ws => {
      if (ws.workspaceId == 0) {
        rootItems.push(new RQMWorkspaceTreeViewItem(ws.name, ws.id, true, RQMWorkspaceTreeComponent.resolveChildrenRecursively(ws), false
        ));
      }
    });

    console.log(rootItems);
    return rootItems;
  }

  static resolveChildrenRecursively(rqmWorkspace: RQMWorkspace): RQMWorkspaceTreeViewItem[] {
    let tvi: RQMWorkspaceTreeViewItem[] = new Array();
    let workspaces: RQMWorkspaceTreeViewItem[] = new Array();
    let documents: RQMWorkspaceTreeViewItem[] = new Array();

    workspaces = RQMWorkspaceTreeComponent.resolveWorkspacesRecursively(rqmWorkspace);
    tvi = tvi.concat(workspaces);
    tvi = tvi.concat(documents);
    return tvi;
  }

  static resolveWorkspacesRecursively(rqmWorkspace: RQMWorkspace): RQMWorkspaceTreeViewItem[] {
    let tvi: RQMWorkspaceTreeViewItem[] = new Array();
    rqmWorkspace.workspaces.forEach((ws) => {
      tvi.push(new RQMWorkspaceTreeViewItem(ws.name, ws.id, true, RQMWorkspaceTreeComponent.resolveWorkspacesRecursively(ws), false
      ));
    });
    rqmWorkspace.documents.forEach((doc) => {
      tvi.push(new RQMWorkspaceTreeViewItem(doc.name, doc.id, true, null, true, doc.internalIdentifier));
    });
    return tvi;
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }

}
