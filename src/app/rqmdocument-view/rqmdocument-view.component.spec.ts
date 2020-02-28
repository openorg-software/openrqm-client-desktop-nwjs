/*
openrqm-client-desktop-nwjs
RQMDocumentView Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentViewComponent } from './rqmdocument-view.component';

describe('RQMDocumentViewComponent', () => {
  let component: RQMDocumentViewComponent;
  let fixture: ComponentFixture<RQMDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
