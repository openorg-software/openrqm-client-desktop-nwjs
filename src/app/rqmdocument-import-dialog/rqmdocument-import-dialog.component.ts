/*
openrqm-client-desktop-nwjs
RQMDocumentImportDialogComponent Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

/// Angular Dependencies
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

/// Siemens iX Dependencies
import { IxActiveModal, ToastService } from '@siemens/ix-angular';

/// OpenRQM Dependencies
import { DocumentsService, RQMDocument, OpenAPI } from '../openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';


@Component({
  standalone: false,
  selector: 'app-rqmdocument-import-dialog',
  templateUrl: './rqmdocument-import-dialog.component.html',
  styleUrls: ['./rqmdocument-import-dialog.component.css']
})
export class RQMDocumentImportDialogComponent implements OnInit {

  public parentId: number;
  @ViewChild('importFile', { static: false }) importFile: ElementRef<HTMLInputElement>;

  constructor(readonly activeModal: IxActiveModal, private toastService: ToastService, private router: Router, private documentsSerivce: DocumentsService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
    this.parentId = this.activeModal.data.parentId;
  }

  ngOnInit() {
  }

  importDocument() {
    const selectedFile = this.importFile?.nativeElement.files?.[0];
    if (!selectedFile) {
      this.toastService.show({ message: 'Please select a file to import.', type: 'warning' });
      return;
    }

    let document = {} as RQMDocument;
    document.id = 0;
    document.workspaceId = this.parentId;
    document.internalIdentifier = 0;

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
        console.log('import document done');
        this.toastService.show({ message: 'Import document ' + document.name + '.' });
        this.router.navigate(['/workspace-tree']);
      }
    );
  }

}
