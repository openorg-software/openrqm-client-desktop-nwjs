/*
openrqm-client-desktop-nwjs
RQMDocumentsExporter Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentExporterComponent } from './rqmdocument-exporter.component';

describe('RQMDocumentExporterComponent', () => {
  let component: RQMDocumentExporterComponent;
  let fixture: ComponentFixture<RQMDocumentExporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMDocumentExporterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentExporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
