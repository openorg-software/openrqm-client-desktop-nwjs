/*
openrqm-client-desktop-nwjs
RQMDeleteTreeViewItem Component Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RQMDeleteTreeViewItemComponent } from './rqmdelete-tree-view-item.component';

describe('RQMDeleteTreeViewItemComponent', () => {
  let component: RQMDeleteTreeViewItemComponent;
  let fixture: ComponentFixture<RQMDeleteTreeViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RQMDeleteTreeViewItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RQMDeleteTreeViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
