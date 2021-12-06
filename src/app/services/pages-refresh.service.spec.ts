import { TestBed } from '@angular/core/testing';

import { PagesRefreshService } from './pages-refresh.service';

describe('PagesRefreshService', () => {
  let service: PagesRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
