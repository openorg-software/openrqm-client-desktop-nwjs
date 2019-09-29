import { TestBed } from '@angular/core/testing';

import { RQMSettingsService } from './rqmsettings.service';

describe('RQMSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RQMSettingsService = TestBed.get(RQMSettingsService);
    expect(service).toBeTruthy();
  });
});
