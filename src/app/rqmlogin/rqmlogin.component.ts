/*
openrqm-client-desktop-nwjs
RQMLogin Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { UserManagementService } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';

import { RQMServerSettingsDialogComponent } from '../rqmserver-settings-dialog/rqmserver-settings-dialog.component';
import { RQMRegisterComponent } from '../rqmregister/rqmregister.component'

import * as jssha512 from 'js-sha512';

@Component({
  selector: 'app-rqmlogin',
  templateUrl: './rqmlogin.component.html',
  styleUrls: ['./rqmlogin.component.css']
})
export class RQMLoginComponent implements OnInit {

  // Login
  @ViewChild('emailLogin', { static: false }) emailLogin;
  @ViewChild('passwordLogin', { static: false }) passwordLogin;

  closeResult: string;
  constructor(public dialog: MatDialog, private router: Router, private userManagementService: UserManagementService, private settingsService: RQMSettingsService, private userService: RQMUserService) {
    userManagementService.configuration.basePath = this.settingsService.getApiBasePath();
  }

  ngOnInit() {
  }


  openDialog(component: any, dataValue?: any): any {
    return this.dialog.open(component, {
      width: '80vw',
      data: dataValue
    });
  }

  openDialogServerSettings() {
    const dialogRef = this.openDialog(RQMServerSettingsDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogRegister() {
    const dialogRef = this.openDialog(RQMRegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
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
