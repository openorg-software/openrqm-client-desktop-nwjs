/*
openrqm-client-desktop-nwjs
RQMElementViewerPreload Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMElementViewerPreloadComponent } from './rqmelement-viewer-preload.component';

describe('RQMElementViewerPreloadComponent', () => {
  let component: RQMElementViewerPreloadComponent;
  let fixture: ComponentFixture<RQMElementViewerPreloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMElementViewerPreloadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMElementViewerPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
