import { TestBed } from '@angular/core/testing';

import { ModalOrderCreatorService } from './modal-order-creator.service';

describe('ModalOrderCreatorService', () => {
  let service: ModalOrderCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalOrderCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
