import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWetDialogComponent } from './upload-wet-dialog.component';

describe('UploadWetDialogComponent', () => {
  let component: UploadWetDialogComponent;
  let fixture: ComponentFixture<UploadWetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadWetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadWetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
