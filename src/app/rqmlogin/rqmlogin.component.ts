/*
openrqm-client-desktop-nwjs
RQMLogin Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '@siemens/ix-angular';

import { UserManagementService, OpenAPI } from '../openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

import { RQMServerSettingsDialogComponent } from '../rqmserver-settings-dialog/rqmserver-settings-dialog.component';
import { RQMRegisterComponent } from '../rqmregister/rqmregister.component'

import * as jssha512 from 'js-sha512';

@Component({
  standalone: false,
  selector: 'app-rqmlogin',
  templateUrl: './rqmlogin.component.html',
  styleUrls: ['./rqmlogin.component.css']
})
export class RQMLoginComponent implements OnInit {

  @ViewChild('emailLogin') emailLogin;
  @ViewChild('passwordLogin') passwordLogin;

  closeResult: string;
  constructor(private modalService: ModalService, private router: Router, private userManagementService: UserManagementService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
  }

  ngOnInit() {
  }

  async openDialogServerSettings() {
    const instance = await this.modalService.open({
      content: RQMServerSettingsDialogComponent,
      data: {}
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }

  async openDialogRegister() {
    const instance = await this.modalService.open({
      content: RQMRegisterComponent,
      data: {}
    });
    instance.onClose.on(() => {
      console.log('The dialog was closed');
    });
  }


  login() {
    let passwordHash: string = jssha512.sha512(this.passwordLogin.nativeElement.value);
    this.userManagementService.login(passwordHash, this.emailLogin.nativeElement.value).subscribe(
      user => {
        console.log('user');
        console.log(user);
        this.userService.setId(user.id);
        this.userService.setToken(user.token);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('login done');
        this.router.navigate(['/workspace-tree']);
      }
    );
  }
}
