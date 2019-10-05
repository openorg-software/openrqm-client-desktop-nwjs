/*
openrqm-client-desktop-nwjs
RQMWorkspaceTree Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { WorkspacesService, RQMWorkspaces, RQMWorkspace } from 'openrqm-api';

import { RQMTreeViewItem } from './rqmtreeview-item';

@Component({
  selector: 'app-rqmworkspace-tree',
  templateUrl: './rqmworkspace-tree.component.html',
  styleUrls: ['./rqmworkspace-tree.component.css']
})
export class RQMWorkspaceTreeComponent implements OnInit {

  dropdownEnabled = true;
  items: RQMTreeViewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: false,
    hasCollapseExpand: false,
    decoupleChildFromParent: false,
    maxHeight: 1000
  });
  workspaceService: WorkspacesService;

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

  constructor(workspaceService: WorkspacesService
  ) { this.workspaceService = workspaceService; }

  ngOnInit() {
    this.workspaceService.getWorkspaces().subscribe(
      (ws) => {
        console.log(ws);
        this.items = this.workspacesToTreeviewItems(ws);
      },
      err => {
        console.log(err);
      }
    );
  }

  workspacesToTreeviewItems(workspaces: RQMWorkspaces): RQMTreeViewItem[] {
    let rootItems: RQMTreeViewItem[] = new Array();

    workspaces.forEach(ws => {
      if (ws.workspaceId == 0) {
        rootItems.push(new RQMTreeViewItem(ws.name, ws.id, true, RQMWorkspaceTreeComponent.resolveChildrenRecursively(ws), false
        ));
      }
    });

    console.log(rootItems);
    return rootItems;
  }

  static resolveChildrenRecursively(rqmWorkspace: RQMWorkspace): RQMTreeViewItem[] {
    let tvi: RQMTreeViewItem[] = new Array();
    let workspaces: RQMTreeViewItem[] = new Array();
    let documents: RQMTreeViewItem[] = new Array();

    workspaces = RQMWorkspaceTreeComponent.resolveWorkspacesRecursively(rqmWorkspace);
    documents = RQMWorkspaceTreeComponent.resolveDocumentsRecursively(rqmWorkspace);
    tvi = tvi.concat(workspaces);
    tvi = tvi.concat(documents);
    return tvi;
  }

  static resolveWorkspacesRecursively(rqmWorkspace: RQMWorkspace): RQMTreeViewItem[] {
    let tvi: RQMTreeViewItem[] = new Array();
    rqmWorkspace.workspaces.forEach((ws) => {
      tvi.push(new RQMTreeViewItem(ws.name, ws.id, true, RQMWorkspaceTreeComponent.resolveWorkspacesRecursively(ws), false
      ));
    });
    return tvi;
  }

  static resolveDocumentsRecursively(rqmWorkspace: RQMWorkspace): RQMTreeViewItem[] {
    let tvi: RQMTreeViewItem[] = new Array();
    rqmWorkspace.documents.forEach((doc) => {
      tvi.push(new RQMTreeViewItem(doc.name, doc.id, true, null, true, doc.internalIdentifier));
    });
    return tvi;
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }

}
