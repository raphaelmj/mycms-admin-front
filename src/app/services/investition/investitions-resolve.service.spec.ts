import { TestBed } from '@angular/core/testing';

import { InvestitionsResolveService } from './investitions-resolve.service';

describe('InvestitionsResolveService', () => {
  let service: InvestitionsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestitionsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
