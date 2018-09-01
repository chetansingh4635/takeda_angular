import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiDocumentsComponent } from './pi-documents.component';

describe('PiDocumentsComponent', () => {
  let component: PiDocumentsComponent;
  let fixture: ComponentFixture<PiDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
