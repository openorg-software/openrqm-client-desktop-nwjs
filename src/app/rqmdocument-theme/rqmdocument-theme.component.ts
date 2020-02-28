/*
openrqm-client-desktop-nwjs
RQMDocumentTheme Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-rqmdocument-theme',
  templateUrl: './rqmdocument-theme.component.html',
  styleUrls: ['./rqmdocument-theme.component.css']
})
export class RQMDocumentThemeComponent implements OnInit {


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
