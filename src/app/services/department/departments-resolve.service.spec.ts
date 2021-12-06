import { TestBed } from '@angular/core/testing';

import { DepartmentsResolveService } from './departments-resolve.service';

describe('DepartmentsResolveService', () => {
  let service: DepartmentsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
