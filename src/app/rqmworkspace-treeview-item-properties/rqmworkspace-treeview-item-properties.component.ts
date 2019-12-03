/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeviewItemProperties Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { WorkspaceService, RQMWorkspace, DocumentService, RQMDocument } from 'openrqm-api'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RQMWorkspaceTreeViewItem } from '../rqmworkspace-tree/rqmworkspacetreeview-item';

@Component({
  selector: 'app-rqmworkspace-treeview-item-properties',
  templateUrl: './rqmworkspace-treeview-item-properties.component.html',
  styleUrls: ['./rqmworkspace-treeview-item-properties.component.css']
})
export class RQMWorkspaceTreeviewItemPropertiesComponent implements OnInit {

  // To update the workspace properties
  workspaceService: WorkspaceService;
  workspace: RQMWorkspace;
  // To fetch/update the document properties
  documentService: DocumentService;
  document: RQMDocument;

  // Access the workspace variables
  @ViewChild('workspaceName', { static: false }) workspaceName;

  // Access the document variables
  @ViewChild('documentName', { static: false }) documentName;
  @ViewChild('parentId', { static: false }) parentId;
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

  constructor(workspaceService: WorkspaceService, documentService: DocumentService, public activeModal: NgbActiveModal) {
    this.workspaceService = workspaceService;
    this.documentService = documentService;
  }

  ngOnInit() {
    if (this.item.isDocument) {
      this.documentService.getDocument(this.item.value).subscribe(
        (doc) => {
          console.log(doc);
          this.document = doc;
          this.parentId.nativeElement.value = this.document.workspaceId;
          this.documentName.nativeElement.value = this.document.externalIdentifier;
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
    }
  }


  updateWorkspace() {
    let workspace = {} as RQMWorkspace;
    workspace.name = this.workspaceName.nativeElement.value;
    workspace.id = 0;
    //workspace.workspaceId = this.parentId;
    workspace.workspaces = null;
    workspace.documents = null;
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
    document.id = 0;
    document.workspaceId = this.parentId.documentName.externalIdentifier.value;
    document.internalIdentifier = 0;
    document.externalIdentifier = this.documentName.externalIdentifier.value;
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

