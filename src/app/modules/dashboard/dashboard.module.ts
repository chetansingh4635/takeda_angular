import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../material/material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ModulesComponent } from '../modules.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationPipesModule } from '../../commons/pipes/pipes.module';
import { DashboardService } from './dashboard/dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    DashboardRoutingModule,
    ApplicationPipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DashboardService],
  entryComponents: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class DashboardModule { }
