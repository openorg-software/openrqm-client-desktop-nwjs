/*
openrqm-client-desktop-nwjs
RQMDocumentMenubar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
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

  // For Linking
  @ViewChild('exportModal', { static: false }) exportModal: any;
  linkingInProgress: boolean = false;
  @Output() doLinking = new EventEmitter<boolean>();

  // For Theme
  @Output() requirementColorChange = new EventEmitter<string>();
  @Output() proseColorChange = new EventEmitter<string>();
  @Input() requirementColor: string = "";
  @Input() proseColor: string = "";

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
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

  startLinking() {
    this.linkingInProgress = true;
    this.doLinking.emit(true);
  }
  stopLinking() {
    this.linkingInProgress = false;
    this.doLinking.emit(false);
  }

  onRequirementColorChange(color: string) {
    this.requirementColor = color;
    this.requirementColorChange.emit(color);
  }

  onProseColorChange(color: string) {
    this.proseColor = color;
    this.proseColorChange.emit(color);
  }
}
