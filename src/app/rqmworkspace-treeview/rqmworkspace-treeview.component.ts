/*
openrqm-client-desktop-nwjs
RQMWorkspaceTreeView Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 - 2026 Benjamin Schilling
*/

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { isNil } from 'lodash';

import { faFileAlt, faFolder as faFolderSolid, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder as faFolderRegular } from '@fortawesome/free-regular-svg-icons';

import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';

import { RQMWorkspaceTreeViewItem } from '../rqmworkspace-tree/rqmworkspacetreeview-item';
import { RQMWorkspaceTreeviewI18n } from './rqmworkspace-treeview-i18n';
import { RQMAddDocumentComponent } from '../rqmadd-document/rqmadd-document.component';
import { RQMAddWorkspaceComponent } from '../rqmadd-workspace/rqmadd-workspace.component';
import { RQMDeleteTreeViewItemComponent } from '../rqmdelete-tree-view-item/rqmdelete-tree-view-item.component';
import { RQMSettingsService } from '../rqmsettings.service';
import { RQMUserService } from '../rqmuser.service';
import { DocumentsService, WorkspacesService, OpenAPI } from '../openrqm-api';
import { RQMWorkspaceTreeviewItemPropertiesDialogComponent } from '../rqmworkspace-treeview-item-properties/rqmworkspace-treeview-item-properties-dialog.component';
import { RQMDocumentImportDialogComponent } from '../rqmdocument-import-dialog/rqmdocument-import-dialog.component';

@Component({
  standalone: false,
  selector: 'app-rqmworkspace-treeview',
  templateUrl: './rqmworkspace-treeview.component.html',
  styleUrls: ['./rqmworkspace-treeview.component.css'],
})
export class RQMWorkspaceTreeviewComponent implements OnChanges {
  @Input() items: RQMWorkspaceTreeViewItem[];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  @ViewChild(MatMenuTrigger, { static: false })
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  @Input() linking: boolean = false;
  @Output() selectedDocument = new EventEmitter<number>();

  itemId: number = -1;
  tempTreeViewItem: RQMWorkspaceTreeViewItem = null;

  private dropdownTreeviewSelectI18n = new RQMWorkspaceTreeviewI18n();

  faFile = faFileAlt;
  faFolder = faFolderSolid;
  faFolderRegular = faFolderRegular;
  faFolderOpen = faFolderOpen;

  closeResult: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private documentsService: DocumentsService,
    private workspaceService: WorkspacesService,
    private settingsService: RQMSettingsService,
    private userService: RQMUserService
  ) {
    OpenAPI.BASE = this.settingsService.getApiBasePath();
    OpenAPI.TOKEN = this.userService.getToken();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isNil(this.value)) {
      console.log("onChanges");
    } else {
      this.updateSelectedItem();
    }
  }

  toggleCollapse(item: RQMWorkspaceTreeViewItem) {
    item.collapsed = !item.collapsed;
  }

  select(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    console.log("select");
    console.log(item.value);

    if (item.isItemDocument()) {
      this.openDocument(item);
    }
  }

  openDocument(item: RQMWorkspaceTreeViewItem) {
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

  onContextMenu(event: MouseEvent, item: RQMWorkspaceTreeViewItem) {
    event.preventDefault();
    this.itemId = item.value;
    this.tempTreeViewItem = item;
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: this.tempTreeViewItem };
    this.contextMenu.openMenu();
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

  openDialog(component: any, dataValue?: any): any {
    return this.dialog.open(component, { width: '80vw', data: dataValue });
  }

  openWorkspaceItemProperties(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const dialogRef = this.openDialog(RQMWorkspaceTreeviewItemPropertiesDialogComponent, { item: item });
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
  }

  openDialogNewWorkspace(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const dialogRef = this.openDialog(RQMAddWorkspaceComponent, { parentId: item.value });
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
  }

  openDialogAddDocument(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const dialogRef = this.openDialog(RQMAddDocumentComponent, { parentId: item.value });
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
  }

  openDialogImportDocument(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const dialogRef = this.openDialog(RQMDocumentImportDialogComponent, { parentId: item.value });
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
  }

  openDialogDelete(item: RQMWorkspaceTreeViewItem) {
    if (item.children === undefined) {
      this.selectItem(item);
    }
    const dialogRef = this.openDialog(RQMDeleteTreeViewItemComponent, { item: item });
    dialogRef.afterClosed().subscribe(result => { console.log('The dialog was closed'); });
  }
}
