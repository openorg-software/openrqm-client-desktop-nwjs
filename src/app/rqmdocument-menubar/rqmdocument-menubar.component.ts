import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-rqmdocument-menubar',
  templateUrl: './rqmdocument-menubar.component.html',
  styleUrls: ['./rqmdocument-menubar.component.css']
})
export class RQMDocumentMenubarComponent implements OnInit {
  navbarOpen = false;
  modalRef: BsModalRef;
  faCaret = faCaretLeft;

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
