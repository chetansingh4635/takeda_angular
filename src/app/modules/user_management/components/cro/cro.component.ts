import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AddUserDialogComponent } from '../../../../commons/dialogs/add-user-dialog/add-user-dialog.component';
// import { ConfirmDialogComponent } from '../../../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { AddSubjectDialogComponent } from '../../../../commons/dialogs/add-subject-dialog/add-subject-dialog.component';
import { AssignSiteDialogComponent } from '../../../../commons/dialogs/assign-site-dialog/assign-site-dialog.component';
import { LoaderService } from '../../../../commons/services/loader.service';
import { UserManagementService } from '../../user-management.service';
import { PagerService } from '../../../../commons/services/pager.service';
import { ToasterService } from 'angular2-toaster';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
// import { CROService } from './cro.service';


@Component({
  selector: 'tm-cro',
  templateUrl: './cro.component.html',
  styleUrls: ['./cro.component.css']
})
export class CroComponent implements OnInit {

  temp: any;
  hotPatientsData: any;
  warmPatientsData: any;
  currentTabIndex = 0;
  public hotPatientsFilter: any;
  public warmPatientsFilter: any;
  public sortType: string;
  public searchFilter: any;
  public subjectData: any;
  public subjectDataFilter: any;
  public url: string;
  public temporaryData: any = [];
  public paginationData: any = [];
  public filteredData: any = [];
  pager: any = {};
  pagedItems: any[];
  public sitesList: any;
  public selectedValue = [];
  public defaultSiteType: any = [];
  public siteTypeValue = [];


  // @ViewChild('userManagementTab') userManagementTab: MatTabGroup;
  public arrayOne(n: number): any[] {
    n = 9 - n;
    return Array(n);
  }
  constructor(private loaderService: LoaderService,
    private userManagementService: UserManagementService,
    public router: Router,
    private datePipe: DatePipe,
    private pagerService: PagerService,
    private toaterService: ToasterService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log("oninit");
    
    this.url = this.router.url;
    const lastIndex = this.url.length - 30;
    this.url = this.url.slice(0, lastIndex);
    const index = this.url.lastIndexOf('/');
    this.url = this.url.slice(index + 1, this.url.length);
    this.loaderService.display(true);
    this.allSites();
  }

  public updateSubject(message) {
    this.userManagementService.getSubjectList(this.url).subscribe((data) => {
      // console.log(data);
      if (message === 'QUALIFY') {
        this.toaterService.pop('success', 'Subject Qualified Successfully', '');
      } else if (message === 'ASSIGN') {
        this.toaterService.pop('success', 'Site Added Successfully', '');
      } else if (message) {
        this.toaterService.pop('success', message, '')
      }
      this.subjectDataFilter = Object.assign([], data.data);
      switch (this.url) {
        case 'allSubjects': this.getSubjectList('allSubjects'); break;
        case 'identified': this.getSubjectList('identified'); break;
        case 'qualified': this.getSubjectList('qualified'); break;
        case 'preConsented': this.getSubjectList('preConsented'); break;
        case 'consented': this.getSubjectList('consented'); break;
      }
    },
      (err) => {
        console.log(err);
      });

  }

  public allSites(): void {
    this.userManagementService.getSITESList().subscribe((data) => {
      this.sitesList = data.data;
      this.updateSubject(undefined);
      this.sitesList.forEach(addSite => {
        this.siteTypeValue.push(addSite.siteName);
      });
      // console.log(this.siteTypeValue);

      this.defaultSiteType = Object.assign([], this.siteTypeValue);


      this.selectedValue = this.selectedValue.concat(this.siteTypeValue);
      // console.log(this.defaultSiteType);

    },
      err => {
        console.log(err);
      }
    );
  }

  public toggle(event, type, value) {
    switch (type) {
      case 'allSites': {
        // this.toggleFilterSubmenu('showAllStatus');
        if (event.checked) {
          this.siteTypeValue = Object.assign([], this.defaultSiteType);

        } else {
          this.siteTypeValue = [];
        }
        break
      }
      case 'site': {
        const index = this.siteTypeValue.indexOf(value);
        if (index > -1) {
          this.siteTypeValue.splice(index, 1);
        } else {
          this.siteTypeValue.splice(index, 0, value);
        }

        // console.log(this.siteTypeValue);
        break
      }
      case 'toggle': break;
    }
    this.selectedValue = this.selectedValue.concat(this.siteTypeValue);
    this.filterSubjects();
    // console.log('parent', event);

  }

  public addSubject(): void {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width: '700px',
      data: { type: 'CRO' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const dataObj = {
          nickName: result.subjectName,
          emailId: result.subjectEmail,
          siteId: result.siteId,
          siteName: result.siteName
        };
        this.loaderService.display(true);
        this.userManagementService.addSubject(dataObj).subscribe((data) => {
          this.updateSubject('Subject Added Successfully');
        },
          (error) => {
            console.log(error);
            this.loaderService.display(false);
            // error = JSON.parse(error._body);
            this.toaterService.pop('error', JSON.parse(error._body).message.split(':')[0], '');
            // this.toaterService.pop('error', error.message, '');
          });
      } else {
        console.log('no data');
      }
    });

  }

  public assignSite(item, type, subjectName): void {
    if (type === 'QUALIFY') {
      const dialogRef = this.dialog.open(AssignSiteDialogComponent, {
        width: '600px',
        data: { type: type, subjectName: subjectName }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const dataObj = {
            siteId: result.siteId,
            siteName: result.siteName
          };
          this.loaderService.display(true);
          this.userManagementService.qualifySubject(dataObj, item).subscribe((data) => {
            this.updateSubject(type);
          },
            (error) => {
              console.log(error);
              this.loaderService.display(false);
              // error = JSON.parse(error._body);
              this.toaterService.pop('error', JSON.parse(error._body).message.split(':')[0], '');
            });
        } else {
          console.log('no data');
        }
      });
    }
    if (type === 'ASSIGN') {
      const dialogRef = this.dialog.open(AssignSiteDialogComponent, {
        width: '500px',
        data: { type: type, subjectName: subjectName }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const dataObj = {
            siteId: result.siteId,
            siteName: result.siteName
          };
          this.loaderService.display(true);
          this.userManagementService.updateSubjectAssign(dataObj, item).subscribe((data) => {
            this.updateSubject(type);
          },
            (error) => {
              console.log(error);
              this.loaderService.display(false);
              // error = JSON.parse(error._body);
              this.toaterService.pop('error', JSON.parse(error._body).message.split(':')[0], '');
            });
        } else {
          console.log('no data');
        }
      });
    }
    if (type === 'REJECT') {
      this.loaderService.display(true);
      const dataObj = {
        deleteStatus: true
      };
      this.userManagementService.deleteSubject(dataObj, item).subscribe((data) => {
        this.updateSubject('Subject Rejected Successfully');
      },
        (error) => {
          console.log(error);
          this.loaderService.display(false);
          // error = JSON.parse(error._body);
          this.toaterService.pop('error', JSON.parse(error._body).message.split(':')[0], '');
        });
    } else {
      console.log('no data');
    }
  }
  public getSubjectList(type) {
    this.loaderService.display(false);
    switch (type) {
      case 'allSubjects': {
        this.temporaryData = this.subjectDataFilter.filter((row) => {
          return (row.status.toLowerCase() === 'all subjects'
            || row.status.toLowerCase() === 'identified'
            || row.status.toLowerCase() === 'qualified'
            || row.status.toLowerCase() === 'pre consented'
            || row.status.toLowerCase() === 'consented');
        });
        break;
      }
      case 'identified': {
        this.temporaryData = this.subjectDataFilter.filter((row) => {
          return (row.status.toLowerCase() === 'identified');
        });
        break;
      } case 'qualified': {
        this.temporaryData = this.subjectDataFilter.filter((row) => {
          return (row.status.toLowerCase() === 'qualified');
        });
        break;
      }
      case 'preConsented': {
        this.temporaryData = this.subjectDataFilter.filter((row) => {
          return (row.status.toLowerCase() === 'pre consented');
        });
        break;
      }
      case 'consented': {
        this.temporaryData = this.subjectDataFilter.filter((row) => {
          return (row.status.toLowerCase() === 'consented');
        });
        break;
      }

    }
    this.filterSubjects();
  }

  public viewSignature(subjectId, type) {
    this.loaderService.display(true);
    this.userManagementService.viewSignature(subjectId, type).subscribe(data => {
      this.loaderService.display(false);
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL);
    },
      err => {
        this.loaderService.display(false);
        console.log(err);
      }
    );
  }
  public filterSubjects() {
    this.selectedValue = this.siteTypeValue;
    this.paginationData = _.filter(this.temporaryData, (row) => {
      return (row.siteName ? this.siteTypeValue.indexOf(row.siteName) > - 1 : true);

    });
    this.filteredData = this.paginationData;
    this.setPage(1);
    this.searchData();
  }


  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.paginationData.length, page);
    if (page < 1 || page > this.pager.totalPages) {
      this.subjectData = [];
      return;
    }
    this.subjectData = this.paginationData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log(this.subjectData);

  }

  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.paginationData = _.filter(this.filteredData, row => {
        return (row['subjectId'] ? row['subjectId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['nickName'] ? row['nickName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['emailId'] ? row['emailId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['siteId'] ? (row['siteId'].search(new RegExp(query, 'i')) !== -1) : 0) ||
          (row['siteName'] ? row['siteName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['enrollmentVisit'] ? row['enrollmentVisit'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['eSign'] ? row['eSign'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['wetSign'] ? row['wetSign'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['status'] ? row['status'].search(new RegExp(query, 'i')) !== -1 : 0);
      });
      this.setPage(1);
      return;
    } else {
      this.paginationData = this.filteredData;
      this.setPage(1);
      return;
    }
  }

}
