import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../material/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { ModulesComponent } from '../modules.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ApplicationPipesModule } from '../../commons/pipes/pipes.module';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';
import { SuperAdminAnalyticsComponent } from './super-admin-analytics/super-admin-analytics.component';
import { SponsorAnalyticsComponent } from './sponsor-analytics/sponsor-analytics.component';
import { CroAnalyticsComponent } from './cro-analytics/cro-analytics.component';
import { PiAnalyticsComponent } from './pi-analytics/pi-analytics.component';
import { SitesAnalyticsComponent } from './sites-analytics/sites-analytics.component';
@NgModule({
  declarations: [
    AnalyticsComponent,
    AdminAnalyticsComponent,
    SuperAdminAnalyticsComponent,
    SponsorAnalyticsComponent,
    CroAnalyticsComponent,
    PiAnalyticsComponent,
    SitesAnalyticsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppMaterialModule,
    NgbModule,
    AnalyticsRoutingModule,
    ApplicationPipesModule
  ],
  providers: [],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AnalyticsModule { }
