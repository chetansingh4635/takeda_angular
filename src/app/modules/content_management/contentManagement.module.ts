import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentManagementRoutingModule } from './contentManagement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUserDialogComponent } from '../../commons/dialogs/add-user-dialog/add-user-dialog.component';
import { DataTableModule } from 'angular2-datatable';
import { TrialDocumentsComponent } from './components/admin/trial-documents/trial-documents.component';
import { NotificationsComponent } from './components/admin/notifications/notifications.component';
import { ApplicationPipesModule } from '../../commons/pipes/pipes.module';
import { AddDocumentDialogService } from '../../commons/dialogs/add-document-dialog/add-document-dialog.service';
import { PagerService } from '../../commons/services/pager.service';
import { ContentManagementService } from './content-management.service';
import { SitesDocumentsComponent } from './components/sites/sites-documents/sites-documents.component';
import { CroDocumentsComponent } from './components/cro/cro-documents/cro-documents.component';
import { SponsorDocumentsComponent } from './components/sponsor/sponsor-documents/sponsor-documents.component';
import { PiDocumentsComponent } from './components/pi/pi-documents/pi-documents.component';
import { VideosComponent } from './components/videos/videos.component';
import { AddVideoDialogComponent } from '../../commons/dialogs/add-video-dialog/add-video-dialog.component';
import { AddDocumentComponent } from './components/admin/add-document/add-document.component';
import { DragulaModule } from 'ng2-dragula';
import { FaqsComponent } from './components/faqs/faqs.component';
@NgModule({
  declarations: [
    TrialDocumentsComponent,
    NotificationsComponent,
    SitesDocumentsComponent,
    CroDocumentsComponent,
    SponsorDocumentsComponent,
    PiDocumentsComponent,
    VideosComponent,
    // FaqsComponent,
    // AddDocumentComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    NgbModule,
    ContentManagementRoutingModule,
    DataTableModule,
    FormsModule,
    ApplicationPipesModule,
    ReactiveFormsModule,
    // DragulaModule.forRoot()
  ],
  providers: [AddDocumentDialogService, PagerService, ContentManagementService],
  entryComponents: [AddUserDialogComponent, AddVideoDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentManagementModule { }
