import { TestBed } from '@angular/core/testing';

import { SwitchLoadingProgressService } from './switch-loading-progress.service';

describe('SwitchLoadingProgressService', () => {
  let service: SwitchLoadingProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchLoadingProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
