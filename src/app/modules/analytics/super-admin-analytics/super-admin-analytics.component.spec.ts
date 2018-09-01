import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAnalyticsComponent } from './super-admin-analytics.component';

describe('SuperAdminAnalyticsComponent', () => {
  let component: SuperAdminAnalyticsComponent;
  let fixture: ComponentFixture<SuperAdminAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
