import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesDocumentsComponent } from './sites-documents.component';

describe('SitesDocumentsComponent', () => {
  let component: SitesDocumentsComponent;
  let fixture: ComponentFixture<SitesDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
