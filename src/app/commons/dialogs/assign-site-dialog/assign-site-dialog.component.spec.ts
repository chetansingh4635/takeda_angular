import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSiteDialogComponent } from './assign-site-dialog.component';

describe('AssignSiteDialogComponent', () => {
  let component: AssignSiteDialogComponent;
  let fixture: ComponentFixture<AssignSiteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSiteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
