import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive, NavigationEnd } from '@angular/router';
import { LocalStorage } from '../../../commons/services/localStorage.service';
import { Constants } from '../../../../config/constant';
import { InitiateTrialDialogComponent } from '../../../commons/dialogs/initiate-trial-dialog/initiate-trial-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { DashboardService } from './dashboard.service';
import { LoaderService } from '../../../commons/services/loader.service';
import { ToasterService } from 'angular2-toaster';
import * as _ from 'lodash';
@Component({
  selector: 'tm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user: string;
  public constants = Constants;
  public roleID = LocalStorage.get('role');
  public item: boolean;
  public trialList: any = [];
  public searchFilter: string;
  public filteredData: any = [];
  constructor(public router: Router, public dashboardService: DashboardService, public loaderService: LoaderService, public toasterService: ToasterService, public dialog: MatDialog) { }

  ngOnInit() {

    if (localStorage.getItem('isUserLoggedIn')) {
      this.user = localStorage.getItem('nickName');
    }

    this.loaderService.display(true);
    this.dashboardService.getTrialList().subscribe((data) => {
      this.loaderService.display(false);
      console.log(data);
      this.trialList = data.data;
      this.filteredData = Object.assign([], this.trialList);
    },
      (err) => {
        console.log(err);

      })
    const thisPage = <HTMLElement>document.querySelector('#page');
    thisPage.style.background = '#eff3f6';
    // thisPage.style.overflow = 'hidden';

    const thispageContainer = <HTMLElement>document.querySelector('#pageContainer');
    thispageContainer.style.marginLeft = '0px';


  }



  public addTrial(userDetails, callFrom): void {
    const dialogRef = this.dialog.open(InitiateTrialDialogComponent, {
      data: { data: userDetails, isEdit: callFrom === 'add' ? false : true },
      height: '500px',
      width: '900px',
      
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.loaderService.display(true);
        this.dashboardService.createTrial(result).subscribe((data) => {
          this.loaderService.display(false);
          this.toasterService.pop('success', 'Trial Created Successfuuly');
          console.log(data);
          this.ngOnInit();
        },
          (err) => {
            console.log(err);
           const message = JSON.parse(err._body).message;
            this.toasterService.pop('error', message);
            this.loaderService.display(false);
          })

      }

    });

  }

  OnClickSectionbtn(sectionName, card) {
    const role = LocalStorage.get('role');
    LocalStorage.remove('trialId');
    LocalStorage.remove('trialName');
    LocalStorage.remove('tId');
    LocalStorage.set('trialId', card.trialName);
    LocalStorage.set('trialName', card.trialName);
    LocalStorage.set('tId', card._id);
    switch (sectionName) {
      case 'userManagement': {
        LocalStorage.set('sectionName', sectionName);
        if (role === this.constants.superAdminId) {
          this.router.navigate([`../userManagement/admin?=${role}`]);
        } else if (role === this.constants.adminId) {
          console.log(this.router.url);
          this.router.navigate([`../userManagement/sponsor?=${role}`]);
        } else if (role === this.constants.croId || role === this.constants.piId || role === this.constants.sitesId) {
          this.router.navigate([`../userManagement/allSubjects?=${role}`]);
        }
        break;
      }
      case 'trialManagement': {
        LocalStorage.set('sectionName', sectionName)
        this.router.navigate([`../trialManagement/viewTrials?=${role}`]);
        break;
      }
      case 'contentManagement': {
        LocalStorage.set('sectionName', sectionName);
        if (role === this.constants.adminId || role === this.constants.croId || role === this.constants.piId
          || role === this.constants.sitesId || role === this.constants.sponsorId) {
          this.router.navigate([`../contentManagement/allDocs?=${role}`]);
        }
        break;
      }
    }
  }

  OnClickSectionbtnInactive(){
    this.toasterService.pop('info', 'Trial is Inactive', '');
  }

  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.trialList = _.filter(this.filteredData, row => {
        return (row['trialName'].search(new RegExp(query, 'i')) !== -1) ||
          (row['trialTitle'].search(new RegExp(query, 'i')) !== -1) ||
          (row['trialProtocolNumber'].search(new RegExp(query, 'i')) !== -1);
      });
      return;
    } else {
      this.trialList = this.filteredData;
      return;
    }
  }
}
// // // import OnInit from core
// // our root app component
// import { Component, NgModule, OnInit, VERSION, AfterContentInit } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// // need to call this var tablau
// // because it is referencing the tableau js library
// declare var tableau: any;

// @Component({
//   selector: 'tm-tab',
//   template: `
//     <div>
//       <h2>Hello {{name}}</h2>
//     </div>
//     <!-- create a div tag with id tableaViz -->
//     <div id="tableauViz"></div>
//   `,
// })
// export class DashboardComponent implements OnInit, AfterContentInit {

//   // now declare an instance var
//   tableauViz: any;
//   workbook: any;
//   activeSheet: any;
//   name: string;
//   constructor() {
//     this.name = '';
//   }

//   // this code is verbatim from Tableau API
//   // just replace the url with my Viz in public
//   ngOnInit() {

//   }
//   ngAfterContentInit() {
//     const placeholderDiv = document.getElementById('tableauViz');
//     const url = 'https://public.tableau.com/views/sampleworkbook2_0/Sheet1?:embed=yes&:toolbar=no';
//     const options = {
//       hideTabs: true,
//       width: '800px',
//       height: '700px',
//       toolbar: false,
//       onFirstInteractive: function () {
//         this.workbook = this.tableauViz.getWorkbook();
//         this.activeSheet = this.workbook.getActiveSheet();
//         // The viz is now ready and can be safely used.
//       }
//     };
//     this.tableauViz = new tableau.Viz(placeholderDiv, url);
//   }
// }
