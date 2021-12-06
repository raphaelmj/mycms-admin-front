import { TestBed } from '@angular/core/testing';

import { ArticlesRefreshService } from './articles-refresh.service';

describe('ArticlesRefreshService', () => {
  let service: ArticlesRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
