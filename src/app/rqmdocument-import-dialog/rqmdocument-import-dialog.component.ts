/*
openrqm-client-desktop-nwjs
RQMDocumentImportDialogComponent Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

/// Angular Dependencies
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';

/// Material Design Dependencies
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

/// File Upload Dependencies
import { FileInputComponent } from 'ngx-material-file-input'


/// OpenRQM Dependencies
import { DocumentsService, RQMDocument } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';


@Component({
  selector: 'app-rqmdocument-import-dialog',
  templateUrl: './rqmdocument-import-dialog.component.html',
  styleUrls: ['./rqmdocument-import-dialog.component.css']
})
export class RQMDocumentImportDialogComponent implements OnInit {

  public parentId: any;
  @ViewChild('importFile', { static: false }) importFile: FileInputComponent;

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
