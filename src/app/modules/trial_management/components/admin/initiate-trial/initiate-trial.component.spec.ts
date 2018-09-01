import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateTrialComponent } from './initiate-trial.component';

describe('InitiateTrialComponent', () => {
  let component: InitiateTrialComponent;
  let fixture: ComponentFixture<InitiateTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
