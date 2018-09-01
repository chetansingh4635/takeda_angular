import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationSetupComponent } from './medication-setup.component';

describe('MedicationSetupComponent', () => {
  let component: MedicationSetupComponent;
  let fixture: ComponentFixture<MedicationSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicationSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
