/*
openrqm-client-desktop-nwjs
RQMManageAccessGroups Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';


// Material Design
import { MatMenuTrigger } from '@angular/material'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { AccessGroupsService, RQMAccessGroup } from 'openrqm-api';

@Component({
  selector: 'app-rqmmanage-access-groups',
  templateUrl: './rqmmanage-access-groups.component.html',
  styleUrls: ['./rqmmanage-access-groups.component.css']
})
export class RQMManageAccessGroupsComponent implements OnInit {

  displayedColumnsAccessGroups: string[] = ['accessGroupId'];
  dataSourceAccessGroups = new MatTableDataSource<RQMAccessGroup>();
  @ViewChild(MatPaginator, { static: true }) paginatorAccessGroups: MatPaginator;

  selection = new SelectionModel<RQMAccessGroup>(true, []);

  initialized: boolean = false;

  constructor(private accessGroupsService: AccessGroupsService) { }

  ngOnInit() {

    this.accessGroupsService.getAccessgroups().subscribe(
      accessGroups => {
        console.log(accessGroups);

        this.dataSourceAccessGroups = new MatTableDataSource<RQMAccessGroup>(accessGroups);
        this.dataSourceAccessGroups.paginator = this.paginatorAccessGroups;
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourceAccessGroups.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSourceAccessGroups.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: RQMAccessGroup): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

}
