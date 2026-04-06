/*
openrqm-client-desktop-nwjs
RQMDocumentImportDialogComponent Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

/// Angular Dependencies
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

/// Material Design Dependencies
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  public parentId: any;
  @ViewChild('importFile', { static: false }) importFile: ElementRef<HTMLInputElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _snackBar: MatSnackBar, private router: Router, private documentsSerivce: DocumentsService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
    this.parentId = data.parentId;
  }

  ngOnInit() {
  }

  importDocument() {
    const selectedFile = this.importFile?.nativeElement.files?.[0];
    if (!selectedFile) {
      this.openSnackBar('Please select a file to import.');
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
        this.openSnackBar("Import document " + document.name + ".");
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
