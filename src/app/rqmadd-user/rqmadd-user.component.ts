/*
openrqm-client-desktop-nwjs
RQMAddUser Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WorkspacesService, RQMWorkspaceUser, RQMUser, UserManagementService } from 'openrqm-api'

@Component({
  selector: 'app-rqmadd-user',
  templateUrl: './rqmadd-user.component.html',
  styleUrls: ['./rqmadd-user.component.css']
})
export class RQMAddUserComponent implements OnInit {

  userIds: number[];
  userInfos: RQMUser[];
  selectedUser: RQMUser;

  @ViewChild('userId') userId: { nativeElement: { value: number; }; };
  @ViewChild('permissions') permissions: { nativeElement: { value: number; }; };

  constructor(private dialogRef: MatDialogRef<RQMAddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private workspaceService: WorkspacesService, private userManagementServce: UserManagementService) {

  }

  ngOnInit() {
    // fetch all user ids
    this.userManagementServce.getUsers().subscribe(
      next => {
        console.log('next');
        console.log(next);
        this.userIds = next;
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add user to workspace done');
        // look-up user infos for all ids
        this.userInfos = new Array();
        this.userIds.forEach((uid) => {
          this.userManagementServce.getInfo(uid).subscribe(
            next => {
              console.log('next');
              console.log(next);
              this.userInfos.push(next);
            },
            err => {
              console.log('err');
              console.log(err);
            },
            () => {
              console.log('add user to workspace done');
            });
        });
      }
    );
  }

  addUser() {
    let user = {} as RQMWorkspaceUser;

    user.userId = this.selectedUser.id;
    user.permissions = this.permissions.nativeElement.value;

    this.workspaceService.addUserToWorkspace(this.data.workspaceId, user).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add user to workspace done');
        this.dialogRef.close('success');
      }
    );
  }

}
