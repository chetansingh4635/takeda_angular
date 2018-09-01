import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorAnalyticsComponent } from './sponsor-analytics.component';

describe('SponsorAnalyticsComponent', () => {
  let component: SponsorAnalyticsComponent;
  let fixture: ComponentFixture<SponsorAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
