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
import { RQMWorkspaceTreeViewItem, } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RQMAddWorkspaceComponent } from '../rqmadd-workspace/rqmadd-workspace.component';
import { RQMAddDocumentComponent } from '../rqmadd-document/rqmadd-document.component';
import { RQMWorkspaceTreeviewItemPropertiesComponent } from '../rqmworkspace-treeview-item-properties/rqmworkspace-treeview-item-properties.component';
import { RQMWorkspace } from 'openrqm-api';
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
  @Input() items: RQMWorkspaceTreeViewItem[];
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
  closeResult: string;


  constructor(
    public i18n: TreeviewI18n, router: Router, private modalService: NgbModal
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

  select(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    console.log("select");
    console.log(item.value);
    if (item.isDocument) {
      this.router.navigate(['/document-viewer', item.value]);
    }
  }

  onContextMenu(event: MouseEvent, dropDown: any) {
    event.preventDefault();
    dropDown.open();
  }

  private updateSelectedItem() {
    if (!isNil(this.items)) {
      let selectedItem: RQMWorkspaceTreeViewItem = TreeviewHelper.findItemInList(this.items, this.value);
      if (selectedItem) {
        this.selectItem(selectedItem);
      }
    }
  }

  private selectItem(item: RQMWorkspaceTreeViewItem) {
    if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
      this.dropdownTreeviewSelectI18n.selectedItem = item;
      if (this.value !== item.value) {
        this.value = item.value;
        this.valueChange.emit(item.value);
      }
    }
  }

  openAddWorkspace(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const modalRef = this.modalService.open(RQMAddWorkspaceComponent);
    console.log("givin item value to modal");
    console.log(item.value);
    modalRef.componentInstance.parentId = item.value;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddDocument(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const modalRef = this.modalService.open(RQMAddDocumentComponent);
    console.log("givin item value to modal");
    console.log(item.value);
    modalRef.componentInstance.parentId = item.value;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openProperties(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const modalRef = this.modalService.open(RQMWorkspaceTreeviewItemPropertiesComponent);
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}