import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'userManagement',
    loadChildren: 'app/modules/user_management/userManagement.module#UserManagementModule',
    data: { title: 'User Management' }
  },
  {
    path: 'trialManagement',
    loadChildren: 'app/modules/trial_management/trialManagement.module#TrialManagementModule',
    data: { title: 'Trial Management' }
  },
  {
    path: 'contentManagement',
    loadChildren: 'app/modules/content_management/contentManagement.module#ContentManagementModule',
    data: { title: 'Content Management' }
  },
  {
    path: 'analytics',
    loadChildren: 'app/modules/analytics/analytics.module#AnalyticsModule',
  },
  {
    path: 'dashboard',
    loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'settings',
    loadChildren: 'app/modules/settings/settings.module#SettingsModule',
  },
  {
    path: 'machineLearning',
    loadChildren: 'app/modules/machine-learning/machine-learning.module#MachineLearningModule',
  },
  // {
  //   path         : 'chatbot',
  //   loadChildren : 'app/modules/chatbot/chatbot.module#ChatbotModule',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
