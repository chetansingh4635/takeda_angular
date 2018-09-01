import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLanguageDialogComponent } from './select-language-dialog.component';

describe('SelectLanguageDialogComponent', () => {
  let component: SelectLanguageDialogComponent;
  let fixture: ComponentFixture<SelectLanguageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLanguageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLanguageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
