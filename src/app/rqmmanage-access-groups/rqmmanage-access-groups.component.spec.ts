/*
openrqm-client-desktop-nwjs
RQMManageAccessGroups Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMManageAccessGroupsComponent } from './rqmmanage-access-groups.component';

describe('RQMManageAccessGroupsComponent', () => {
  let component: RQMManageAccessGroupsComponent;
  let fixture: ComponentFixture<RQMManageAccessGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMManageAccessGroupsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMManageAccessGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
