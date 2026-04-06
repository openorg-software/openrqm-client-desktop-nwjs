/*
openrqm-client-desktop-nwjs
RQMMultiLineSnackBar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-rqmmulti-line-snack-bar',
  templateUrl: './rqmmulti-line-snack-bar.component.html',
  styleUrls: ['./rqmmulti-line-snack-bar.component.css']
})
export class RQMMultiLineSnackBarComponent implements OnInit {

  @Input() data: string[] = [];

  constructor() {

  }

  ngOnInit() {
  }

}
