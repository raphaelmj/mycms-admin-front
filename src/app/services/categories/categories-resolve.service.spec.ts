import { TestBed } from '@angular/core/testing';

import { CategoriesResolveService } from './categories-resolve.service';

describe('CategoriesResolveService', () => {
  let service: CategoriesResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
