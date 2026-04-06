/*
openrqm-client-desktop-nwjs
RQMAssignUsers Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService, ToastService } from '@siemens/ix-angular';

import { WorkspacesService, RQMWorkspaceUser } from '../openrqm-api'
import { RQMAddUserComponent } from '../rqmadd-user/rqmadd-user.component';

@Component({
  standalone: false,
  selector: 'app-rqmassign-users',
  templateUrl: './rqmassign-users.component.html',
  styleUrls: ['./rqmassign-users.component.css']
})
export class RQMAssignUsersComponent implements OnInit {

  @Input() workspaceId: number;

  allData: RQMWorkspaceUser[] = [];
  pagedData: RQMWorkspaceUser[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 1;

  selectedItems = new Set<RQMWorkspaceUser>();

  initialized: boolean = false;

  constructor(private modalService: ModalService, private toastService: ToastService, private router: Router, private workspaceService: WorkspacesService) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.initialized = false;
    this.workspaceService.getUsersOfWorkspace(this.workspaceId).subscribe(
      usersOfWorkspace => {
        console.log(usersOfWorkspace);
        this.allData = usersOfWorkspace;
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

  async openAddUser() {
    const instance = await this.modalService.open({
      content: RQMAddUserComponent,
      data: { workspaceId: this.workspaceId }
    });

    instance.onClose.on((result) => {
      if (result == 'success') {
        this.loadData();
      }
      console.log('The dialog was closed');
    });
  }

  deleteUser() {
    let users: RQMWorkspaceUser[] = Array.from(this.selectedItems);

    console.log(users);
    users.forEach((user) => {
      this.selectedItems.delete(user);
      this.workspaceService.deleteUserOfWorkspace(this.workspaceId, user.userId).subscribe(
        next => {
          console.log(next);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('get users of workspace done');
          this.loadData();
        }
      );
    });

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

  toggleSelection(row: RQMWorkspaceUser) {
    if (this.selectedItems.has(row)) {
      this.selectedItems.delete(row);
    } else {
      this.selectedItems.add(row);
    }
  }

  checkboxLabel(row?: RQMWorkspaceUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectedItems.has(row) ? 'deselect' : 'select'}`;
  }
}
