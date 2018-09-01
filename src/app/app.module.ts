import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppMaterialModule } from './material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountModule } from './account/account.module';
import { UserManagementModule } from './modules/user_management/userManagement.module';
import { TrialManagementModule } from './modules/trial_management/trialManagement.module';
import { ContentManagementModule } from './modules/content_management/contentManagement.module';
import { AddUserDialogComponent } from './commons/dialogs/add-user-dialog/add-user-dialog.component';
import { AuthGuard } from './account/auth/guard/auth.guard';
import { SuperAdminGuard } from './account/auth/guard/super-admin.guard';
import { AdminGuard } from './account/auth/guard/admin.guard';
import { SponsorGuard } from './account/auth/guard/sponsor.guard';
import { CroGuard } from './account/auth/guard/cro.guard';
import { PiGuard } from './account/auth/guard/pi.guard';
import { SitesGuard } from './account/auth/guard/sites.guard';
import { LocalStorage } from './commons/services/localStorage.service';
import { HttpService } from './commons/services/http.service';
import { CustomValidationService } from './commons/services/custom-validation.service';
import { ModulesModule } from './modules/modules.module';
import './rxjs-operators';
import { AddUserDialogAdminComponent } from './commons/dialogs/add-user-dialog-admin/add-user-dialog-admin.component';
import { AddDocumentDialogComponent } from './commons/dialogs/add-document-dialog/add-document-dialog.component';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import { LoaderService } from './commons/services/loader.service';
import { AddVideoDialogComponent } from './commons/dialogs/add-video-dialog/add-video-dialog.component';
import { AddSubjectDialogComponent } from './commons/dialogs/add-subject-dialog/add-subject-dialog.component';
import { UploadWetDialogComponent } from './commons/dialogs/upload-wet-dialog/upload-wet-dialog.component';
import { AssignSiteDialogComponent } from './commons/dialogs/assign-site-dialog/assign-site-dialog.component';
import { AddSiteCoordinatorComponent } from './commons/dialogs/add-site-coordinator/add-site-coordinator.component';
import { ConfirmDialogComponent } from './commons/dialogs/confirm-dialog/confirm-dialog.component';
import { InitiateTrialDialogComponent } from './commons/dialogs/initiate-trial-dialog/initiate-trial-dialog.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { AddDocumentComponent } from './modules/content_management/components/admin/add-document/add-document.component';
import { DragulaModule } from 'ng2-dragula';
import { FaqsComponent } from './modules/content_management/components/faqs/faqs.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    AddUserDialogComponent,
    AddUserDialogAdminComponent,
    AddDocumentDialogComponent,
    AddVideoDialogComponent,
    AddSubjectDialogComponent,
    UploadWetDialogComponent,
    AssignSiteDialogComponent,
    AddSiteCoordinatorComponent,
    ConfirmDialogComponent,
    InitiateTrialDialogComponent,
    AddDocumentComponent,
    FaqsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgbModule.forRoot(),
    AccountModule,
    ModulesModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ToasterModule.forRoot(),
    CKEditorModule,
    DragulaModule.forRoot()
  ],
  providers: [{ provide: LocalStorage, useValue: 'test' }, AuthGuard, SuperAdminGuard, CroGuard, AdminGuard,
  SponsorGuard, PiGuard, SitesGuard, ToasterService, LoaderService, CustomValidationService],
  entryComponents: [AddUserDialogComponent, AddUserDialogAdminComponent, AddDocumentDialogComponent,
    AddSubjectDialogComponent, UploadWetDialogComponent, AssignSiteDialogComponent,AddSiteCoordinatorComponent, ConfirmDialogComponent,InitiateTrialDialogComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
