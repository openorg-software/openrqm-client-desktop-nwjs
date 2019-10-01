/*
openrqm-client-desktop-nwjs
RQMWorkspaceTree Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { WorkspacesService, RQMWorkspaces } from 'openrqm-api';

@Component({
  selector: 'app-rqmworkspace-tree',
  templateUrl: './rqmworkspace-tree.component.html',
  styleUrls: ['./rqmworkspace-tree.component.css']
})
export class RQMWorkspaceTreeComponent implements OnInit {

  dropdownEnabled = true;
  items: TreeviewItem[];
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
      }
    );
  }

  workspacesToTreeviewItems(workspaces: RQMWorkspaces): TreeviewItem[] {
    let rootItems: TreeviewItem[] = new Array();

    workspaces.forEach(ws => {
      if (ws.workspaceId == 0) {
        rootItems.push(new TreeviewItem({
          text: ws.name, value: ws.id, collapsed: true,
        }));
      }
    });

    rootItems.forEach(ri => {
      let childrenItems: TreeviewItem[] = new Array();
      workspaces.forEach(ws => {
        if (ri.value == ws.workspaceId) {
          childrenItems.push(new TreeviewItem({
            text: ws.name, value: ws.id, collapsed: true
          }))
        }
      });
      ri.children = childrenItems;
    });
    console.log(rootItems);

    return rootItems;
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }

}
