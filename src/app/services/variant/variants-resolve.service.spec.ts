import { TestBed } from '@angular/core/testing';

import { VariantsResolveService } from './variants-resolve.service';

describe('VariantsResolveService', () => {
  let service: VariantsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
