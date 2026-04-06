/*
openrqm-client-desktop-nwjs
RQMAddDocument Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IxActiveModal, ToastService } from '@siemens/ix-angular';

import { DocumentsService, RQMDocument, OpenAPI } from '../openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

@Component({
  standalone: false,
  selector: 'app-rqmadd-document',
  templateUrl: './rqmadd-document.component.html',
  styleUrls: ['./rqmadd-document.component.css']
})
export class RQMAddDocumentComponent implements OnInit {

  @ViewChild('documentName') documentName: { nativeElement: { value: string; }; };
  @ViewChild('shortName') shortName: { nativeElement: { value: string; }; };
  @ViewChild('description') description: { nativeElement: { value: string; }; };
  @ViewChild('confidentiality') confidentiality: { nativeElement: { value: string; }; };
  @ViewChild('authorId') authorId: { nativeElement: { value: number; }; };
  @ViewChild('reviewerText') reviewerText: { nativeElement: { value: string; }; };
  @ViewChild('approverId') approverId: { nativeElement: { value: number; }; };
  @ViewChild('languageId') languageId: { nativeElement: { value: number; }; };
  @ViewChild('externalIdentifier') externalIdentifier: { nativeElement: { value: string; }; };

  public parentId: any;

  constructor(readonly activeModal: IxActiveModal, private toastService: ToastService, private router: Router, private documentsSerivce: DocumentsService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
    const data = this.activeModal.data;
    this.parentId = data.parentId;
  }

  ngOnInit() {
  }

  addDocument() {
    let document = {} as RQMDocument;
    document.id = 0;
    document.workspaceId = this.parentId;
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

    this.documentsSerivce.postDocument(document).subscribe(
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
        this.toastService.show({ message: "Added document " + document.name + "." });
        this.router.navigate(['/workspace-tree']);
      }
    );
  }

}
