import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup, MatSelect } from '@angular/material';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AddDocumentDialogComponent } from '../../../../../commons/dialogs/add-document-dialog/add-document-dialog.component';
import { AccountService } from '../../../../../account/auth/account.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorage } from '../../../../../commons/services/localStorage.service';
import { ContentManagementService } from '../../../content-management.service';
import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../../../commons/services/loader.service';
import { AppConfig } from '../../../../../../config/appConfig';
import { PagerService } from '../../../../../commons/services/pager.service';
import { Constants } from '../../../../../../config/constant';
import * as _ from 'lodash';
@Component({
  selector: 'tm-trial-documents',
  templateUrl: './trial-documents.component.html',
  styleUrls: ['./trial-documents.component.css'],
  // styleUrls: ['../../../content-management.css']
  //  providers: [ContentManagementService]
})

export class TrialDocumentsComponent implements OnInit, AfterViewInit {
  public dataLoading = true;    // loader
  public errResponse = false;   // when data not fouond
  public responseMessage: string;
  private results: any;
  private resultById: any;
  private dataNotFound: boolean;
  public selectedValue = [];
  // public statusValue:any;
  public statusValue = ['Verified', 'nonVerified'];
  public docTypeValue = ['Global', 'Site Specific'];
  public langTypeValue = [];
  public temp: any;
  public trialDocData: any;
  public trialDocDataFilter: any;
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
  public languages: any = [];
  public defaultLangType: any = [];
  pager: any = {};
  pagedItems: any[];
  showAllStatus = true;
  showAllDocumentType: boolean;
  showAllLanguageType: boolean;
  public constants = Constants;
  public url: string;

  @ViewChild('userManagementTab') userManagementTab: MatTabGroup;
  @ViewChild(MatSelect) mySelector: MatSelect;

  public arrayOne(n: number): any[] {
    n = 9 - n;
    return Array(n);
  }

  constructor(public dialog: MatDialog,
    public router: Router,
    public accountService: AccountService,
    private cmService: ContentManagementService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private pagerService: PagerService) {
    // this.router.get('data')
  }

  toggleFilterDdn() {
    this.mySelector.toggle();

    const cdkpane = <HTMLElement>document.querySelector('.cdk-overlay-pane');
    if (cdkpane) {
      cdkpane.classList.add('cdkOverlayMypane');
      // const cdkOverlayMypane = <HTMLElement>document.querySelector('.cdkOverlayMypane');
      // const x = cdkOverlayMypane.style.top;
      // const a: any = x.split('p');
      // const currTop = Number(a[0]) + 91;
      // console.log(currTop);
      // cdkOverlayMypane.style.top = currTop + 'px';
    }
  }

  //  ===========onWindowScroll=============
  // @HostListener('window:scroll', []) onWindowScroll() {
  //   console.log('scrolling...');
  //   const cdkpane = <HTMLElement>document.querySelector('.cdk-overlay-pane');
  //   if (cdkpane) {
  //     const x = cdkpane.style.top;
  //     const a: any = x.split('p');
  //     const currTop = Number(a[0]) + 91.5;
  //     cdkpane.style.top = currTop + 'px';
  //     cdkpane.classList.remove('cdkOverlayMypane');
  //   }
  // }
  //  ===========onWindowScroll end=============

  viewDocument(id) {
    this.loaderService.display(true);
    this.cmService.getViewDocument(id).subscribe(data => {
      this.resultById = data;
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


  ngAfterViewInit() {

  }

  ngOnInit() {
    // this.url = this.router.url;
    // console.log(this.router.url);

    this.allLanguages();
    this.loaderService.display(true);
  }

  public allLanguages(): void {
    this.cmService.getlanguagesList().subscribe((data) => {
      this.languages = data.data;
      this.getDocumentList();
      this.languages.forEach(addLang => {
        this.langTypeValue.push(addLang.language);
      });
      this.defaultLangType = Object.assign([], this.langTypeValue);
      this.selectedValue = this.selectedValue.concat(this.statusValue).concat(this.docTypeValue).concat(this.langTypeValue);
    },
      err => {
        console.log(err);
      }
    );
  }
  public getDocumentList() {
    this.cmService.getDocumentList().subscribe((data) => {
      this.loaderService.display(false);
      this.trialDocDataFilter = Object.assign([], data.data);
      this.dataLoading = false;
      if (this.trialDocDataFilter.length === 0) {
        this.errResponse = true;
        this.responseMessage = `<p class="error"> Data not found </p>`;
      }

      let url = this.router.url;
      const lastIndex = url.length - 30;
      url = url.slice(0, lastIndex);
      const index = url.lastIndexOf('/');
      url = url.slice(index + 1, url.length);
      this.url = url;
      switch (url) {
        case 'allDocs': this.getDocumentsList('allDocs'); break;
        case 'icfOfficial': this.getDocumentsList('icfOfficial'); break;
        case 'icfExplanatory': this.getDocumentsList('icfExplanatory'); break;
        case 'invitationLetter': this.getDocumentsList('InvitationLetter'); break;
        case 'studyDescription': this.getDocumentsList('studyDescription'); break;
        case 'faqs': this.getDocumentsList('faqs');
      }
    },
      (error) => {
        this.errResponse = true;
        this.dataLoading = false;
        this.loaderService.display(false);
        this.toasterService.pop('error', 'Network Issue', '');
        console.log(error);
      });
  }

  public addDocument(): any {
    switch (this.url) {
      case 'icfOfficial': {
        return [`../icfOfficial/addDocument?=${this.constants.adminId}`];
      }
      case 'icfExplanatory': {
        return [`../icfExplanatory/addDocument?=${this.constants.adminId}`];
      }
      case 'invitationLetter': {
        return [`../invitationLetter/addDocument?=${this.constants.adminId}`];
      }
      case 'studyDescription': {
        return [`../studyDescription/addDocument?=${this.constants.adminId}`];
      }
      case 'faqs': {
        return [`../faqs/addDocument?=${this.constants.adminId}`];
      }

    }

    // return [`../addDocument?=${this.constants.adminId}`];
    // const dialogRef = this.dialog.open(AddDocumentDialogComponent, {
    //   data: {}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.cmService.documentUpload(result).subscribe((data) => {
    //       this.loaderService.display(false);
    //       this.ngOnInit();
    //       this.toasterService.pop('success', 'Document Uploaded Successfully', '');
    //     },
    //       (error) => {
    //         console.log(error);
    //         this.loaderService.display(false);
    //         error = JSON.parse(error._body);
    //         this.toasterService.pop('error', error.message, '');
    //       });
    //   } else {
    //     console.log('no data');
    //   }
    // });
    
  }

  public getDocumentsList(key) {
    switch (key) {
      case 'allDocs': {
        this.temporaryData = this.trialDocDataFilter.filter((row) => {
          return (row.docName.toLowerCase() === 'icf official' || row.docName.toLowerCase() === 'icf explanatory'
            || row.docName.toLowerCase() === 'invitation letter'
            || row.docName.toLowerCase() === 'study description' || row.docName.toLowerCase() === 'faqs');
        });
        break;
      }
      case 'icfOfficial': {
        this.temporaryData = this.trialDocDataFilter.filter((row) => {
          return (row['docName'].toLowerCase() === 'icf official');
        });
        break;
      }
      case 'icfExplanatory': {
        this.temporaryData = this.trialDocDataFilter.filter((row) => {
          return (row['docName'].toLowerCase() === 'icf explanatory');
        });
        break;
      }
      case 'InvitationLetter': {
        this.temporaryData = this.trialDocDataFilter.filter((row) => {
          return (row['docName'].toLowerCase() === 'invitation letter');
        });
        break;
      }
      case 'studyDescription': {
        this.temporaryData = this.trialDocDataFilter.filter((row) => {
          return (row['docName'].toLowerCase() === 'study description');
        });
        break;
      }
      case 'faqs': {
        this.temporaryData = this.trialDocDataFilter.filter((row) => {
          return (row['docName'].toLowerCase() === 'faqs');
        });
        break;
      }
    }
    console.log('temporary Data', this.temporaryData);
    
    this.filterDocuments();
  }

  public childToggle(value, key) {
    switch (key) {
      case 'status': {
        const index = this.statusValue.indexOf(value);
        if (index > -1) {
          this.statusValue.splice(index, 1);
        } else {
          this.statusValue.splice(index, 0, value);
        }

        // console.log(this.statusValue);

        break;
      }
      case 'docType': {
        const index = this.docTypeValue.indexOf(value);
        if (index > -1) {
          this.docTypeValue.splice(index, 1);
        } else {
          this.docTypeValue.splice(index, 0, value);
        }
        break;
      }
      case 'language': {
        const index = this.langTypeValue.indexOf(value);
        if (index > -1) {
          this.langTypeValue.splice(index, 1);
        } else {
          this.langTypeValue.splice(index, 0, value);
        }
        break;
      }
      case 'default': break;
    }
    this.filterDocuments();

  }


  public parentToggle(event, type) {
    switch (type) {
      case 'status': {
        this.toggleFilterSubmenu('showAllStatus');
        if (event.checked) {
          this.statusValue = ['Verified', 'nonVerified'];
        } else {
          this.statusValue = [];
        }
        break;
      };
      case 'docType': {
        this.toggleFilterSubmenu('showAllDocumentType');
        if (event.checked) {
          this.docTypeValue = ['Global', 'Site Specific'];
        } else {
          this.docTypeValue = [];
        }
        break;
      };
      case 'language': {
        this.toggleFilterSubmenu('showAllLanguageType');
        if (event.checked) {
          this.langTypeValue = Object.assign([], this.defaultLangType);
        } else {
          this.langTypeValue = [];
        }
        break
      };
    }
    this.filterDocuments();
    // console.log('parent', event);

  }

  public toggleFilterSubmenu(param) {
    if (param === 'showAllStatus') {
      this.showAllStatus = !this.showAllStatus;
      this.showAllDocumentType = false;
      this.showAllLanguageType = false;
    } else if (param === 'showAllDocumentType') {
      this.showAllDocumentType = !this.showAllDocumentType;
      this.showAllStatus = false;
      this.showAllLanguageType = false;
    }
    else if (param === 'showAllLanguageType') {
      this.showAllLanguageType = !this.showAllLanguageType;
      this.showAllStatus = false;
      this.showAllDocumentType = false;
    }
  }
  public filterDocuments() {
    this.selectedValue = this.statusValue.concat(this.docTypeValue).concat(this.langTypeValue);
    this.paginationData = _.filter(this.temporaryData, (row) => {
      return ((this.statusValue.indexOf(row.docStatus) > -1) &&
        (this.docTypeValue.indexOf(row.docType) > -1) && (row.language ? this.langTypeValue.indexOf(row.language) > -1 : 1));

    });
    console.log('filtered Data', this.filteredData);
    this.filteredData = this.paginationData;
    this.setPage(1);
    this.searchData();
  }
  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.paginationData.length, page);
    if (page < 1 || page > this.pager.totalPages) {
      this.trialDocData = [];
      return;
    }
    this.trialDocData = this.paginationData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.paginationData = _.filter(this.filteredData, row => {
        return (row['docName'].search(new RegExp(query, 'i')) !== -1) ||
          (row['docVersion'].search(new RegExp(query, 'i')) !== -1) ||
          (row['croName'] ? row['croName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['irbInfo'].length ? (row['irbInfo'][0].irbName.search(new RegExp(query, 'i')) !== -1) : 0) ||
          (row['croId'] ? row['croId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['docType'].search(new RegExp(query, 'i')) !== -1) ||
          (row['docStatus'].search(new RegExp(query, 'i')) !== -1) ||
          (row['createdOn'] ? row['createdOn'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['siteId'] ? row['siteId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['language'] ? (row['language'].search(new RegExp(query, 'i')) !== -1) : 0) ||
          (row['siteName'] ? row['siteName'].search(new RegExp(query, 'i')) !== -1 : 0);
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

