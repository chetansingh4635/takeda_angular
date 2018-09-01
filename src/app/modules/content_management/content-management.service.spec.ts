import { TestBed, inject } from '@angular/core/testing';

import { ContentManagementService } from './content-management.service';

describe('ContentManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentManagementService]
    });
  });

  it('should be created', inject([ContentManagementService], (service: ContentManagementService) => {
    expect(service).toBeTruthy();
  }));
});
