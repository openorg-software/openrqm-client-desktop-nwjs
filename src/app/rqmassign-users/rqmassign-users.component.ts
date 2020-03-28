/*
openrqm-client-desktop-nwjs
RQMAssignUsers Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rqmassign-users',
  templateUrl: './rqmassign-users.component.html',
  styleUrls: ['./rqmassign-users.component.css']
})
export class RQMAssignUsersComponent implements OnInit {


  displayedColumnsUsers: string[] = ['userId', 'permissions'];
  dataSourceUsers = new MatTableDataSource<RQMWorkspaceUser>(WorkspaceUsers);
  @ViewChild(MatPaginator, { static: true }) paginatorUsers: MatPaginator;

  constructor() { }

  ngOnInit() {

    this.dataSourceUsers.paginator = this.paginatorUsers;
  }

}


export interface RQMWorkspaceUser {
  workspaceId: number;
  userId: number;
  permissions: number;
}


const WorkspaceUsers: RQMWorkspaceUser[] = [
  { workspaceId: 5, userId: 1, permissions: 9 },
  { workspaceId: 5, userId: 2, permissions: 9 },
  { workspaceId: 5, userId: 3, permissions: 9 },
  { workspaceId: 5, userId: 4, permissions: 9 },
  { workspaceId: 5, userId: 5, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 1, userId: 7, permissions: 6 },
  { workspaceId: 2, userId: 8, permissions: 7 },
  { workspaceId: 3, userId: 9, permissions: 8 },
  { workspaceId: 4, userId: 10, permissions: 10 },
  { workspaceId: 5, userId: 11, permissions: 9 },
  { workspaceId: 5, userId: 12, permissions: 9 },
  { workspaceId: 5, userId: 13, permissions: 9 },
  { workspaceId: 5, userId: 14, permissions: 9 },
  { workspaceId: 5, userId: 15, permissions: 9 },
  { workspaceId: 5, userId: 16, permissions: 9 },
  { workspaceId: 5, userId: 17, permissions: 9 },
  { workspaceId: 5, userId: 18, permissions: 9 },
  { workspaceId: 5, userId: 19, permissions: 9 },
  { workspaceId: 5, userId: 20, permissions: 9 },
  { workspaceId: 5, userId: 21, permissions: 9 },
  { workspaceId: 5, userId: 22, permissions: 9 },
  { workspaceId: 5, userId: 23, permissions: 9 },
  { workspaceId: 5, userId: 24, permissions: 9 },
  { workspaceId: 5, userId: 25, permissions: 9 },
  { workspaceId: 5, userId: 26, permissions: 9 },
  { workspaceId: 5, userId: 27, permissions: 9 },
  { workspaceId: 5, userId: 28, permissions: 9 },
];
