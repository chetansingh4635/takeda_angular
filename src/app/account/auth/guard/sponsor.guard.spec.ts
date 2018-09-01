import { TestBed, async, inject } from '@angular/core/testing';

import { SponsorGuard } from './sponsor.guard';

describe('SponsorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SponsorGuard]
    });
  });

  it('should ...', inject([SponsorGuard], (guard: SponsorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
