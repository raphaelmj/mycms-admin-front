import { TestBed } from '@angular/core/testing';

import { ModalUploadFilesCreatorService } from './modal-upload-files-creator.service';

describe('ModalUploadFilesCreatorService', () => {
  let service: ModalUploadFilesCreatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalUploadFilesCreatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
