import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiAnalyticsComponent } from './pi-analytics.component';

describe('PiAnalyticsComponent', () => {
  let component: PiAnalyticsComponent;
  let fixture: ComponentFixture<PiAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
