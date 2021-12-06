import { TestBed } from '@angular/core/testing';

import { InvestitionService } from './investition.service';

describe('InvestitionService', () => {
  let service: InvestitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
