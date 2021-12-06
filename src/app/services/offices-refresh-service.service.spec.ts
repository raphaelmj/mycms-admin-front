import { TestBed } from '@angular/core/testing';

import { OfficesRefreshService } from './offices-refresh.service';

describe('OfficesRefreshServiceService', () => {
  let service: OfficesRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficesRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
