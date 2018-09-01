import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminServiceComponent } from './super-admin.service.component';

describe('SuperAdminServiceComponent', () => {
    let component: SuperAdminServiceComponent;
    let fixture: ComponentFixture<SuperAdminServiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SuperAdminServiceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuperAdminServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
