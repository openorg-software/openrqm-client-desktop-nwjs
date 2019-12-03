/*
openrqm-client-desktop-nwjs
RQMDocumentMenubar Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentMenubarComponent } from './rqmdocument-menubar.component';

describe('RQMDocumentMenubarComponent', () => {
  let component: RQMDocumentMenubarComponent;
  let fixture: ComponentFixture<RQMDocumentMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMDocumentMenubarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
