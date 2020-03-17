/*
openrqm-client-desktop-nwjs
RQMUserSettingsDialog Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMUserSettingsDialogComponent } from './rqmuser-settings-dialog.component';

describe('RQMUserSettingsDialogComponent', () => {
    let component: RQMUserSettingsDialogComponent;
    let fixture: ComponentFixture<RQMUserSettingsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RQMUserSettingsDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RQMUserSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});