import { TestBed } from '@angular/core/testing';

import { PopupsResolveService } from './popups-resolve.service';

describe('PopupsResolveService', () => {
  let service: PopupsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
