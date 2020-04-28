/*
openrqm-client-desktop-nwjs
RQMAddUser Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAddUserComponent } from './rqmadd-user.component';

describe('RQMAddUserComponent', () => {
  let component: RQMAddUserComponent;
  let fixture: ComponentFixture<RQMAddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMAddUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
