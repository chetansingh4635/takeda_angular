import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteCoordinatorComponent } from './add-site-coordinator.component';

describe('AddSiteCoordinatorComponent', () => {
  let component: AddSiteCoordinatorComponent;
  let fixture: ComponentFixture<AddSiteCoordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSiteCoordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSiteCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
