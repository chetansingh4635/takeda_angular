import { TestBed, inject } from '@angular/core/testing';

import { InitiateTrialDialogService } from './initiate-trial-dialog.service';

describe('InitiateTrialDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitiateTrialDialogService]
    });
  });

  it('should be created', inject([InitiateTrialDialogService], (service: InitiateTrialDialogService) => {
    expect(service).toBeTruthy();
  }));
});
