import { TestBed } from '@angular/core/testing';

import { MessagesResolveService } from './messages-resolve.service';

describe('MessagesResolveService', () => {
  let service: MessagesResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
