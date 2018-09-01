import { TestBed, async, inject } from '@angular/core/testing';

import { PiGuard } from './pi.guard';

describe('PiGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiGuard]
    });
  });

  it('should ...', inject([PiGuard], (guard: PiGuard) => {
    expect(guard).toBeTruthy();
  }));
});
