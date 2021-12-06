import { TestBed } from '@angular/core/testing';

import { OfficesResolveService } from './offices-resolve.service';

describe('OfficesResolveService', () => {
  let service: OfficesResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficesResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
