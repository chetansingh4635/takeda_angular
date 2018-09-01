import { TestBed, async, inject } from '@angular/core/testing';

import { CroGuard } from './cro.guard';

describe('CroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CroGuard]
    });
  });

  it('should ...', inject([CroGuard], (guard: CroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
