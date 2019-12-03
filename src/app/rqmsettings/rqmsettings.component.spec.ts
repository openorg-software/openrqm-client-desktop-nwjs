/*
openrqm-client-desktop-nwjs
RQMSettings Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMSettingsComponent } from './rqmsettings.component';

describe('RQMSettingsComponent', () => {
  let component: RQMSettingsComponent;
  let fixture: ComponentFixture<RQMSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMSettingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
