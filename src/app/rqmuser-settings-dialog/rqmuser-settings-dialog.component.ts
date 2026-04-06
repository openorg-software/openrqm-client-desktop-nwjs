/*
openrqm-client-desktop-nwjs
RQMUserSettingsDialog Component
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { IxActiveModal, ToastService } from '@siemens/ix-angular';

import { UserManagementService, RQMUser, OpenAPI } from '../openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

import * as jssha512 from 'js-sha512';

@Component({
  standalone: false,
  selector: 'app-rqmuser-settings-dialog',
  templateUrl: './rqmuser-settings-dialog.component.html',
  styleUrls: ['./rqmuser-settings-dialog.component.css']
})
export class RQMUserSettingsDialogComponent implements OnInit {

    userId: number;

    email: string;
    name: string;
    surname: string;
    department: string;

    @ViewChild('emailRegister') emailRegister;
    @ViewChild('oldPassword') oldPassword;
    @ViewChild('newPassword') newPassword;
    @ViewChild('newPasswordAgain') newPasswordAgain;
    @ViewChild('nameRegister') nameRegister;
    @ViewChild('surnameRegister') surnameRegister;
    @ViewChild('departmentRegister') departmentRegister;

    // For user management
    @Output() logoutEvent = new EventEmitter<any>();



    constructor(readonly activeModal: IxActiveModal, private toastService: ToastService,
        private userManagementService: UserManagementService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
        OpenAPI.BASE = this.settingsService.getApiBasePath();
        OpenAPI.TOKEN = this.userService.getToken();
    }

    ngOnInit() {
        this.userManagementService.getInfo(this.userService.getId()).subscribe(
            user => {
                console.log(user);
                this.emailRegister.nativeElement.value = user.email;
                this.nameRegister.nativeElement.value = user.name;
                this.surnameRegister.nativeElement.value = user.surname;
                this.departmentRegister.nativeElement.value = user.department;
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('get user done');
            }
        );
    }

    updateUser() {

        let user = {} as RQMUser;
        user.email = this.emailRegister.nativeElement.value;
        user.name = this.nameRegister.nativeElement.value;
        user.surname = this.surnameRegister.nativeElement.value;
        user.department = this.departmentRegister.nativeElement.value;

        let oldPasswordHash: string = jssha512.sha512(this.oldPassword.nativeElement.value);
        let newPasswordHash: string = jssha512.sha512(this.newPassword.nativeElement.value);
        let newPasswordHashAgain: string = jssha512.sha512(this.newPasswordAgain.nativeElement.value);
        if (newPasswordHash != newPasswordHashAgain) {
            console.log('Error passwords dont match');
            return;
        }

        this.userManagementService.changeUser(this.userService.getId(), oldPasswordHash, newPasswordHash, user).subscribe(
            next => {
                console.log('next');
                console.log(next);
            },
            err => {
                console.log('err');
                console.log(err);
                this.toastService.show({ message: 'Error during user update. Error: ' + err.message, type: 'error' });
            },
            () => {
                console.log('change user done');
                this.toastService.show({ message: 'Successfully updated user.' });
            }
        );
    }

}
