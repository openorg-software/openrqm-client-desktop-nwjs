import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rqmlogin',
  templateUrl: './rqmlogin.component.html',
  styleUrls: ['./rqmlogin.component.css']
})
export class RQMLoginComponent implements OnInit {
  closeResult: string;
  constructor(private modalService: NgbModal, private router: Router) { }

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
    this.router.navigate(['/workspace-tree']);
  }
  register(){

  }

}
