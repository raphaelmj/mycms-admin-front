import { TestBed } from '@angular/core/testing';

import { VariantsRefreshService } from './variants-refresh.service';

describe('VariantsRefreshService', () => {
  let service: VariantsRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantsRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
