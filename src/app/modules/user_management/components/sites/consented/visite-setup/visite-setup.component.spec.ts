import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisiteSetupComponent } from './visite-setup.component';

describe('VisiteSetupComponent', () => {
  let component: VisiteSetupComponent;
  let fixture: ComponentFixture<VisiteSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiteSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiteSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
