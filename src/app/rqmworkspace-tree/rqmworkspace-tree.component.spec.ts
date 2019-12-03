/*
openrqm-client-desktop-nwjs
RQMWorkspaceTree Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMWorkspaceTreeComponent } from './rqmworkspace-tree.component';

describe('RQMWorkspaceTreeComponent', () => {
  let component: RQMWorkspaceTreeComponent;
  let fixture: ComponentFixture<RQMWorkspaceTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMWorkspaceTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMWorkspaceTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
