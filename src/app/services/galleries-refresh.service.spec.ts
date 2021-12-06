import { TestBed } from '@angular/core/testing';

import { GalleriesRefreshService } from './galleries-refresh.service';

describe('GalleriesRefreshService', () => {
  let service: GalleriesRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleriesRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
