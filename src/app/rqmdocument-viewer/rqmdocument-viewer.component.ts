/*
openrqm-client-desktop-nwjs
RQMDocumentViewer Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementsService, RQMElement, ElementService } from 'openrqm-api';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { MatMenuTrigger } from '@angular/material'

@Component({
  selector: 'app-rqmdocument-viewer',
  templateUrl: './rqmdocument-viewer.component.html',
  styleUrls: ['./rqmdocument-viewer.component.css']
})
export class RQMDocumentViewerComponent implements OnInit {

  public Editor = InlineEditor;

  detailViewRowCount = 9;
  elementsService: ElementsService;
  elementService: ElementService;
  elements: RQMElement[] = [];
  id: string;

  reloadSubscription: any;

  displayedColumns: string[] = ['id', 'elementTypeId', 'parentElementId', 'content', 'rank'];

  // For context menu
  @ViewChild(MatMenuTrigger, { static: false })
  contextMenu: MatMenuTrigger;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, elementId: number) {
    console.log(elementId);
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'elementId': elementId };
    this.contextMenu.openMenu();
  }

  constructor(elementsService: ElementsService, elementService: ElementService, private router: Router, private route: ActivatedRoute,
  ) {
    // For reloading the page
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.reloadSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

    //Initialization
    this.elementsService = elementsService;
    this.elementService = elementService;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.elementsService.getElements(parseInt(this.id)).subscribe(
      el => {
        this.elements = el;
      },
      err => {
        console.log(err);
      },
      () => {
      }
    );
  }
  // Add an element after the current element
  addElement(aboveElementId: number): void {
    console.log(aboveElementId);
    let aboveRank: string = "";
    let belowRank: string = "";
    let parentElementId: number = -1;

    for (let element of this.elements) {
      if (element.id == aboveElementId) {
        parentElementId = element.parentElementId;
        aboveRank = element.rank;
        belowRank = this.elements[this.elements.indexOf(element) + 1].rank;
        if (belowRank == null) {
          belowRank = "";
        }
      }
    }
    if (aboveRank == "" || belowRank == "" || parentElementId == -1) {
      console.log('could not determine aboveRaank or belowRank');
      return;
    }

    let element = {} as RQMElement;
    element.content = "";
    element.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    element.elementTypeId = 1;
    element.rank = "0";
    element.id = 0;
    element.parentElementId = parentElementId;

    this.elementService.postElement(aboveRank, belowRank, element).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add element done');
      }
    );
    this.router.navigate(['/document-viewer', this.id]);
  }
  // Add an element below the current element
  addElementBelow(aboveElementId: number): void {
    console.log(aboveElementId);
    let aboveRank: string = "";
    let belowRank: string = "";

    for (let element of this.elements) {
      if (element.id == aboveElementId) {
        aboveRank = element.rank;
        belowRank = this.elements[this.elements.indexOf(element) + 1].rank;
        if (belowRank == null) {
          belowRank = "";
        }
      }
    }
    if (aboveRank == "" || belowRank == "" || aboveElementId == -1) {
      console.log('could not determine aboveId or belowId');
      return;
    }

    let element = {} as RQMElement;
    element.content = "";
    element.documentId = parseInt(this.route.snapshot.paramMap.get('id'));
    element.elementTypeId = 1;
    element.rank = "0";
    element.id = 0;
    element.parentElementId = aboveElementId;

    this.elementService.postElement(aboveRank, belowRank, element).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('add element done');
      }
    );

    this.router.navigate(['/document-viewer', this.id]);
  }

  // Add an element below the current element
  deleteElement(elementId: number): void {
    console.log(elementId);

    let element: RQMElement;
    for (let tempElement of this.elements) {
      if (tempElement.id == elementId) {
        element = tempElement;
      }
    }
    console.log(element);
    this.elementService.deleteElement(element.id).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('delete element done');
      }
    );
    this.router.navigate(['/document-viewer', this.id]);
  }

  // For reloading the page
  ngOnDestroy() {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }
}