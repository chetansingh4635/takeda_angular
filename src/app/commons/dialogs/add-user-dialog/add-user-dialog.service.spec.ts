import { TestBed, inject } from '@angular/core/testing';

import { AddUserDialogService } from './add-user-dialog.service';

describe('AddUserDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddUserDialogService]
    });
  });

  it('should be created', inject([AddUserDialogService], (service: AddUserDialogService) => {
    expect(service).toBeTruthy();
  }));
});
