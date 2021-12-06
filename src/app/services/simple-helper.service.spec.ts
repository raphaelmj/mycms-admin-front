import { TestBed } from '@angular/core/testing';

import { SimpleHelperService } from './simple-helper.service';

describe('SimpleHelperService', () => {
  let service: SimpleHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
