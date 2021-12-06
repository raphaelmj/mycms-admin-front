import { TestBed } from '@angular/core/testing';

import { AdminProtectGuard } from './admin-protect.guard';

describe('AdminProtectGuard', () => {
  let guard: AdminProtectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminProtectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
