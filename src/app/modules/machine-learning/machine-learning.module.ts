import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppMaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MachineLearningService } from './machine-learning-service.service';
import { MachineLearningRoutingModule } from './machine-learning-routing.module';
import { MachineLearningComponent } from './machine-learning.component';
import { GenerateInformedConsentFormComponent } from './components/generate-informed-consent-form/generate-informed-consent-form.component';

import { SelectLanguageDialogComponent } from './dialogs/select-language-dialog/select-language-dialog.component';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { DownloadDialogComponent } from './dialogs/download-dialog/download-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    NgbModule,
    MachineLearningRoutingModule
  ],
  declarations: [
    MachineLearningComponent,
    GenerateInformedConsentFormComponent,
    SelectLanguageDialogComponent,
    SuccessDialogComponent,
    DownloadDialogComponent
  ],
  providers: [MachineLearningService],
  entryComponents: [SelectLanguageDialogComponent, SuccessDialogComponent, DownloadDialogComponent],
})
export class MachineLearningModule { }
