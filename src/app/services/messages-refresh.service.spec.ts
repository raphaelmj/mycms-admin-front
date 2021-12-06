import { TestBed } from '@angular/core/testing';

import { MessagesRefreshService } from './messages-refresh.service';

describe('MessagesRefreshService', () => {
  let service: MessagesRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
