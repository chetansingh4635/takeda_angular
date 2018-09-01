import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesComponent } from '../modules.component';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
import { AdminGuard } from '../../account/auth/guard/admin.guard';
import { MachineLearningComponent } from './machine-learning.component';
import { GenerateInformedConsentFormComponent } from './components/generate-informed-consent-form/generate-informed-consent-form.component';
import { Constants } from '../../../config/constant';
const constant = Constants;

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ModulesComponent,
    children: [
      {
        path: `generateInformedConsentForm?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: GenerateInformedConsentFormComponent,
        data: [{ title: 'Generate Informed Consent Form' }]
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachineLearningRoutingModule { }
