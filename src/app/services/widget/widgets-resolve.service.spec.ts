import { TestBed } from '@angular/core/testing';

import { WidgetsResolveService } from './widgets-resolve.service';

describe('WidgetsResolveService', () => {
  let service: WidgetsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
