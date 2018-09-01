import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialDocumentsComponent } from './trial-documents.component';

describe('TrialDocumentsComponent', () => {
  let component: TrialDocumentsComponent;
  let fixture: ComponentFixture<TrialDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
