/*
openrqm-client-desktop-nwjs
RQMAddDocument Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { WorkspacesService, RQMWorkspaceUser } from 'openrqm-api'

@Component({
  selector: 'app-rqmadd-user',
  templateUrl: './rqmadd-user.component.html',
  styleUrls: ['./rqmadd-user.component.css']
})
export class RQMAddUserComponent implements OnInit {


  @ViewChild('userId', { static: false }) userId: { nativeElement: { value: number; }; };
  @ViewChild('permissions', { static: false }) permissions: { nativeElement: { value: number; }; };

  constructor(private dialogRef: MatDialogRef<RQMAddUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private workspaceService: WorkspacesService) {


  }

  ngOnInit() {
  }

  addUser() {
    let user = {} as RQMWorkspaceUser;

    user.userId = this.userId.nativeElement.value;
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
      }
    );
    this.dialogRef.close('success');

  }

}
