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

@Component({
  selector: 'app-rqmworkspace-treeview-item-properties',
  templateUrl: './rqmworkspace-treeview-item-properties.component.html',
  styleUrls: ['./rqmworkspace-treeview-item-properties.component.css']
})
export class RQMWorkspaceTreeviewItemPropertiesComponent implements OnInit {

  // To update the workspace properties
  workspaceService: WorkspacesService;
  workspace: RQMWorkspace;
  // To fetch/update the document properties
  documentService: DocumentsService;
  document: RQMDocument;

  // Access the workspace variables
  @ViewChild('workspaceName', { static: false }) workspaceName;


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

  constructor(workspaceService: WorkspacesService, documentService: DocumentsService, public activeModal: NgbActiveModal) {
    this.workspaceService = workspaceService;
    this.documentService = documentService;
  }

  ngOnInit() {
    if (this.item.isDocument) {
      this.documentService.getDocument(this.item.value).subscribe(
        (doc) => {
          console.log(doc);
          this.document = doc;
          if(this.document.approverId == 0){
            this.document.approverId = null;
          }
          if(this.document.previousBaselineId == 0){
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
    workspace.name = this.workspaceName.nativeElement.value;
    workspace.id = this.workspace.id;
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
    this.passBack();
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
    this.passBack();
    window.location.reload();
  }

  passBack() {
    this.activeModal.close();
  }

}

