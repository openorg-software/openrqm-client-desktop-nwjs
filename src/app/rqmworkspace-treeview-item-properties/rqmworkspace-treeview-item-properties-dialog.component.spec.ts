/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeviewItemProperties Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMWorkspaceTreeviewItemPropertiesDialogComponent } from './rqmworkspace-treeview-item-properties-dialog.component';

describe('RQMWorkspaceTreeviewItemPropertiesDialogComponent', () => {
  let component: RQMWorkspaceTreeviewItemPropertiesDialogComponent;
  let fixture: ComponentFixture<RQMWorkspaceTreeviewItemPropertiesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMWorkspaceTreeviewItemPropertiesDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMWorkspaceTreeviewItemPropertiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
