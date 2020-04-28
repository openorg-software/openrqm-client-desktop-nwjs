/*
openrqm-client-desktop-nwjs
RQMAssignAccessGroup Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAssignAccessGroupComponent } from './rqmassign-access-group.component';

describe('RQMAssignAccessGroupComponent', () => {
  let component: RQMAssignAccessGroupComponent;
  let fixture: ComponentFixture<RQMAssignAccessGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMAssignAccessGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAssignAccessGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
