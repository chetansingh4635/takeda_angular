import { TestBed, inject } from '@angular/core/testing';

import { AddDocumentDialogService } from './add-document-dialog.service';

describe('AddDocumentDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDocumentDialogService]
    });
  });

  it('should be created', inject([AddDocumentDialogService], (service: AddDocumentDialogService) => {
    expect(service).toBeTruthy();
  }));
});
