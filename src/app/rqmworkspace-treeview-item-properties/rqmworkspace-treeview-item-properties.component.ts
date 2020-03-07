/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeviewItemProperties Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { WorkspacesService, RQMWorkspace, DocumentsService, RQMDocument } from 'openrqm-api'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RQMWorkspaceTreeViewItem } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

@Component({
  selector: 'app-rqmworkspace-treeview-item-properties',
  templateUrl: './rqmworkspace-treeview-item-properties.component.html',
  styleUrls: ['./rqmworkspace-treeview-item-properties.component.css']
})
export class RQMWorkspaceTreeviewItemPropertiesComponent implements OnInit {

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

  // The item we want to manipulate
  @Input() public item: RQMWorkspaceTreeViewItem;

  constructor(private workspaceService: WorkspacesService, private documentService: DocumentsService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    this.workspaceService.configuration.basePath = this.settingsService.getApiBasePath();
    this.workspaceService.configuration.apiKeys = {};
    this.workspaceService.configuration.apiKeys['token'] = this.userService.getToken();

    this.documentService.configuration.basePath = this.settingsService.getApiBasePath();
    this.documentService.configuration.apiKeys = {};
    this.documentService.configuration.apiKeys['token'] = this.userService.getToken();
  }

  ngOnInit() {
    if (this.item.isDocument) {
      this.documentService.getDocument(this.item.value).subscribe(
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
      }
    );
    window.location.reload();
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

    console.log(document);
    this.documentService.patchDocument(document).subscribe(
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
      }
    );
    window.location.reload();
  }

}

