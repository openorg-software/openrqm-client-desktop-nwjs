/*
openrqm-client-desktop-nwjs
RQMLogin Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserManagementService } from 'openrqm-api'
import { RQMSettingsService } from '../rqmsettings.service';

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
  constructor(private modalService: NgbModal, private router: Router, private userManagementService: UserManagementService, private settingsService: RQMSettingsService) {
    userManagementService.configuration.basePath = this.settingsService.getApiBasePath();
   }

  ngOnInit() {
  }

  openModal(content: any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  login(){
    let  passwordHash: string = jssha512.sha512(this.passwordLogin.nativeElement.value);
    this.userManagementService.login(passwordHash,this.emailLogin.nativeElement.value).subscribe(
      next => {
        console.log('next');
        console.log(next);
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
