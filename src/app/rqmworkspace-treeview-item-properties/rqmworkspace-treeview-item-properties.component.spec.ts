/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeviewItemProperties Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMWorkspaceTreeviewItemPropertiesComponent } from './rqmworkspace-treeview-item-properties.component';

describe('RQMWorkspaceTreeviewItemPropertiesComponent', () => {
  let component: RQMWorkspaceTreeviewItemPropertiesComponent;
  let fixture: ComponentFixture<RQMWorkspaceTreeviewItemPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMWorkspaceTreeviewItemPropertiesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMWorkspaceTreeviewItemPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
