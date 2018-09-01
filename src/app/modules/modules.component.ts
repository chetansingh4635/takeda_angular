import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, ViewChildren, HostListener, DoCheck } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AccountService } from '../account/auth/account.service';
import { CommonFunctions } from '../commonFunctions';
import { LocalStorage } from '../commons/services/localStorage.service';
import { ConfirmDialogComponent } from '../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { Constants } from '../../config/constant';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'tm-user-management',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit, AfterViewInit, DoCheck {

  public toggleleftMenu: boolean;
  public toggleSubMenu: boolean;
  public sectionName = LocalStorage.get('sectionName');
  public constants = Constants;
  public superAdmin: boolean;
  public admin = true;
  public sponser: boolean;
  public cro: boolean;
  public userManagement: boolean;
  public breadCrum: string;
  public trialName = LocalStorage.get('trialName');
  public today: number;
  public role = LocalStorage.get('role');
  public userRole = LocalStorage.get('userRole');
  

  @ViewChild('pageAside') pageAside: ElementRef;
  user: string;
  bredcrum: string;

  constructor(
    public commonf: CommonFunctions,
    public accountService: AccountService,
    public router: Router,
    public renderer2: Renderer2,
    public elementRef: ElementRef,
    public titleService: Title,
    private datePipe: DatePipe,
    public dialog: MatDialog) {

  }

  onLogout() {
    this.accountService.logout();
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: { type: 'logout', user: 'logout' }
    // });
    // dialogRef.afterClosed().subscribe(result => {

    //   if (result === 'yes') {
    //     this.accountService.logout();
    //   }
    // });
  }

  onToggleLeftMenu() {
    this.toggleleftMenu = !this.toggleleftMenu;
    if(this.pageAside){
    this.renderer2.setStyle(this.pageAside.nativeElement, 'height', window.innerHeight + 'px');
    }
  }

  onToggleSubMenu(sectionName) {
    this.sectionName = sectionName;
    switch (sectionName) {
      case 'dashboard': {
        this.router.navigate([`dashboard/dashboard?=${this.role}`]);
        break;
      }
      case 'userManagement': {
        if (this.role === this.constants.superAdminId) {
          this.router.navigate([`userManagement/admin?=${this.role}`]);
        } else if (this.role === this.constants.adminId) {
          this.router.navigate([`userManagement/sponsor?=${this.role}`]);
        } else if (this.role === this.constants.croId || this.role === this.constants.piId || this.role === this.constants.sitesId) {
          this.router.navigate([`userManagement/allSubjects?=${this.role}`]);
        }
        break;
      }
      case 'trialManagement': {
        this.router.navigate([`trialManagement/viewTrials?=${this.role}`]);
        break;
      }
      case 'contentManagement': {
        if (this.role === this.constants.adminId || this.role === this.constants.croId || this.role === this.constants.piId
          || this.role === this.constants.sitesId || this.role === this.constants.sponsorId) {
          this.router.navigate([`contentManagement/allDocs?=${this.role}`]);
        }
        break;
      }
      case 'analytics': {
        this.router.navigate([`analytics/analytics?=${this.role}`]);
        break;
      }
      case 'machineLearning': {
        this.router.navigate([`machineLearning/generateInformedConsentForm?=${this.role}`]);
        break;
      }
    }
    LocalStorage.set('sectionName', this.sectionName);
    // if (this.role === 'superAdmin') {
    //   this.router.navigate(['userManagement/admin');
    // } else if (this.role === 'admin') {
    //   this.router.navigate(['contentManagement/allDocs');
    // } else if (this.role === 'sponsor') {
    //   this.router.navigate(['contentManagement/documents');
    // } else {
    //   this.router.navigate(['userManagement/hotPatients');
    // }
    this.toggleleftMenu = true;

  }

  //  ===========onWindowResize=============
  // @HostListener('window:resize', []) onWindowResize() {
  //   if (this.commonf.checkScreenSize() === 'tablet') {
  //     this.toggleleftMenu = false;
  //     console.log('tablet size found...');
  //   } else {
  //     this.toggleleftMenu = true;
  //   }
  // }
  //  ===========onWindowResize end=============

  ngAfterViewInit() {
    // ====if tablet window===
    if (this.commonf.wWidth() <= 992) {
      this.toggleleftMenu = false;
    } else {
      this.toggleleftMenu = true;
    }
    if(this.sectionName === 'dashboard'){
      this.onToggleLeftMenu();
    }

    // ====if tablet window end===
  }

  ngOnInit() {
  // this.userRole = 'Site Coordinator';

if (this.userRole){
  this.userRole = this.userRole.toUpperCase();
}
    this.today = Date.now();
    this.onToggleSubMenu(LocalStorage.get('sectionName'));
    // const bredcrum = document.getElementById('breadcrum');
    // const urlArray = window.location.hash.split('/');
    // urlArray.shift();
    // this.breadCrum = this.commonf.bredcrum(urlArray);
    //  const routUrlArray = bredcrum.textContent.substring(1).split('/');
    //  bredcrum.innerHTML = this.commonf.bredcrum(routUrlArray);
    if (localStorage.getItem('isUserLoggedIn')) {
      this.user = localStorage.getItem('nickName');
    }
    // this.router.events.subscribe((routerEvent: any) => {
    //   const routUrl = routerEvent.urlAfterRedirects;
    //   const bredcrum = document.getElementById('breadcrum');
    //   if (routUrl) {
    //     bredcrum.innerHTML = routUrl;
    //   } else {

    //   }

    // }, (error: Error) => {
    //   console.log('error', error);
    // });
  }
  public navigateToDocuments(type) {
    switch (type) {
      case 'allDocs': {
        return `allDocs?=${this.role}`;
      }
      case 'icfOfficial': {
        return `icfOfficial?=${this.role}`;
      }
      case 'icfExplanatory': {
        return `icfExplanatory?=${this.role}`;
      }
      case 'invitationLetter': {
        return `invitationLetter?=${this.role}`;
      }
      case 'studyDescription': {
        return `studyDescription?=${this.role}`;
      }
      case 'faqs': {
        return `faqs?=${this.role}`;
      }
      case 'videos': {
        return `videos?=${this.role}`;
      }
    }
  }
  public navigateToSubjects(type) {

    switch (type) {
      case 'allSubjects': {
        return `allSubjects?=${this.role}`;
      }
      case 'identified': {
        return `identified?=${this.role}`;
      }
      case 'qualified': {
        return `qualified?=${this.role}`;
      }
      case 'preConsented': {
        return `preConsented?=${this.role}`;
      }
      case 'consented': {
        return `consented?=${this.role}`;
      }
      case 'admin': {
        return `admin?=${this.role}`;
      }
      case 'sponsor': {
        return `sponsor?=${this.role}`;
      }
      case 'cro': {
        return `cro?=${this.role}`;
      }
      case 'pi': {
        return `pi?=${this.role}`;
      }
      case 'siteCoordinator': {
        return `siteCoordinator?=${this.role}`;
      }
      case 'irb': {
        return `irb?=${this.role}`;
      }
      case 'machineLearning': {
        return `generateInformedConsentForm?=${this.role}`;
      }
    }
  }
  ngDoCheck(): void {
    const bredcrum = document.getElementById('breadcrum');
    let url = window.location.hash;
    const lastIndex = window.location.hash.length - 30;
    url = window.location.hash.slice(0, lastIndex);
    const urlArray = url.split('/');
    urlArray.shift();
    this.breadCrum = this.commonf.bredcrum(urlArray);
   
    this.breadCrum = this.breadCrum.replace("pre Consented", "Interest Expressed");

  }

}

// ===Functions for window resize===
// window.onresize = function () {
//   // document.getElementById('pageAside').style.height = window.innerHeight + 'px';
//   // document.getElementById('dataTable').style.minHeight = window.innerHeight + 'px';
// };


