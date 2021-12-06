import { TestBed } from '@angular/core/testing';

import { InvestionsRefreshService } from './investions-refresh.service';

describe('InvestionsRefreshService', () => {
  let service: InvestionsRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestionsRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
