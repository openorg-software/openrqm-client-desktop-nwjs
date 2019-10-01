/*
openrqm-client-desktop-nwjs
RQMMain Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMMainComponent } from './rqmmain.component';

describe('RQMMainComponent', () => {
  let component: RQMMainComponent;
  let fixture: ComponentFixture<RQMMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMMainComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
