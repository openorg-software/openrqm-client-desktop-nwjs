import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'rqmmain',
  templateUrl: './rqmmain.component.html',
  styleUrls: ['./rqmmain.component.scss']
})
export class RQMMainComponent implements OnInit {

  @ViewChild('body', { static: false }) body: ElementRef;

  constructor() {
    ///Disable the default context menu of the app
    //body.onContextMenu.listen((MouseEvent e) => e.preventDefault());
  }

  ngOnInit() {
  }

}
