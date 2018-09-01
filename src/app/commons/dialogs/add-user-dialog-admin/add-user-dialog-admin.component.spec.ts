import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserDialogAdminComponent } from './add-user-dialog-admin.component';

describe('AddUserDialogAdminComponent', () => {
  let component: AddUserDialogAdminComponent;
  let fixture: ComponentFixture<AddUserDialogAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserDialogAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDialogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
