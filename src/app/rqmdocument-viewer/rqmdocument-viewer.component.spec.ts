/*
openrqm-client-desktop-nwjs
RQMDocumentViewer Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentViewerComponent } from './rqmdocument-viewer.component';

describe('RQMDocumentViewerComponent', () => {
  let component: RQMDocumentViewerComponent;
  let fixture: ComponentFixture<RQMDocumentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMDocumentViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
