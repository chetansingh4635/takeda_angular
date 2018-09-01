import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
import { AdminGuard } from '../../account/auth/guard/admin.guard';
import { SuperAdminGuard } from '../../account/auth/guard/super-admin.guard';
import { SponsorGuard } from '../../account/auth/guard/sponsor.guard';
import { CroGuard } from '../../account/auth/guard/cro.guard';
import { PiGuard } from '../../account/auth/guard/pi.guard';
import { SitesGuard } from '../../account/auth/guard/sites.guard';
import { ModulesComponent } from '../modules.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LocalStorage } from '../../commons/services/localStorage.service';
import { Constants } from '../../../config/constant';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';
import { SuperAdminAnalyticsComponent } from './super-admin-analytics/super-admin-analytics.component';
import { SponsorAnalyticsComponent } from './sponsor-analytics/sponsor-analytics.component';
import { CroAnalyticsComponent } from './cro-analytics/cro-analytics.component';
import { PiAnalyticsComponent } from './pi-analytics/pi-analytics.component';
import { SitesAnalyticsComponent } from './sites-analytics/sites-analytics.component';
const constants = Constants;
const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    // canActivate: [AuthGuard],
    children: [
      // { path: '',  redirectTo: 'analytics', pathMatch: 'full' },
      {
        path: `analytics?=${constants.adminId}`,
        canActivate: [AdminGuard],
        component: AdminAnalyticsComponent
      },  {
        path: `analytics?=${constants.superAdminId}`,
        canActivate: [SuperAdminGuard],
        component: SuperAdminAnalyticsComponent
      },
      {
        path: `analytics?=${constants.sponsorId}`,
        canActivate: [SponsorGuard],
        component: SponsorAnalyticsComponent
      },
      {
        path: `analytics?=${constants.croId}`,
        canActivate: [CroGuard],
        component: CroAnalyticsComponent
      },
      {
        path: `analytics?=${constants.piId}`,
        canActivate: [PiGuard],
        component: PiAnalyticsComponent
      },
      {
        path: `analytics?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesAnalyticsComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
