/*
openrqm-client-desktop-nwjs
RQMAddWorkspace Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAddWorkspaceComponent } from './rqmadd-workspace.component';

describe('RQMAddWorkspaceComponent', () => {
  let component: RQMAddWorkspaceComponent;
  let fixture: ComponentFixture<RQMAddWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMAddWorkspaceComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAddWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
