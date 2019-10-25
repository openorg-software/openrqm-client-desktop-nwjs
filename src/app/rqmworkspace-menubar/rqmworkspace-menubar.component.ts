/*
openrqm-client-desktop-nwjs
RQMWorkspaceMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rqmworkspace-menubar',
  templateUrl: './rqmworkspace-menubar.component.html',
  styleUrls: ['./rqmworkspace-menubar.component.css']
})
export class RQMWorkspaceMenubarComponent implements OnInit {

  @ViewChild('addWorkspace', { static: false }) addWorkspace;
  @ViewChild('addDocument', { static: false }) addDocument;

  navbarOpen = false;

  closeResult: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
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

}
