import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroServiceComponent } from './cro.service.component';

describe('CroServiceComponent', () => {
    let component: CroServiceComponent;
    let fixture: ComponentFixture<CroServiceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CroServiceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CroServiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
