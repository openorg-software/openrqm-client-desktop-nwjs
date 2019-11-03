/*
openrqm-client-desktop-nwjs
RQMDocumentViewer Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit } from '@angular/core';
import { ParamMap } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { AngularGridInstance, ExtensionName, Column, GridOption } from 'angular-slickgrid';
import { RQMElementViewerComponent } from '../rqmelement-viewer/rqmelement-viewer.component';
import { RQMElementViewerPreloadComponent } from '../rqmelement-viewer-preload/rqmelement-viewer-preload.component';
import { ElementsService, RQMElement } from 'openrqm-api';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rqmdocument-viewer',
  templateUrl: './rqmdocument-viewer.component.html',
  styleUrls: ['./rqmdocument-viewer.component.css']
})
export class RQMDocumentViewerComponent implements OnInit {
  angularGrid: AngularGridInstance;
  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];
  detailViewRowCount = 9;
  elementsService: ElementsService;
  elements: RQMElement[] = [];
  id: string;

  constructor(elementsService: ElementsService, private route: ActivatedRoute,
  ) { this.elementsService = elementsService; }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }

  get rowDetailInstance(): any {
    console.log("rowDetailInstance");
    return this.angularGrid && this.angularGrid.extensionService.getSlickgridAddonInstance(ExtensionName.rowDetailView) || {};
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.columnDefinitions = [
      {
        id: '#', field: '', name: '', width: 40,
        behavior: 'selectAndMove',
        selectable: false, resizable: false,
        cssClass: 'cell-reorder dnd',
        excludeFromExport: true,
        excludeFromColumnPicker: true,
        excludeFromHeaderMenu: true,
        excludeFromGridMenu: true
      },
      {
        id: 'id', name: 'Id', field: 'id', sortable: true
      },
      {
        id: 'content', name: 'Content', field: 'content', sortable: false
      },
      {
        id: 'elementTypeId', name: 'Type', field: 'elementTypeId', sortable: false
      },
      {
        id: 'rank', name: 'Rank', field: 'rank', sortable: true
      },
      {
        id: 'parentElementId', name: 'Parent', field: 'parentElementId', sortable: true
      },
      {
        id: 'documentId', name: 'Document Id', field: 'documentId', sortable: false
      }
    ];
    this.gridOptions = {
      enableGridMenu: false,
      enableAutoResize: true,
      autoResize: {
        containerId: 'container'
      },
      enableCellNavigation: true,
      enableRowMoveManager: true,
      rowMoveManager: {
        onBeforeMoveRows: (e, args) => this.onBeforeMoveRow(e, args),
        onMoveRows: (e, args) => this.onMoveRows(e, args),
      },
      enableRowDetailView: true,
      rowDetailView: {
        // We can load the "process" asynchronously in 2 different ways (httpClient OR even Promise)
        process: (item) => this.showDetails(item),
        // process: (item) => this.http.get(`api/item/${item.id}`),

        // load only once and reuse the same item detail without calling process method
        loadOnce: true,

        // limit expanded row to only 1 at a time
        singleRowExpand: false,

        // false by default, clicking anywhere on the row will open the detail view
        // when set to false, only the "+" icon would open the row detail
        // if you use editor or cell navigation you would want this flag set to false (default)
        useRowClick: true,

        // how many grid rows do we want to use for the row detail panel (this is only set once and will be used for all row detail)
        // also note that the detail view adds an extra 1 row for padding purposes
        // so if you choose 4 panelRows, the display will in fact use 5 rows
        panelRows: this.detailViewRowCount,

        // you can override the logic for showing (or not) the expand icon
        // for example, display the expand icon only on every 2nd row
        // expandableOverride: (row: number, dataContext: any, grid: any) => (dataContext.id % 2 === 1),

        // Preload View Component
        preloadComponent: RQMElementViewerPreloadComponent,

        // View Component to load when row detail data is ready
        viewComponent: RQMElementViewerComponent,
      }
    };

    // fill the dataset with your data
    // VERY IMPORTANT, Angular-Slickgrid uses Slickgrid DataView which REQUIRES a unique "id" and it has to be lowercase "id" and be part of the dataset
    this.dataset = [];

    this.elementsService.getElements(parseInt(this.id)).subscribe(
      el => {
        this.elements = el;
      },
      err => {
        console.log(err);
      },
      () => {
        this.elements.forEach(element => {
          this.dataset.push({
            id: element.id,
            content: element.content,
            elementTypeId: element.elementTypeId,
            rank: element.rank,
            parentElementId: element.parentElementId,
            documentId: element.documentId
          });
        });
        this.angularGrid.slickGrid.setData(this.dataset);
        this.angularGrid.slickGrid.render();
      }
    );
  }

  onBeforeMoveRow(e, data) {
    console.log("onBeforeMoveRow");
    for (let i = 0; i < data.rows.length; i++) {
      // no point in moving before or after itself
      if (data.rows[i] === data.insertBefore || data.rows[i] === data.insertBefore - 1) {
        e.stopPropagation();
        return false;
      }
    }
    return true;
  }

  onMoveRows(e, args) {

    console.log("onMoveRows");
    const extractedRows = [];
    let left;
    let right;
    const rows = args.rows;
    const insertBefore = args.insertBefore;
    left = this.dataset.slice(0, insertBefore);
    right = this.dataset.slice(insertBefore, this.dataset.length);
    rows.sort((a, b) => {
      return a - b;
    });

    for (let i = 0; i < rows.length; i++) {
      extractedRows.push(this.dataset[rows[i]]);
    }

    rows.reverse();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row < insertBefore) {
        left.splice(row, 1);
      } else {
        right.splice(row - insertBefore, 1);
      }
    }
    this.dataset = left.concat(extractedRows.concat(right));
    const selectedRows = [];

    for (let i = 0; i < rows.length; i++) {
      selectedRows.push(left.length + i);
    }

    this.angularGrid.slickGrid.resetActiveCell();
    this.angularGrid.slickGrid.setData(this.dataset);
    this.angularGrid.slickGrid.setSelectedRows(selectedRows);
    this.angularGrid.slickGrid.render();
  }

  showDetails(item: any) {
    console.log("showdetails");
    // fill the template on async delay
    return new Promise((resolve) => {
      const itemDetail = item;

      // resolve the data after delay specified
      resolve(itemDetail);

    });
  }

}