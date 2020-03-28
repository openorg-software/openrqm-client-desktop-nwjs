/*
openrqm-client-desktop-nwjs
RQMAssignUsers Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';


// Material Design
import { MatMenuTrigger } from '@angular/material'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { WorkspacesService, RQMWorkspaceUser } from 'openrqm-api'
import { RQMAddUserComponent } from '../rqmadd-user/rqmadd-user.component';

@Component({
  selector: 'app-rqmassign-users',
  templateUrl: './rqmassign-users.component.html',
  styleUrls: ['./rqmassign-users.component.css']
})
export class RQMAssignUsersComponent implements OnInit {

  @Input() workspaceId: number;

  displayedColumnsUsers: string[] = ['select', 'userId', 'permissions'];
  dataSourceUsers: MatTableDataSource<RQMWorkspaceUser>;
  selection = new SelectionModel<RQMWorkspaceUser>(true, []);

  initialized: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginatorUsers: MatPaginator;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private router: Router, private workspaceService: WorkspacesService) {

  }

  ngOnInit() {

    this.loadData();
  }

  loadData() {
    this.initialized = false;
    this.workspaceService.getUsersOfWorkspace(this.workspaceId).subscribe(
      usersOfWorkspace => {
        console.log(usersOfWorkspace);

        this.dataSourceUsers = new MatTableDataSource<RQMWorkspaceUser>(usersOfWorkspace);
        this.dataSourceUsers.paginator = this.paginatorUsers;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('get workspace done');
        this.initialized = true;
      }
    );
  }

  openDialog(component: any, dataValue?: any): any {
    return this.dialog.open(component, {
      width: '80vw',
      data: dataValue
    });
  }

  openAddUser() {
    const dialogRef = this.openDialog(RQMAddUserComponent,
      {
        workspaceId: this.workspaceId
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.loadData();
      }
      console.log('The dialog was closed');
    });
  }



  deleteUser() {
    let users: RQMWorkspaceUser[] = this.selection.selected;

    console.log(users);
    users.forEach((user) => {
      this.selection.deselect(user);
      this.workspaceService.deleteUserOfWorkspace(this.workspaceId, user.userId).subscribe(
        next => {
          console.log(next);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('get users of workspace done');
          this.loadData();
        }
      );
    });

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceUsers.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceUsers.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: RQMWorkspaceUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
}