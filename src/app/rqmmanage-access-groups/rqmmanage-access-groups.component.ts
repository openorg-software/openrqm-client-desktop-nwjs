/*
openrqm-client-desktop-nwjs
RQMManageAccessGroups Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';

import { IxActiveModal } from '@siemens/ix-angular';

import { AccessGroupsService, RQMAccessGroup } from '../openrqm-api';

@Component({
  standalone: false,
  selector: 'app-rqmmanage-access-groups',
  templateUrl: './rqmmanage-access-groups.component.html',
  styleUrls: ['./rqmmanage-access-groups.component.css']
})
export class RQMManageAccessGroupsComponent implements OnInit {

  allData: RQMAccessGroup[] = [];
  pagedData: RQMAccessGroup[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  selectedItems = new Set<RQMAccessGroup>();

  initialized: boolean = false;

  constructor(readonly activeModal: IxActiveModal, private accessGroupsService: AccessGroupsService) { }

  ngOnInit() {

    this.accessGroupsService.getAccessgroups().subscribe(
      accessGroups => {
        console.log(accessGroups);
        this.allData = accessGroups;
        this.updatePage();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('get workspace done');
        this.initialized = true;
      }
    );

  }

  updatePage() {
    this.totalPages = Math.max(1, Math.ceil(this.allData.length / this.pageSize));
    if (this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages - 1;
    }
    const start = this.currentPage * this.pageSize;
    this.pagedData = this.allData.slice(start, start + this.pageSize);
  }

  isAllSelected(): boolean {
    return this.selectedItems.size === this.allData.length && this.allData.length > 0;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selectedItems.clear();
    } else {
      this.allData.forEach(row => this.selectedItems.add(row));
    }
  }

  toggleSelection(row: RQMAccessGroup) {
    if (this.selectedItems.has(row)) {
      this.selectedItems.delete(row);
    } else {
      this.selectedItems.add(row);
    }
  }

}
