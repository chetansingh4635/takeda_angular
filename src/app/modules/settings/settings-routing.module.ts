import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../account/auth/guard/admin.guard';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
import { ModulesComponent } from '../modules.component';
import { SettingsComponent } from './settings.component';


const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '',  redirectTo: 'settings', pathMatch: 'full' },
      {
        path: 'settings',
        component: SettingsComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
