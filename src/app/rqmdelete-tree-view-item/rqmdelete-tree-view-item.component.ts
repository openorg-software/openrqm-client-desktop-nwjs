/*
openrqm-client-desktop-nwjs
RQMDeleteTreeViewItem Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// OpenRQM
import { RQMWorkspaceTreeViewItem, } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

// OpenRQM API
import { DocumentsService, WorkspacesService } from 'openrqm-api';

@Component({
  selector: 'app-rqmdelete-tree-view-item',
  templateUrl: './rqmdelete-tree-view-item.component.html',
  styleUrls: ['./rqmdelete-tree-view-item.component.css']
})
export class RQMDeleteTreeViewItemComponent implements OnInit {

  private item: RQMWorkspaceTreeViewItem;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private router: Router, private documentsService: DocumentsService, private workspaceService: WorkspacesService, private settingsService: RQMSettingsService, private userService: RQMUserService) {

    this.workspaceService.configuration.basePath = this.settingsService.getApiBasePath();
    this.workspaceService.configuration.apiKeys = {};
    this.workspaceService.configuration.apiKeys['token'] = this.userService.getToken();

    this.documentsService.configuration.basePath = this.settingsService.getApiBasePath();
    this.documentsService.configuration.apiKeys = {};
    this.documentsService.configuration.apiKeys['token'] = this.userService.getToken();

    if (data.item != null) {
      this.item = data.item;
    } else {
      console.log("Data.item is null");
    }
  }

  ngOnInit() {
  }


  // OpenRQM API Wrapper

  deleteWorkspace() {
    this.workspaceService.deleteWorkspace(this.item.value).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('delete workspace done');
        this.router.navigate(['/workspace-tree']);
        this.openSnackBar("Deleted workspace " + this.item.text + ".");
      }
    );
  }

  deleteDocument() {
    this.documentsService.deleteDocument(this.item.value).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('delete document done');
        this.router.navigate(['/workspace-tree']);
        this.openSnackBar("Deleted document " + this.item.text + ".");
      }
    );
  }

  openSnackBar(message: string) {
    let snackBarRef = this._snackBar.open(message, null, {
      duration: 2000,
    });
  }
}
