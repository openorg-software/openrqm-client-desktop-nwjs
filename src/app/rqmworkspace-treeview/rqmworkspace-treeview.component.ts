/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewI18n, TreeviewConfig, TreeviewHelper } from 'ngx-treeview';
import { RQMWorkspaceTreeviewI18n } from './rqmworkspace-treeview-i18n';
import { TreeviewComponent } from 'ngx-treeview';
import { faFileAlt, faFolder as faFolderSolid, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder as faFolderRegular } from '@fortawesome/free-regular-svg-icons';
import { RQMTreeViewItem, } from '../rqmworkspace-tree/rqmtreeview-item';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rqmworkspace-treeview',
  templateUrl: './rqmworkspace-treeview.component.html',
  styleUrls: ['./rqmworkspace-treeview.component.css'],
  providers: [
    { provide: TreeviewI18n, useClass: RQMWorkspaceTreeviewI18n }
  ]
})
export class RQMWorkspaceTreeviewComponent implements OnChanges {
  @Input() config: TreeviewConfig;
  @Input() items: RQMTreeViewItem[];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @ViewChild(TreeviewComponent, { read: false, static: false }) treeviewComponent: TreeviewComponent;

  private dropdownTreeviewSelectI18n: RQMWorkspaceTreeviewI18n;

  /// Font Awesome Icons used in Template
  faFile = faFileAlt;
  faFolder = faFolderSolid;
  faFolderRegular = faFolderRegular;
  faFolderOpen = faFolderOpen;

  /// Router for navigation to documents
  router: Router;


  constructor(
    public i18n: TreeviewI18n, router: Router
  ) {
    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: false,
      maxHeight: 500
    });
    this.dropdownTreeviewSelectI18n = i18n as RQMWorkspaceTreeviewI18n;
    this.router = router;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isNil(this.value)) {
    } else {
      this.updateSelectedItem();
    }
  }

  select(item: RQMTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    console.log("select");
    console.log(item.value);
    if (item.isDocument) {
      this.router.navigate(['/document-viewer', item.value]);
    }
  }

  private updateSelectedItem() {
    if (!isNil(this.items)) {
      let selectedItem: RQMTreeViewItem = TreeviewHelper.findItemInList(this.items, this.value);
      if (selectedItem) {
        this.selectItem(selectedItem);
      }
    }
  }

  private selectItem(item: RQMTreeViewItem) {
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;
      if (this.value !== item.value) {
        this.value = item.value;
        this.valueChange.emit(item.value);
      }
    }
  }

}