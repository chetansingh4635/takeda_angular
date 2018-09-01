import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
// import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { InitiateTrialComponent } from './components/admin/initiate-trial/initiate-trial.component';
// import { AdminDashboardComponent } from '../dashboard/admin-dashboard/admin-dashboard.component';
// import { CroComponent } from './components/cro/cro.component';
import { ModulesComponent } from '../modules.component';
import { Constants } from '../../../config/constant';
const constants = Constants;
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ModulesComponent,
    children: [
      // { path: '',  redirectTo: 'viewTrials', pathMatch: 'full' },
      { path: `viewTrials?=${constants.adminId}`,   component: InitiateTrialComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrialManagementRoutingModule { }
