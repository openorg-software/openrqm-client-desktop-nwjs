/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeviewItemProperties Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WorkspacesService, RQMWorkspace, DocumentsService, RQMDocument } from 'openrqm-api'
import { RQMWorkspaceTreeViewItem } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

@Component({
  selector: 'app-rqmworkspace-treeview-item-properties-dialog',
  templateUrl: './rqmworkspace-treeview-item-properties-dialog.component.html',
  styleUrls: ['./rqmworkspace-treeview-item-properties-dialog.component.css']
})
export class RQMWorkspaceTreeviewItemPropertiesDialogComponent implements OnInit {

  private item: RQMWorkspaceTreeViewItem;

  workspace: RQMWorkspace;
  // To fetch/update the document properties
  document: RQMDocument;

  // Access the workspace variables
  @ViewChild('workspaceName') workspaceName;
  @ViewChild('parentWorkspace') parentWorkspace;


  // Access the document variables
  @ViewChild('documentName') documentName;
  @ViewChild('workspaceId') workspaceId;
  @ViewChild('shortName') shortName;
  @ViewChild('description') description;
  @ViewChild('confidentiality') confidentiality;
  @ViewChild('authorId') authorId;
  @ViewChild('reviewerText') reviewerText;
  @ViewChild('approverId') approverId;
  @ViewChild('languageId') languageId;
  @ViewChild('externalIdentifier') externalIdentifier;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private router: Router, private workspaceService: WorkspacesService, private documentsService: DocumentsService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
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
    if (this.item.isItemDocument()) {
      this.documentsService.getDocument(this.item.value).subscribe(
        (doc) => {
          console.log(doc);
          this.document = doc;
          if (this.document.approverId == 0) {
            this.document.approverId = null;
          }
          if (this.document.previousBaselineId == 0) {
            this.document.previousBaselineId = null;
          }
          this.workspaceId.nativeElement.value = this.document.workspaceId;
          this.externalIdentifier.nativeElement.value = this.document.externalIdentifier;
          this.documentName.nativeElement.value = this.document.name;
          this.shortName.nativeElement.value = this.document.shortName;
          this.description.nativeElement.value = this.document.description;
          this.confidentiality.nativeElement.value = this.document.confidentiality;
          this.authorId.nativeElement.value = this.document.authorId;
          this.reviewerText.nativeElement.value = this.document.reviewerText;
          this.approverId.nativeElement.value = this.document.approverId;
          this.languageId.nativeElement.value = this.document.languageId;
        },
        err => {
          console.log('err');
          console.log(err);
        },
        () => {
          console.log('getting document done');
        }
      );
    } else {
      this.workspaceService.getWorkspace(this.item.value).subscribe(
        (workspace) => {
          console.log(workspace);
          this.workspace = workspace;
          this.workspaceName.nativeElement.value = this.workspace.name;
          this.parentWorkspace.nativeElement.value = this.workspace.workspaceId;
        },
        err => {
          console.log('err');
          console.log(err);
        },
        () => {
          console.log('getting workspace done');
        }
      );
    }
  }


  updateWorkspace() {
    let workspace = {} as RQMWorkspace;
    workspace.id = this.workspace.id;
    workspace.name = this.workspaceName.nativeElement.value;
    workspace.workspaceId = this.parentWorkspace.nativeElement.value;
    workspace.workspaces = this.workspace.workspaces;
    workspace.documents = this.workspace.documents;
    this.workspaceService.patchWorkspace(workspace).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('patching workspace done');

        this.openSnackBar("Updated workspace " + workspace.name + ".");
        this.router.navigate(['/workspace-tree']);
      }
    );
  }

  updateDocument() {
    let document = {} as RQMDocument;
    document.id = this.document.id;
    document.workspaceId = this.workspaceId.nativeElement.value;
    document.internalIdentifier = 0;
    document.externalIdentifier = this.externalIdentifier.nativeElement.value;
    document.name = this.documentName.nativeElement.value;
    document.shortName = this.shortName.nativeElement.value;
    document.description = this.description.nativeElement.value;
    document.confidentiality = this.confidentiality.nativeElement.value;
    document.authorId = this.authorId.nativeElement.value;
    document.reviewerText = this.reviewerText.nativeElement.value;
    document.approverId = this.approverId.nativeElement.value;
    document.languageId = this.languageId.nativeElement.value;
    document.lastModifiedById = 0;
    document.lastModifiedOn = new Date(5000);
    document.baselineMajor = 0;
    document.baselineMinor = 0;
    document.baselineReview = 0;
    document.previousBaselineId = null;

    this.documentsService.patchDocument(document).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('patching document done');

        this.openSnackBar("Updated document " + document.name + ".");
        this.router.navigate(['/workspace-tree']);
      }
    );
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

}

