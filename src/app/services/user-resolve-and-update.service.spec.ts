import { TestBed } from '@angular/core/testing';

import { UserResolveAndUpdateService } from './user-resolve-and-update.service';

describe('UserResolveAndUpdateService', () => {
  let service: UserResolveAndUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserResolveAndUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
