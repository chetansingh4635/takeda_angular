import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserManagementRoutingModule } from './userManagement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { CroComponent } from './components/cro/cro.component';
import { AddUserDialogComponent } from '../../commons/dialogs/add-user-dialog/add-user-dialog.component';
import {DataTableModule} from 'angular2-datatable';
import { ModulesComponent } from '../modules.component';
import { SuperAdminService } from './components/super-admin/super-admin.service';
import { CroService } from './components/cro/cro.service';
import { AdminService } from './components/admin/admin.service';
import { ApplicationPipesModule } from '../../commons/pipes/pipes.module';
import { PiComponent } from './components/pi/pi.component';
import { SitesComponent } from './components/sites/sites.component';
import { VisiteSetupComponent } from './components/sites/consented/visite-setup/visite-setup.component';
import { MedicationSetupComponent } from './components/sites/consented/medication-setup/medication-setup.component';
import { UserManagementService } from './user-management.service';
import { AddSubjectService } from '../../commons/dialogs/add-subject-dialog/add-subject.service';
import { AddUserDialogService } from '../../commons/dialogs/add-user-dialog/add-user-dialog.service';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
@NgModule({
  declarations: [
    SuperAdminComponent,
    AdminComponent,
    CroComponent,
    PiComponent,
    SitesComponent,
    VisiteSetupComponent,
    MedicationSetupComponent,

  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    NgbModule,
    UserManagementRoutingModule,
    DataTableModule,
    FormsModule,
    ApplicationPipesModule,
    AngularDateTimePickerModule,
  ],
  providers: [SuperAdminService, CroService, AdminService, UserManagementService, AddSubjectService,AddUserDialogService],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class UserManagementModule { }
