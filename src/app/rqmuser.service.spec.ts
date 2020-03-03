/*
openrqm-client-desktop-nwjs
RQMUser Service Tests
SPDX-License-Identifier: GPL-2.0-only
Copyright (C) 2020 Benjamin Schilling
*/


import { TestBed } from '@angular/core/testing';

import { RQMUserService } from './rqmuser.service';

describe('RQMUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RQMUserService = TestBed.get(RQMUserService);
    expect(service).toBeTruthy();
  });
});
