import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import {LoginComponent} from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'prefix'},
  {
    path: '',
    component :  AccountComponent,
    children: [
      { path: 'login',           component: LoginComponent, data: { title: 'TryMe4U Login'}  },
      { path: 'forgotPassword',  component: ForgotpasswordComponent,  data: { title: 'Forgot Password'}  },
      { path: 'setPassword',  component: SetpasswordComponent,  data: { title: 'Set Password'}  },
    ],
  },
];

@NgModule({
  // imports: [
  //   RouterModule.forChild(routes),
  // ],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AccountRouterModule { }
