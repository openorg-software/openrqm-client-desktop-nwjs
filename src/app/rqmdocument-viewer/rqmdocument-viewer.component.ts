/*
openrqm-client-desktop-nwjs
RQMDocumentViewer Component Controller
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2019 Benjamin Schilling
*/

// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// OpenRQM
import { LinksService } from 'openrqm-api';
import { RQMSettingsService } from '../rqmsettings.service';

@Component({
  selector: 'app-rqmdocument-viewer',
  templateUrl: './rqmdocument-viewer.component.html',
  styleUrls: ['./rqmdocument-viewer.component.css']
})
export class RQMDocumentViewerComponent implements OnInit {

  detailViewRowCount = 9;
  id: string;

  reloadSubscription: any;

  // For linking
  doLinking: boolean = false;  
  startLinkElement: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private settingsService: RQMSettingsService, private linksService: LinksService
  ) {

    this.settingsService = settingsService;
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

  }

  ngOnInit(): void {
    
  }

  // For reloading the page
  ngOnDestroy() {
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }
  }

  onDoLinking(doLinking: boolean) {
    console.log('emitted doLinking');
    this.doLinking = doLinking;
  }

  onCreateLinkFrom(elementId: number) {
    console.log('create link from ' + elementId);
    this.startLinkElement = elementId;
  }
  onCreateLinkTo(elementId: number) {
    console.log('create link to ' + elementId);
    this.linksService.linkElement(this.startLinkElement, elementId, 0).subscribe(
      next => {
        console.log('next');
        console.log(next);
      },
      err => {
        console.log('err');
        console.log(err);
      },
      () => {
        console.log('linking elements done');
      }
    );
  }
}