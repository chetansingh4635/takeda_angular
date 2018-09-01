import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../account/auth/guard/auth.guard';
import { AdminGuard } from '../../account/auth/guard/admin.guard';
import { SponsorGuard } from '../../account/auth/guard/sponsor.guard';
import { CroGuard } from '../../account/auth/guard/cro.guard';
import { PiGuard } from '../../account/auth/guard/pi.guard';
import { SitesGuard } from '../../account/auth/guard/sites.guard';
import { ModulesComponent } from '../modules.component';
import { NotificationsComponent } from './components/admin/notifications/notifications.component';
import { TrialDocumentsComponent } from './components/admin/trial-documents/trial-documents.component';
import { SitesDocumentsComponent } from './components/sites/sites-documents/sites-documents.component';
import { CroDocumentsComponent } from './components/cro/cro-documents/cro-documents.component';
import { SponsorDocumentsComponent } from './components/sponsor/sponsor-documents/sponsor-documents.component';
import { PiDocumentsComponent } from './components/pi/pi-documents/pi-documents.component';
import { Constants } from '../../../config/constant';
import { VideosComponent } from './components/videos/videos.component';
import { AddDocumentComponent } from './components/admin/add-document/add-document.component';
import { FaqsComponent } from './components/faqs/faqs.component';
const constant = Constants;
const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ModulesComponent,
    children: [

      // Admin Routes
      {
        path: `allDocs?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: TrialDocumentsComponent,
        data: [{ title: 'Trial Document' }]
      },
      {
        path: `icfOfficial?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: TrialDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfExplanatory?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: TrialDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `invitationLetter?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: TrialDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `studyDescription?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: TrialDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `faqs?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: FaqsComponent,
        data: { title: 'Faqs' }
      },
      {
        path: `videos?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: VideosComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfOfficial/addDocument?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: AddDocumentComponent,
        data: { title: 'ICF Official', docId:constant.icfOfficialId}
      },
      {
        path: `icfExplanatory/addDocument?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: AddDocumentComponent,
        data: { title: 'ICF Explanatory', docId:constant.icfExplanatoryId }
      },
      {
        path: `invitationLetter/addDocument?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: AddDocumentComponent,
        data: { title: 'Invitation Letter', docId:constant.invitaionLetterId }
      },
      {
        path: `studyDescription/addDocument?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: AddDocumentComponent,
        data: { title: 'Study Description', docId:constant.studyDescriptionId }
      },
      {
        path: `faqs/addDocument?=${constant.adminId}`,
        canActivate: [AdminGuard],
        component: FaqsComponent,
        data: { title: 'Faqs' }
      },
      
      // CRO Routes
      {
        path: `allDocs?=${constant.croId}`,
        canActivate: [CroGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfOfficial?=${constant.croId}`,
        canActivate: [CroGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfExplanatory?=${constant.croId}`,
        canActivate: [CroGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `invitationLetter?=${constant.croId}`,
        canActivate: [CroGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `studyDescription?=${constant.croId}`,
        canActivate: [CroGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `faqs?=${constant.croId}`,
        canActivate: [CroGuard],
        component: FaqsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `videos?=${constant.croId}`,
        canActivate: [CroGuard],
        component: VideosComponent,
        data: { title: 'Videos' }
      },

      // PI Routes
      {
        path: `allDocs?=${constant.piId}`,
        canActivate: [PiGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfOfficial?=${constant.piId}`,
        canActivate: [PiGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfExplanatory?=${constant.piId}`,
        canActivate: [PiGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `invitationLetter?=${constant.piId}`,
        canActivate: [PiGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `studyDescription?=${constant.piId}`,
        canActivate: [PiGuard],
        component: CroDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `faqs?=${constant.piId}`,
        canActivate: [PiGuard],
        component: FaqsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `videos?=${constant.piId}`,
        canActivate: [PiGuard],
        component: VideosComponent,
        data: { title: 'Videos' }
      },

      // Sites Routes
      {
        path: `allDocs?=${constant.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfOfficial?=${constant.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfExplanatory?=${constant.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `invitationLetter?=${constant.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `studyDescription?=${constant.sitesId}`,
        canActivate: [SitesGuard],
        component: SitesDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `faqs?=${constant.sitesId}`,
        canActivate: [SitesGuard],
        component: FaqsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `videos?=${constant.sitesId}`,
        canActivate: [SitesGuard],
        component: VideosComponent,
        data: { title: 'Videos' }
      },

      // Sponsor Routes
      {
        path: `allDocs?=${constant.sponsorId}`,
        canActivate: [SponsorGuard],
        component: SponsorDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfOfficial?=${constant.sponsorId}`,
        canActivate: [SponsorGuard],
        component: SponsorDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `icfExplanatory?=${constant.sponsorId}`,
        canActivate: [SponsorGuard],
        component: SponsorDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `invitationLetter?=${constant.sponsorId}`,
        canActivate: [SponsorGuard],
        component: SponsorDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `studyDescription?=${constant.sponsorId}`,
        canActivate: [SponsorGuard],
        component: SponsorDocumentsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `faqs?=${constant.sponsorId}`,
        canActivate: [SponsorGuard],
        component: FaqsComponent,
        data: { title: 'Trial Document' }
      },
      {
        path: `videos?=${constant.sponsorId}`,
        canActivate: [SponsorGuard],
        component: VideosComponent,
        data: { title: 'Videos' }
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagementRoutingModule { }
