import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminGuard } from '../../account/auth/guard/super-admin.guard';
import { AdminGuard } from '../../account/auth/guard/admin.guard';
import { PiGuard } from '../../account/auth/guard/pi.guard';
import { SitesGuard } from '../../account/auth/guard/sites.guard';
import { SponsorGuard } from '../../account/auth/guard/sponsor.guard';
import { CroGuard } from '../../account/auth/guard/cro.guard';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
import { AppComponent } from '../../app.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { CroComponent } from './components/cro/cro.component';
import { ModulesComponent } from '../modules.component';
import { LocalStorage } from '../../commons/services/localStorage.service';
import { Constants } from '../../../config/constant';
import { PiComponent } from './components/pi/pi.component';
import { SitesComponent } from './components/sites/sites.component';
import { VisiteSetupComponent } from './components/sites/consented/visite-setup/visite-setup.component';
import { MedicationSetupComponent } from './components/sites/consented/medication-setup/medication-setup.component';

const role = localStorage.getItem('role');
const constants = Constants;
const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '',  redirectTo: 'cro', pathMatch: 'prefix' },

      // Super Admin Routes

      {
        path: `admin?=${constants.superAdminId}`,
        canActivate: [SuperAdminGuard],
        component: SuperAdminComponent
      },
      {
        path: `sponsor?=${constants.superAdminId}`,
        canActivate: [SuperAdminGuard],
        component: SuperAdminComponent
      },

      // Admin Routes
      {
        path: `sponsor?=${constants.adminId}`,
        canActivate: [AdminGuard],
        component: AdminComponent
      },
      {
        path: `cro?=${constants.adminId}`,
        canActivate: [AdminGuard],
        component: AdminComponent
      },
      {
        path: `pi?=${constants.adminId}`,
        canActivate: [AdminGuard],
        component: AdminComponent
      },
      {
        path: `irb?=${constants.adminId}`,
        canActivate: [AdminGuard],
        component: AdminComponent
      },
      {
        path: `siteCoordinator?=${constants.adminId}`,
        canActivate: [AdminGuard],
        component: AdminComponent
      },

      // CRO Routes
      {
        path: `allSubjects?=${constants.croId}`,
        canActivate: [CroGuard],
        component: CroComponent
      },
      {
        path: `identified?=${constants.croId}`,
        canActivate: [CroGuard],
        component: CroComponent
      },
      {
        path: `qualified?=${constants.croId}`,
        canActivate: [CroGuard],
        component: CroComponent
      },
      {
        path: `preConsented?=${constants.croId}`,
        canActivate: [CroGuard],
        component: CroComponent
      },
      {
        path: `consented?=${constants.croId}`,
        canActivate: [CroGuard],
        component: CroComponent,
      },
      // PI Routes
      {
        path: `allSubjects?=${constants.piId}`,
        canActivate: [PiGuard],
        component: CroComponent
      },
      {
        path: `identified?=${constants.piId}`,
        canActivate: [PiGuard],
        component: CroComponent
      },
      {
        path: `qualified?=${constants.piId}`,
        canActivate: [PiGuard],
        component: CroComponent
      },
      {
        path: `preConsented?=${constants.piId}`,
        canActivate: [PiGuard],
        component: CroComponent
      },
      {
        path: `consented?=${constants.piId}`,
        canActivate: [PiGuard],
        component: CroComponent
      },


      // Sites Routes
      {
        path: `allSubjects?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesComponent
      },
      {
        path: `identified?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesComponent
      },
      {
        path: `qualified?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesComponent
      },
      {
        path: `preConsented?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesComponent
      },
      {
        path: `consented?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesComponent
      },
      {
        path: `medicationSetup?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: MedicationSetupComponent,
        data : {}
      },
      {
        path: `visitSetup?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: VisiteSetupComponent,
        data : {}
      },
      {
        path: `viewMedication?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: MedicationSetupComponent,
        data : {view: true}
      },
      {
        path: `viewVisit?=${constants.sitesId}`,
        canActivate: [SitesGuard],
        component: VisiteSetupComponent,
        data : {view:true}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
