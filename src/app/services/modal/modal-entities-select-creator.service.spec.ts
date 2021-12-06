import { TestBed } from '@angular/core/testing';

import { ModalEntitiesSelectCreatorService } from './modal-entities-select-creator.service';

describe('ModalEntitiesSelectCreatorService', () => {
  let service: ModalEntitiesSelectCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEntitiesSelectCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
