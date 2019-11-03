/*
openrqm-client-desktop-nwjs
RQMAddDocument Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';

import { DocumentService, RQMDocument } from 'openrqm-api'
@Component({
  selector: 'app-rqmadd-document',
  templateUrl: './rqmadd-document.component.html',
  styleUrls: ['./rqmadd-document.component.css']
})
export class RQMAddDocumentComponent implements OnInit {

  documentService: DocumentService;

  @ViewChild('documentName', { static: false }) documentName;
  @ViewChild('workspaceId', { static: false }) workspaceId;

  constructor(documentSerivce: DocumentService) {
    this.documentService = documentSerivce;
  }

  ngOnInit() {
  }

  addDocument() {
    let document = {} as RQMDocument;
    document.id = 0;
    document.workspaceId = parseInt(this.workspaceId.nativeElement.value);
    document.internalIdentifier = 0;
    document.externalIdentifier = "Test";
    document.name = this.documentName.nativeElement.value;
    document.shortName = "DOC";
    document.description = "Test Doc";
    document.confidentiality = "Restricted";
    document.authorId = 0;
    document.languageId = 1;
    document.approverId = null;
    document.reviewerText = "test reviewer text";
    document.lastModifiedById = 0;
    document.lastModifiedOn = new Date(5000);
    document.baselineMajor = 0;
    document.baselineMinor = 0;
    document.baselineReview = 0;
    document.previousBaselineId = null;


    this.documentService.postDocument(document).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add document done');
      }
    );
  }

}