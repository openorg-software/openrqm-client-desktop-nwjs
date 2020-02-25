/*
openrqm-client-desktop-nwjs
RQMServerSettingsModal Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMServerSettingsModalComponent } from './rqmserver-settings-modal.component';

describe('RQMServerSettingsModalComponent', () => {
  let component: RQMServerSettingsModalComponent;
  let fixture: ComponentFixture<RQMServerSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMServerSettingsModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMServerSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
