/*
openrqm-client-desktop-nwjs
RQMMultiLineSnackBar Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMMultiLineSnackBarComponent } from './rqmmulti-line-snack-bar.component';

describe('RQMMultiLineSnackBarComponent', () => {
  let component: RQMMultiLineSnackBarComponent;
  let fixture: ComponentFixture<RQMMultiLineSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMMultiLineSnackBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMMultiLineSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
