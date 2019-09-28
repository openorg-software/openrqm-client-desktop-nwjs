import { Component, OnInit } from '@angular/core';
import { AngularGridInstance, ExtensionName, Column, GridOption, GridServiceInsertOption } from 'angular-slickgrid';
import { RQMElementViewerComponent } from '../rqmelement-viewer/rqmelement-viewer.component';
import { RQMElementViewerPreloadComponent } from '../rqmelement-viewer-preload/rqmelement-viewer-preload.component';
import { ElementsService, RQMElements } from 'openrqm-api';

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
  elements: RQMElements;

  constructor(elementsService: ElementsService
  ) { this.elementsService = elementsService; }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
  }
  get rowDetailInstance(): any {
    return this.angularGrid && this.angularGrid.extensionService.getSlickgridAddonInstance(ExtensionName.rowDetailView) || {};
  }

  ngOnInit(): void {
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
        id: '#', field: '', name: '', width: 40,
        selectable: false, resizable: false,
        cssClass: 'add-item',
        excludeFromExport: true,
        excludeFromColumnPicker: true,
        excludeFromHeaderMenu: true,
        excludeFromGridMenu: true,
        onCellClick: () => this.addNewItem(),
      },
      {
        id: 'id', name: 'Id', field: 'id', sortable: true
      },
      {
        id: 'content', name: 'Content', field: 'content', sortable: false
      },
      {
        id: 'elementtype', name: 'Type', field: 'elementtype', sortable: false
      },
      {
        id: 'rank', name: 'Rank', field: 'rank', sortable: true
      },
      {
        id: 'parent', name: 'Parent', field: 'parent', sortable: true
      }
    ];
    this.gridOptions = {
      enableGridMenu: false,
      enableAutoResize: true,       // true by default
      enableCellNavigation: true,
      enableRowMoveManager: true,
      rowMoveManager: {
        onBeforeMoveRows: (e, args) => this.onBeforeMoveRow(e, args),
        onMoveRows: (e, args) => this.onMoveRows(e, args),
      },
      enableRowDetailView: true,
      rowDetailView: {
        // We can load the "process" asynchronously in 2 different ways (httpClient OR even Promise)
        process: (item) => this.simulateServerAsyncCall(item),
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

    this.elementsService.getElements(1).subscribe(
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
            elementtype: element.elementTypeId,
            rank: element.rank,
            parent: element.parentElementId
          });
        });
        this.angularGrid.slickGrid.setData(this.dataset);
        this.angularGrid.slickGrid.render();
      }
    );
  }

  onBeforeMoveRow(e, data) {
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

  changeDetailViewRowCount() {
    if (this.angularGrid && this.angularGrid.extensionService) {
      const options = this.rowDetailInstance.getOptions();
      if (options && options.panelRows) {
        options.panelRows = this.detailViewRowCount; // change number of rows dynamically
        this.rowDetailInstance.setOptions(options);
      }
    }
  }

  closeAllRowDetail() {
    if (this.angularGrid && this.angularGrid.extensionService) {
      this.rowDetailInstance.collapseAll();
    }
  }

  /** Just for demo purposes, we will simulate an async server call and return more details on the selected row item */
  simulateServerAsyncCall(item: any) {
    // random set of names to use for more item detail

    // fill the template on async delay
    return new Promise((resolve) => {
      const itemDetail = item;

      // let's add some extra properties to our item for a better async simulation


      // resolve the data after delay specified
      resolve(itemDetail);

    });
  }
  private randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  addNewItem() {

    console.log("add item called");
    const randomYear = 2000 + Math.floor(Math.random() * 10);
    const randomMonth = Math.floor(Math.random() * 11);
    const randomDay = Math.floor((Math.random() * 28));
    const randomPercent = Math.round(Math.random() * 100);
    const newItem = {
      id: this.dataset.length + 1,
      title: 'Task ' + randomYear,
      duration: Math.round(Math.random() * 100) + '',
      percentComplete: randomPercent,
      start: `${randomMonth}/${randomDay}/${randomYear}`,
      finish: `${randomMonth}/${randomDay}/${randomYear}`,
      fortDriven: true
    };

    // add the item to the grid

    let options: GridServiceInsertOption;
    options.highlightRow = true;
    this.angularGrid.gridService.addItem(newItem, options);
  }
}