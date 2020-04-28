/*
openrqm-client-desktop-nwjs
RQMAssignUsers Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAssignUsersComponent } from './rqmassign-users.component';

describe('RQMAssignUsersComponent', () => {
  let component: RQMAssignUsersComponent;
  let fixture: ComponentFixture<RQMAssignUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMAssignUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAssignUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
