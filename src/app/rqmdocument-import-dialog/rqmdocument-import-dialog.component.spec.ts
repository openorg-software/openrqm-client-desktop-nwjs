/*
openrqm-client-desktop-nwjs
RQMDocumentImportDialogComponent Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentImportDialogComponent } from './rqmdocument-import-dialog.component';

describe('RQMDocumentImportDialogComponent', () => {
  let component: RQMDocumentImportDialogComponent;
  let fixture: ComponentFixture<RQMDocumentImportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMDocumentImportDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentImportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
