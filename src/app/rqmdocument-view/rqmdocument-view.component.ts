/*
openrqm-client-desktop-nwjs
RQMDocumentView Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-rqmdocument-view',
  templateUrl: './rqmdocument-view.component.html',
  styleUrls: ['./rqmdocument-view.component.css']
})
export class RQMDocumentViewComponent implements OnInit {


  @Output() requirementColorOutput = new EventEmitter<string>();
  @Output() proseColorOutput = new EventEmitter<string>();
  
  @ViewChild('requirementColor', { static: false }) requirementColor: { nativeElement: { value: string; }; };
  @ViewChild('proseColor', { static: false }) proseColor: { nativeElement: { value: string; }; };

  @Input() reqColor: string = "";
  @Input() proColor: string = "";

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    
    this.requirementColor.nativeElement.value = this.reqColor;
    this.proseColor.nativeElement.value = this.proColor;
  }

  saveView(){
    this.requirementColorOutput.emit(this.requirementColor.nativeElement.value);
    this.proseColorOutput.emit(this.proseColor.nativeElement.value);
  }

}
