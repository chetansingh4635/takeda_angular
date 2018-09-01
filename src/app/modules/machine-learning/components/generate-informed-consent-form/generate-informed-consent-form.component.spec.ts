import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInformedConsentFormComponent } from './generate-informed-consent-form.component';

describe('GenerateInformedConsentFormComponent', () => {
  let component: GenerateInformedConsentFormComponent;
  let fixture: ComponentFixture<GenerateInformedConsentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateInformedConsentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInformedConsentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
