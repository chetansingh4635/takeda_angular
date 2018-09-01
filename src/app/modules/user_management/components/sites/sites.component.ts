import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../../../config/constant';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../../../../commons/services/loader.service';
import { UserManagementService } from '../../user-management.service';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../../config/appConfig';
import { PagerService } from '../../../../commons/services/pager.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AddSubjectDialogComponent } from '../../../../commons/dialogs/add-subject-dialog/add-subject-dialog.component';
import { UploadWetDialogComponent } from '../../../../commons/dialogs/upload-wet-dialog/upload-wet-dialog.component';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
// import { saveAs } from 'file-saver';
import * as _ from 'lodash';
@Component({
  selector: 'tm-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  public constants = Constants;
  public url: string;
  private resultById: any;
  isRead: Boolean = false;
  isApproved: Boolean = false;
  public dataLoading = true;    // loader
  public errResponse = false;   // when data not fouond
  public responseMessage: string;
  private results: any;
  private dataNotFound: boolean;
  public selectedValue = [];
  public statusValue = ['allStatus', 'verified', 'nonVerified'];
  public docTypeValue = ['allDocType', 'Global', 'siteSpecific'];
  public temp: any;
  public subjectData: any;
  public subjectDataFilter: any;
  public studyDescriptionData: any;
  public trialDocFilter: any;
  public studyDescriptionFilter: any;
  public tmContextualDataFilter: any;
  public faqsDataFilter: any;
  public icfOriginalFilter: any;
  public icfOriginalData: any;
  public tmContextualData: any;
  public faqsData: any;
  public currentTabIndex = 0;
  public searchFilter: any;
  public sortType: string;
  public temporaryData: any = [];
  public paginationData: any = [];
  public pageSpanLength: number;
  public currentPage: number;
  public pages: Array<number>;
  public AppConfig = AppConfig;
  public filteredData: any = [];
  pager: any = {};
  pagedItems: any[];
  date: Date = new Date();
  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  };
  public sitesList: any;
  public defaultSiteType: any =[];
  public siteTypeValue:any = [];
  constructor(
    private loaderService: LoaderService,
    private userManagementService: UserManagementService,
    private datePipe: DatePipe,
    private pagerService: PagerService,
    public router: Router,
    private toaterService: ToasterService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.url = this.router.url;
    const lastIndex = this.url.length - 30;
    this.url = this.url.slice(0, lastIndex);
    const index = this.url.lastIndexOf('/');
    this.url = this.url.slice(index + 1, this.url.length);
    this.allSites();
    this.loaderService.display(true);
  }

  // temporary method 
  updateSubjectList(message){
    this.userManagementService.getSubjectList(this.url).subscribe((data) => {
      console.log(data);
      this.loaderService.display(false);
      if(message){
      this.toaterService.pop('success', message, '');
      }
      this.subjectDataFilter = Object.assign([], data.data);
      this.url = this.router.url;
      const lastIndex = this.url.length - 30;
      this.url = this.url.slice(0, lastIndex);
      const index = this.url.lastIndexOf('/');
      this.url = this.url.slice(index + 1, this.url.length);
      switch (this.url) {
        case 'allSubjects': this.getSubjectList('allSubjects'); break;
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
      this.updateSubjectList(undefined);
      this.sitesList.forEach(addSite => {
        this.siteTypeValue.push(addSite.siteName);
      });
      // console.log(this.siteTypeValue);
      
      this.defaultSiteType = Object.assign([],this.siteTypeValue);


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
          this.siteTypeValue = Object.assign([],this.defaultSiteType);

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
      case 'toggle' : break;
    }
    this.selectedValue = this.selectedValue.concat(this.siteTypeValue);
   this.filterSubjects();
    // console.log('parent', event);

  }
  addSubject(): void {
    const dialogRef = this.dialog.open(AddSubjectDialogComponent, {
      width:'700px',
      data: {type:'SITES'}
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
          this.updateSubjectList('Subject Added Successfully');
        },
          (error) => {
            console.log(error);
            this.loaderService.display(false);
            error = JSON.parse(error._body);
            this.toaterService.pop('error', error.message, '');
          });
      } else {
        console.log('no data');
      }
    });

  }

  getUrl(type, item) {
    const role = LocalStorage.get('role');
    switch (type) {
      case 'visitView': {
        return [`../viewVisit?=${role}`];
      }
      case 'medicationView': {
        return [`../viewMedication?=${role}`];
      }
      case 'visitSet': {
        return [`../visitSetup?=${role}`];
      }
      case 'medicationSet': {
        return [`../medicationSetup?=${role}`];
      }
    }
  }
  setSubject(item) {
    LocalStorage.set('subjectId1', item._id);
    LocalStorage.set('subjectId2', item.subjectId);
    LocalStorage.set('subjectName', item.nickName);
  }
  uploadWetSignature(subjectId, enrollmentVisit) {
    if(enrollmentVisit){
    const dialogRef = this.dialog.open(UploadWetDialogComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = new FormData();
        formData.append('file', result[0]);
        this.loaderService.display(true);
        this.userManagementService.wetUpload(formData, subjectId).subscribe((data) => {
          this.updateSubjectList('Wet Signature Uploaded Successfully');
          // this.toaterService.pop('success', , '');
        },
          (error) => {
            console.log(error);
            this.loaderService.display(false);
            error = JSON.parse(error._body);
            this.toaterService.pop('error', error.message, '');
          });
      } else {
        console.log('no data');
      }
    });
  } else {
    this.toaterService.pop('info', 'Please Select Enrollment Visit First', '');
  }
  }

  onDateSelect(event, id) {
    // console.log('date changed', event, id);
    const dateData = {
      'enrollmentVisit': event,
      '_id': id
    };
    this.loaderService.display(true);
    this.userManagementService.updateSubject(dateData, id).subscribe((data) => {
      this.loaderService.display(false);
      this.toaterService.pop('success', 'Enrollment Visit Updated Successfully', '');
    },
      (error) => {
        console.log(error);
        this.loaderService.display(false);
        error = JSON.parse(error._body);
        this.toaterService.pop('error', error.message, '');
      });
  }
  public getSubjectList(type) {
    switch (type) {
      case 'allSubjects': {
        this.temporaryData = this.subjectDataFilter.filter((row) => {
          return (row.status.toLowerCase() === 'all subjects' || row.status.toLowerCase() === 'qualified'
            || row.status.toLowerCase() === 'pre consented'
            || row.status.toLowerCase() === 'consented');
        });
        break;
      }
      case 'qualified': {
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
    this.toggle('default' , 'default', 'default');
  }
  public filterSubjects(){
    this.selectedValue = this.siteTypeValue;
    this.paginationData = _.filter(this.temporaryData, (row) => {
      return (row.siteName ? this.siteTypeValue.indexOf(row.siteName) > - 1  : true);

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

  }

  viewSignature(subjectId, type) {
    this.loaderService.display(true);
    this.userManagementService.viewSignature(subjectId, type).subscribe((data) => {
      this.loaderService.display(false);
      const fileURL = URL.createObjectURL(data);
      console.log(fileURL);
      window.open(fileURL);
    },
      (err) => {
        this.loaderService.display(false);
        this.toaterService.pop('error', 'Network Error');
      });
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
