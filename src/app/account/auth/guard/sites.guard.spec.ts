import { TestBed, async, inject } from '@angular/core/testing';

import { SitesGuard } from './sites.guard';

describe('SitesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitesGuard]
    });
  });

  it('should ...', inject([SitesGuard], (guard: SitesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
