/*
openrqm-client-desktop-nwjs
RQMAddDocument Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAddDocumentComponent } from './rqmadd-document.component';

describe('RQMAddDocumentComponent', () => {
  let component: RQMAddDocumentComponent;
  let fixture: ComponentFixture<RQMAddDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMAddDocumentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAddDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
