import { Component, OnInit, ViewChild } from '@angular/core';
import { UserManagementService, RQMUser } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';

import * as jssha512 from 'js-sha512';
@Component({
  selector: 'app-rqmuser-settings-modal',
  templateUrl: './rqmuser-settings-modal.component.html',
  styleUrls: ['./rqmuser-settings-modal.component.css']
})
export class RQMUserSettingsModalComponent implements OnInit {

  email: string;
  name: string;
  surname: string;
  department: string;

  @ViewChild('emailRegister', { static: false }) emailRegister;
  @ViewChild('oldPassword', { static: false }) oldPassword;
  @ViewChild('newPassword', { static: false }) newPassword;
  @ViewChild('newPasswordAgain', { static: false }) newPasswordAgain;
  @ViewChild('nameRegister', { static: false }) nameRegister;
  @ViewChild('surnameRegister', { static: false }) surnameRegister;
  @ViewChild('departmentRegister', { static: false }) departmentRegister;

  constructor(private userManagementService: UserManagementService, private settingsService: RQMSettingsService) { 
    this.userManagementService.configuration.basePath = this.settingsService.serverUrl;
  }

  ngOnInit() {

  }

  logout(){
    this.userManagementService.logout(0);
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
    if(newPasswordHash != newPasswordHashAgain){
      console.log('Error passwords dont match');
      return;
    }

    this.userManagementService.changeUser(0, oldPasswordHash, newPasswordHash, user).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('change user done');
      }
    );
  }

}
