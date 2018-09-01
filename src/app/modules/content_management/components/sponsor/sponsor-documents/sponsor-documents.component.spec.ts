import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorDocumentsComponent } from './sponsor-documents.component';

describe('SponsorDocumentsComponent', () => {
  let component: SponsorDocumentsComponent;
  let fixture: ComponentFixture<SponsorDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
