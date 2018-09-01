import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateTrialDialogComponent } from './initiate-trial-dialog.component';

describe('InitiateTrialDialogComponent', () => {
  let component: InitiateTrialDialogComponent;
  let fixture: ComponentFixture<InitiateTrialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitiateTrialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiateTrialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
