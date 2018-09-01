import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppMaterialModule } from '../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpModule} from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { AccountModule } from '../account/account.module';
import { UserManagementModule } from '../modules/user_management/userManagement.module';
import { TrialManagementModule } from '../modules/trial_management/trialManagement.module';
import { ContentManagementModule } from '../modules/content_management/contentManagement.module';
import { DashboardModule } from '../modules/dashboard/dashboard.module';
import { AnalyticsModule } from '../modules/analytics/analytics.module';
import { MachineLearningModule } from './machine-learning/machine-learning.module';
import { AddUserDialogComponent } from '../commons/dialogs/add-user-dialog/add-user-dialog.component';
import { AuthGuard } from '../account/auth/guard/auth.guard';
import { SuperAdminGuard } from '../account/auth/guard/super-admin.guard';
import { AdminGuard } from '../account/auth/guard/admin.guard';
import { SponsorGuard } from '../account/auth/guard/sponsor.guard';
import { CroGuard } from '../account/auth/guard/cro.guard';
import { LocalStorage } from '../commons/services/localStorage.service';
import { HttpService } from '../commons/services/http.service';
import { CommonFunctions } from '../commonFunctions';
import { ModulesComponent } from '../modules/modules.component';
import '../rxjs-operators';
// import { SettingsComponent } from './settings/settings.component';
@NgModule({
  declarations: [
    ModulesComponent,
    // SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    NgbModule,
    AccountModule,
    UserManagementModule,
    TrialManagementModule,
    ContentManagementModule,
    MachineLearningModule,
    DashboardModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [CommonFunctions],
  entryComponents: [],
  bootstrap: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ModulesModule { }
