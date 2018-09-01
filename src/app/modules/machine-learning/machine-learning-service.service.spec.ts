import { TestBed, inject } from '@angular/core/testing';

import { MachineLearningServiceService } from './machine-learning-service.service';

describe('MachineLearningServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MachineLearningServiceService]
    });
  });

  it('should be created', inject([MachineLearningServiceService], (service: MachineLearningServiceService) => {
    expect(service).toBeTruthy();
  }));
});
