/*
openrqm-client-desktop-nwjs
RQMMultiLineSnackBar Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  standalone: false,
  selector: 'app-rqmmulti-line-snack-bar',
  templateUrl: './rqmmulti-line-snack-bar.component.html',
  styleUrls: ['./rqmmulti-line-snack-bar.component.css']
})
export class RQMMultiLineSnackBarComponent implements OnInit {



  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  ngOnInit() {
  }

}
