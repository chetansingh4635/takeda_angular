import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroAnalyticsComponent } from './cro-analytics.component';

describe('CroAnalyticsComponent', () => {
  let component: CroAnalyticsComponent;
  let fixture: ComponentFixture<CroAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
