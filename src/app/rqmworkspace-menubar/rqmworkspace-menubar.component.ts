/*
openrqm-client-desktop-nwjs
RQMWorkspaceMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-rqmworkspace-menubar',
  templateUrl: './rqmworkspace-menubar.component.html',
  styleUrls: ['./rqmworkspace-menubar.component.css']
})
export class RQMWorkspaceMenubarComponent implements OnInit {
  navbarOpen = false;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }
}
