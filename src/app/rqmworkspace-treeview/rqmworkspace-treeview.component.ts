/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { isNil } from 'lodash';
import { TreeviewI18n, TreeviewConfig } from 'ngx-treeview';
import { RQMWorkspaceTreeviewI18n } from './rqmworkspace-treeview-i18n';
import { TreeviewComponent } from 'ngx-treeview';
import { faFileAlt, faFolder as faFolderSolid, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder as faFolderRegular } from '@fortawesome/free-regular-svg-icons';
import { RQMWorkspaceTreeViewItem, } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RQMAddDocumentComponent } from '../rqmadd-document/rqmadd-document.component';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { DocumentsService, WorkspacesService } from 'openrqm-api';
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

  // For linking
  @Input() linking: boolean = false;
  @Output() selectedDocument = new EventEmitter<number>();

  // For modals
  itemId: number = -1;
  tempTreeViewItem: RQMWorkspaceTreeViewItem = null;

  private dropdownTreeviewSelectI18n: RQMWorkspaceTreeviewI18n;

  /// Font Awesome Icons used in Template
  faFile = faFileAlt;
  faFolder = faFolderSolid;
  faFolderRegular = faFolderRegular;
  faFolderOpen = faFolderOpen;

  /// Router for navigation to documents
  closeResult: string;

  constructor(
    public i18n: TreeviewI18n, private router: Router, private modalService: NgbModal, private documentsService: DocumentsService, private workspaceService: WorkspacesService, private settingsService: RQMSettingsService, private userService: RQMUserService
  ) {
    this.documentsService.configuration.basePath = this.settingsService.getApiBasePath();
    this.documentsService.configuration.apiKeys = {};
    this.documentsService.configuration.apiKeys['token'] = this.userService.getToken();
    this.workspaceService.configuration.basePath = this.settingsService.getApiBasePath();
    this.workspaceService.configuration.apiKeys = {};
    this.workspaceService.configuration.apiKeys['token'] = this.userService.getToken();
    this.config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasCollapseExpand: false,
      hasFilter: false,
      maxHeight: 500
    });
    this.dropdownTreeviewSelectI18n = i18n as RQMWorkspaceTreeviewI18n;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isNil(this.value)) {
      console.log("onChanges");
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
      if (this.linking) {
        console.log("Emit from treeview: " + item.value);
        this.selectedDocument.emit(item.value);
      } else {
        this.documentsService.getDocument(item.value).subscribe(
          (doc) => {
            this.router.navigate(['/document-viewer', item.value, doc.shortName]);
          },
          err => {
            console.log('err');
            console.log(err);
          },
          () => {
            console.log('getting document done');
          }
        );
      }
    }
  }

  onContextMenu(event: MouseEvent, dropDown: any) {
    event.preventDefault();
    dropDown.open();
  }

  private updateSelectedItem() {
    if (!isNil(this.items)) {
      let selectedItem: RQMWorkspaceTreeViewItem = this.findRQMWorkspaceTreeViewItem(this.value);
      if (selectedItem) {
        this.selectItem(selectedItem);
      }
    }
  }

  private findRQMWorkspaceTreeViewItem(itemValue: number) {
    return this.items.find(item => item.value == itemValue);
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

  openModal(content: any, item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    this.itemId = item.value;
    this.tempTreeViewItem = item;
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddDocument(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const modalRef = this.modalService.open(RQMAddDocumentComponent, { size: 'xl' });
    console.log("givin item value to modal");
    console.log(item.value);
    modalRef.componentInstance.parentId = item.value;
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteWorkspace(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    this.workspaceService.deleteWorkspace(item.value).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('delete workspace done');
      }
    );
    this.router.navigate(['/workspace-tree']);
  }

  deleteDocument(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    this.documentsService.deleteDocument(item.value).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('delete document done');
      }
    );
    this.router.navigate(['/workspace-tree']);
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