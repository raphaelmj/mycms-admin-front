import { TestBed } from '@angular/core/testing';

import { ColorHelperService } from './color-helper.service';

describe('ColorHelperService', () => {
  let service: ColorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
