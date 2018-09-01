import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroDocumentsComponent } from './cro-documents.component';

describe('CroDocumentsComponent', () => {
  let component: CroDocumentsComponent;
  let fixture: ComponentFixture<CroDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
