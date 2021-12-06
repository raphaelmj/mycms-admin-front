import { TestBed } from '@angular/core/testing';

import { DepartmentsRefreshService } from './departments-refresh.service';

describe('DepartmentsRefreshService', () => {
  let service: DepartmentsRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentsRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
