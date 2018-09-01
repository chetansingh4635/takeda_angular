import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../material/material.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    SettingsRoutingModule,
  ],
  providers: [],
  // bootstrap: [SuperAdminComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingsModule { }
