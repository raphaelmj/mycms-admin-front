import { TestBed } from '@angular/core/testing';

import { ContactsResolveService } from './contacts-resolve.service';

describe('ContactsResolveService', () => {
  let service: ContactsResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
