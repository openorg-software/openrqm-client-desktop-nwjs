import { TestBed } from '@angular/core/testing';

import { RQMUserService } from './rqmuser.service';

describe('RQMUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RQMUserService = TestBed.get(RQMUserService);
    expect(service).toBeTruthy();
  });
});
