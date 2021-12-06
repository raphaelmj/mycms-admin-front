import { TestBed } from '@angular/core/testing';

import { ArticlesResolveService } from './articles-resolve.service';

describe('ArticlesResolveService', () => {
  let service: ArticlesResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
