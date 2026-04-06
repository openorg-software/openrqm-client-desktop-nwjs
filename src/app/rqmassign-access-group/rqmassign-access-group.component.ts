/*
openrqm-client-desktop-nwjs
RQMAssignAccessGroup Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-rqmassign-access-group',
  templateUrl: './rqmassign-access-group.component.html',
  styleUrls: ['./rqmassign-access-group.component.css']
})
export class RQMAssignAccessGroupComponent implements OnInit {

  @Input() workspaceId: number;

  allData: RQMWorkspaceAccessGroup[] = WorkspaceAccessGroups;
  pagedData: RQMWorkspaceAccessGroup[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor() { }

  ngOnInit() {
    this.updatePage();
  }

  updatePage() {
    this.totalPages = Math.max(1, Math.ceil(this.allData.length / this.pageSize));
    if (this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages - 1;
    }
    const start = this.currentPage * this.pageSize;
    this.pagedData = this.allData.slice(start, start + this.pageSize);
  }

}


export interface RQMWorkspaceAccessGroup {
  workspaceId: number;
  accessGroupId: number;
  permissions: number;
}

const WorkspaceAccessGroups: RQMWorkspaceAccessGroup[] = [
  { workspaceId: 1, accessGroupId: 1, permissions: 6 },
  { workspaceId: 2, accessGroupId: 3, permissions: 7 },
  { workspaceId: 3, accessGroupId: 4, permissions: 8 },
  { workspaceId: 4, accessGroupId: 5, permissions: 10 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
  { workspaceId: 5, accessGroupId: 6, permissions: 9 },
];
