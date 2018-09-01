import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
import { AdminGuard } from '../../account/auth/guard/admin.guard';
import { SponsorGuard } from '../../account/auth/guard/sponsor.guard';
import { CroGuard } from '../../account/auth/guard/cro.guard';
import { PiGuard } from '../../account/auth/guard/pi.guard';
import { SitesGuard } from '../../account/auth/guard/sites.guard';
import { ModulesComponent } from '../modules.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocalStorage } from '../../commons/services/localStorage.service';
import { Constants } from '../../../config/constant';
import { SuperAdminGuard } from '../../account/auth/guard/super-admin.guard';
const constants = Constants;

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '',  redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: `dashboard?=${constants.adminId}`,
        canActivate: [AdminGuard],
        component: DashboardComponent
      },
      {
        path: `dashboard?=${constants.superAdminId}`,
        canActivate: [SuperAdminGuard],
        component: DashboardComponent
      },
      {
        path: `dashboard?=${constants.croId}`,
        canActivate: [CroGuard],
        component: DashboardComponent
      },
      {
        path: `dashboard?=${constants.piId}`,
        canActivate: [PiGuard],
        component: DashboardComponent
      },
      {
        path: `dashboard?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: DashboardComponent
      },
      {
        path: `dashboard?=${constants.sponsorId}`,
        canActivate: [SponsorGuard],
        component: DashboardComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
