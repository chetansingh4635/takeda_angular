import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../material/material.module';
import { NgbModule,NgbTabset,NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { TrialManagementRoutingModule } from './trialManagement-routing.module';
import { TrialManagementService} from './trialManagement.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserDialogComponent } from '../../commons/dialogs/add-user-dialog/add-user-dialog.component';
import { DataTableModule } from 'angular2-datatable';
import { InitiateTrialComponent } from './components/admin/initiate-trial/initiate-trial.component';
// import { TrialCalenderComponent } from './components/admin/partial/trial-calender/trial-calender.component';


@NgModule({
  declarations: [
    InitiateTrialComponent,
    // TrialCalenderComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    NgbModule,
    TrialManagementRoutingModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TrialManagementService,NgbTabset,NgbTabsetConfig],
  // bootstrap: [SuperAdminComponent],
  entryComponents: [AddUserDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrialManagementModule { }
