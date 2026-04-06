/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeviewItemProperties Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IxActiveModal, ToastService } from '@siemens/ix-angular';

import { WorkspacesService, RQMWorkspace, DocumentsService, RQMDocument, OpenAPI } from '../openrqm-api'
import { RQMWorkspaceTreeViewItem } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

@Component({
  standalone: false,
  selector: 'app-rqmworkspace-treeview-item-properties-dialog',
  templateUrl: './rqmworkspace-treeview-item-properties-dialog.component.html',
  styleUrls: ['./rqmworkspace-treeview-item-properties-dialog.component.css']
})
export class RQMWorkspaceTreeviewItemPropertiesDialogComponent implements OnInit {

  public item: RQMWorkspaceTreeViewItem;

  workspace: RQMWorkspace;
  // To fetch/update the document properties
  document: RQMDocument;

  // Access the workspace variables
  @ViewChild('workspaceName', { static: false }) workspaceName;
  @ViewChild('parentWorkspace', { static: false }) parentWorkspace;


  // Access the document variables
  @ViewChild('documentName', { static: false }) documentName;
  @ViewChild('workspaceId', { static: false }) workspaceId;
  @ViewChild('shortName', { static: false }) shortName;
  @ViewChild('description', { static: false }) description;
  @ViewChild('confidentiality', { static: false }) confidentiality;
  @ViewChild('authorId', { static: false }) authorId;
  @ViewChild('reviewerText', { static: false }) reviewerText;
  @ViewChild('approverId', { static: false }) approverId;
  @ViewChild('languageId', { static: false }) languageId;
  @ViewChild('externalIdentifier', { static: false }) externalIdentifier;

  constructor(readonly activeModal: IxActiveModal, private toastService: ToastService, private router: Router, private workspaceService: WorkspacesService, private documentsService: DocumentsService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
    if (this.activeModal.data.item != null) {
      this.item = this.activeModal.data.item;
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

        this.toastService.show({ message: 'Updated workspace ' + workspace.name + '.' });
        this.activeModal.close('updated');
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
    document.lastModifiedOn = new Date(5000).toISOString();
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

        this.toastService.show({ message: 'Updated document ' + document.name + '.' });
        this.activeModal.close('updated');
        this.router.navigate(['/workspace-tree']);
      }
    );
  }

}
