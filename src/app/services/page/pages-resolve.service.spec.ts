import { TestBed } from '@angular/core/testing';

import { PagesResolveService } from './pages-resolve.service';

describe('PagesResolveService', () => {
  let service: PagesResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagesResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
