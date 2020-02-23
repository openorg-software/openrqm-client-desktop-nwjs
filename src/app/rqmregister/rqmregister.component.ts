import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService, RQMUser } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmregister',
  templateUrl: './rqmregister.component.html',
  styleUrls: ['./rqmregister.component.css']
})
export class RQMRegisterComponent implements OnInit {

    //Register
    @ViewChild('emailRegister', { static: false }) emailRegister;
    @ViewChild('passwordRegister', { static: false }) passwordRegister;
    @ViewChild('passwordAgainRegister', { static: false }) passwordAgainRegister;
    @ViewChild('nameRegister', { static: false }) nameRegister;
    @ViewChild('surnameRegister', { static: false }) surnameRegister;
    @ViewChild('departmentRegister', { static: false }) departmentRegister;

  constructor(private router: Router, private userManagementService: UserManagementService, private settingsService: RQMSettingsService) { }

  ngOnInit() {
  }

  register(){
    let user = {} as RQMUser;
    user.email = this.emailRegister.nativeElement.value;
    user.name = this.nameRegister.nativeElement.value;
    user.surname = this.surnameRegister.nativeElement.value;
    user.department = this.departmentRegister.nativeElement.value;
    let password: string = this.passwordRegister.nativeElement.value;
    let passwordAgain: string = this.passwordAgainRegister.nativeElement.value;

    if(password != passwordAgain){
      console.log('Error passwords dont match');
      return;
    }

    this.userManagementService.register(password, user ).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('register done');
      }
    );

  }

}
