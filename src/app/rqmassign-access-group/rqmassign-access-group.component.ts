/*
openrqm-client-desktop-nwjs
RQMAssignAccessGroup Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rqmassign-access-group',
  templateUrl: './rqmassign-access-group.component.html',
  styleUrls: ['./rqmassign-access-group.component.css']
})
export class RQMAssignAccessGroupComponent implements OnInit {

  displayedColumnsAccessGroups: string[] = ['accessGroupId', 'permissions'];
  dataSourceAccessGroups = new MatTableDataSource<RQMWorkspaceAccessGroup>(WorkspaceAccessGroups);
  @ViewChild(MatPaginator, { static: true }) paginatorAccessGroups: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.dataSourceAccessGroups.paginator = this.paginatorAccessGroups;
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
