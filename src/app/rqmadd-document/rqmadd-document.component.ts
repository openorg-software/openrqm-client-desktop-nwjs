/*
openrqm-client-desktop-nwjs
RQMAddDocument Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DocumentsService, RQMDocument } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

@Component({
  selector: 'app-rqmadd-document',
  templateUrl: './rqmadd-document.component.html',
  styleUrls: ['./rqmadd-document.component.css']
})
export class RQMAddDocumentComponent implements OnInit {

  @ViewChild('documentName', { static: false }) documentName: { nativeElement: { value: string; }; };
  @ViewChild('shortName', { static: false }) shortName: { nativeElement: { value: string; }; };
  @ViewChild('description', { static: false }) description: { nativeElement: { value: string; }; };
  @ViewChild('confidentiality', { static: false }) confidentiality: { nativeElement: { value: string; }; };
  @ViewChild('authorId', { static: false }) authorId: { nativeElement: { value: number; }; };
  @ViewChild('reviewerText', { static: false }) reviewerText: { nativeElement: { value: string; }; };
  @ViewChild('approverId', { static: false }) approverId: { nativeElement: { value: number; }; };
  @ViewChild('languageId', { static: false }) languageId: { nativeElement: { value: number; }; };
  @ViewChild('externalIdentifier', { static: false }) externalIdentifier: { nativeElement: { value: string; }; };

  public parentId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private router: Router, private documentsSerivce: DocumentsService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    this.documentsSerivce.configuration.basePath = this.settingsService.getApiBasePath();
    this.documentsSerivce.configuration.apiKeys = {};
    this.documentsSerivce.configuration.apiKeys['token'] = this.userService.getToken();
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
    document.lastModifiedOn = new Date(5000);
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
        this.openSnackBar("Added document " + document.name + ".");
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