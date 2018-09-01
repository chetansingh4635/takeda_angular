import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {HttpModule, RequestOptions, Http, XHRBackend } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../material/material.module';
import { AccountRouterModule } from './account-router.module';
import { Router } from '@angular/router';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AccountService } from './auth/account.service';
import { LocalStorage } from '../commons/services/localStorage.service';
import { HttpService } from '../commons/services/http.service';
import { ToasterService} from 'angular2-toaster';
import { SetpasswordComponent } from './setpassword/setpassword.component';
export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, router: Router, toasterService: ToasterService) {
  return new HttpService(backend, defaultOptions, router, toasterService);
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    AccountRouterModule,
    HttpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountComponent,
    LoginComponent,
    ForgotpasswordComponent,
    SetpasswordComponent
  ],
  providers: [{
        provide: HttpService,
    useFactory: httpFactory,
    deps: [XHRBackend, RequestOptions, Router]
  },
  AccountService
   ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AccountModule { }
