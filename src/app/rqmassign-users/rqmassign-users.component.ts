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
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 1, userId: 1, permissions: 6 },
  { workspaceId: 2, userId: 3, permissions: 7 },
  { workspaceId: 3, userId: 4, permissions: 8 },
  { workspaceId: 4, userId: 5, permissions: 10 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
  { workspaceId: 5, userId: 6, permissions: 9 },
];
