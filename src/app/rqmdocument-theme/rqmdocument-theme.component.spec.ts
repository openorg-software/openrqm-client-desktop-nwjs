/*
openrqm-client-desktop-nwjs
RQMDocumentTheme Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDocumentThemeComponent } from './rqmdocument-theme.component';

describe('RQMDocumentThemeComponent', () => {
  let component: RQMDocumentThemeComponent;
  let fixture: ComponentFixture<RQMDocumentThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMDocumentThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDocumentThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
