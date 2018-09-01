import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesAnalyticsComponent } from './sites-analytics.component';

describe('SitesAnalyticsComponent', () => {
  let component: SitesAnalyticsComponent;
  let fixture: ComponentFixture<SitesAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
