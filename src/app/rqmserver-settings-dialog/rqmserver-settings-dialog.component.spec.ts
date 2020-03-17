/*
openrqm-client-desktop-nwjs
RQMServerSettingsDialog Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMServerSettingsDialogComponent } from './rqmserver-settings-dialog.component';

describe('RQMServerSettingsDialogComponent', () => {
    let component: RQMServerSettingsDialogComponent;
    let fixture: ComponentFixture<RQMServerSettingsDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RQMServerSettingsDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RQMServerSettingsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});