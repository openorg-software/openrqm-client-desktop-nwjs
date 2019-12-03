/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMWorkspaceTreeviewComponent } from './rqmworkspace-treeview.component';

describe('RQMWorkspaceTreeviewComponent', () => {
  let component: RQMWorkspaceTreeviewComponent;
  let fixture: ComponentFixture<RQMWorkspaceTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMWorkspaceTreeviewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMWorkspaceTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
