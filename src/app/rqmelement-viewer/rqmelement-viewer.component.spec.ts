/*
openrqm-client-desktop-nwjs
RQMElementViewer Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMElementViewerComponent } from './rqmelement-viewer.component';

describe('RQMElementViewerComponent', () => {
  let component: RQMElementViewerComponent;
  let fixture: ComponentFixture<RQMElementViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMElementViewerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMElementViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
