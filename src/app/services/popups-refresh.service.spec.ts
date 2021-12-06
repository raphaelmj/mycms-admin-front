import { TestBed } from '@angular/core/testing';

import { PopupsRefreshService } from './popups-refresh.service';

describe('PopupsRefreshService', () => {
  let service: PopupsRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupsRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
