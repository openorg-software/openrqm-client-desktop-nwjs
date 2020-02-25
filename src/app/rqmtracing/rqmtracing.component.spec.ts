/*
openrqm-client-desktop-nwjs
RQMTracing Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMTracingComponent } from './rqmtracing.component';

describe('RQMTracingComponent', () => {
  let component: RQMTracingComponent;
  let fixture: ComponentFixture<RQMTracingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RQMTracingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMTracingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
