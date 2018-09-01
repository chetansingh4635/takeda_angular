import { TestBed, inject } from '@angular/core/testing';

import { AddSubjectService } from './add-subject.service';

describe('AddSubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddSubjectService]
    });
  });

  it('should be created', inject([AddSubjectService], (service: AddSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
