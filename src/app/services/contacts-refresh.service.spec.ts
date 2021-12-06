import { TestBed } from '@angular/core/testing';

import { ContactsRefreshService } from './contacts-refresh.service';

describe('ContactsRefreshService', () => {
  let service: ContactsRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
