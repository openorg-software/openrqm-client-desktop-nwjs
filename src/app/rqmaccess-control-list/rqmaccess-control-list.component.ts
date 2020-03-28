/*
openrqm-client-desktop-nwjs
RQMAccessControlList Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rqmaccess-control-list',
  templateUrl: './rqmaccess-control-list.component.html',
  styleUrls: ['./rqmaccess-control-list.component.css']
})
export class RQMAccessControlListComponent implements OnInit {

  @Input() workspaceId: number;

  constructor() { }

  ngOnInit() {
  }

}
