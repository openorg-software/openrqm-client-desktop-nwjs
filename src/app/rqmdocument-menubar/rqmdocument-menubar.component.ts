/*
openrqm-client-desktop-nwjs
RQMDocumentMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-rqmdocument-menubar',
  templateUrl: './rqmdocument-menubar.component.html',
  styleUrls: ['./rqmdocument-menubar.component.css']
})
export class RQMDocumentMenubarComponent implements OnInit {
  navbarOpen = false;
  closeResult: string;

  faCaret = faCaretLeft;
  typePdf: string = "pdf";
  typeMarkdown: string = "markdown";

  @ViewChild('exportModal', { static: false }) exportModal: any;
  @Output() doLinking = new EventEmitter<boolean>();

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

  startLinking(){
    this.doLinking.emit(true);
  }

}
