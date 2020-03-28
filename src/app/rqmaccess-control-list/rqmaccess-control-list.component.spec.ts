/*
openrqm-client-desktop-nwjs
RQMAccessControlList Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMAccessControlListComponent } from './rqmaccess-control-list.component';

describe('RQMAccessControlListComponent', () => {
  let component: RQMAccessControlListComponent;
  let fixture: ComponentFixture<RQMAccessControlListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMAccessControlListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMAccessControlListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
