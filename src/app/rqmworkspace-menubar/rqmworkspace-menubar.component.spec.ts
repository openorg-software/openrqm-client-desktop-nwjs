/*
openrqm-client-desktop-nwjs
RQMWorkspaceMenubar Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMWorkspaceMenubarComponent } from './rqmworkspace-menubar.component';

describe('RQMWorkspaceMenubarComponent', () => {
  let component: RQMWorkspaceMenubarComponent;
  let fixture: ComponentFixture<RQMWorkspaceMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMWorkspaceMenubarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMWorkspaceMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
