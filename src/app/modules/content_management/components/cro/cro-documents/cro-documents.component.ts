import { Component, OnInit } from '@angular/core';
import { ContentManagementService } from '../../../content-management.service';
import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../../../commons/services/loader.service';
import { Router } from '@angular/router';
import { AppConfig } from '../../../../../../config/appConfig';
import { PagerService } from '../../../../../commons/services/pager.service';
import {DatePipe} from '@angular/common';
import * as _ from 'lodash';

@Component({
  selector: 'tm-cro-documents',
  templateUrl: './cro-documents.component.html',
  styleUrls: ['./cro-documents.component.css']
})
export class CroDocumentsComponent implements OnInit {
  private resultById: any;
  isRead:     Boolean = true;
  isApproved: Boolean = false;
  public dataLoading = true;    // loader
  public errResponse = false;   // when data not fouond
  public responseMessage: string;
  private results: any;
  private dataNotFound: boolean;
  public selectedValue = [];
  public docTypeValue = ['Global'];
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
  pager: any = {};
  pagedItems: any[];
  public sitesList: any =[];
  public defaultSiteType: any =[];
  public siteTypeValue: any = [];
  public languages: any = [];
  public defaultLangType: any =[];
  public langTypeValue:any = [];
  showAllSites = true;
showGlobalType: boolean;
showAllLanguageType: boolean;


  constructor(
    private cmService: ContentManagementService,
    private toaterService: ToasterService,
    private loaderService: LoaderService,
    private pagerService: PagerService,
    public router: Router,
    private datePipe: DatePipe) { }


  ngOnInit() {
    this.allSites();
    this.loaderService.display(true);
  }

  public allSites(): void {
    this.cmService.getSITESList().subscribe((data) => {
      this.allLanguages();
      this.sitesList = data.data;
      this.sitesList.forEach(addSite => {
        this.siteTypeValue.push(addSite.siteName);
      });
      console.log(this.siteTypeValue);
      
      this.defaultSiteType = Object.assign([],this.siteTypeValue);


      // this.selectedValue = this.selectedValue.concat(this.defaultSiteType);
      console.log(this.defaultSiteType);
      
    },
      err => {
        console.log(err);
      }
    );
  }


  public allLanguages(): void {
    this.cmService.getlanguagesList().subscribe((data) => {
      this.croDocumentList();
      this.languages = data.data;
      this.languages.forEach(addLang => {
        this.langTypeValue.push(addLang.language);
      });
      this.defaultLangType = Object.assign([],this.langTypeValue);
      // this.selectedValue = this.selectedValue.concat(this.defaultLangType);
    },
      err => {
        console.log(err);
      }
    );
  }
  viewDocument(id) {
    this.loaderService.display(true);
    this.cmService.getViewDocument(id).subscribe(data => {
      this.resultById = data;
      this.loaderService.display(false);
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL);
      this.ngOnInit();
    },
      err => {
        this.loaderService.display(false);
        console.log(err);
      }
    );
  }
  croDocumentList() {
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
        this.toaterService.pop('error', 'Network Issue', '');
        console.log(error);
      });
  }


  approveSiteDocument(id, AorR ) {
    this.loaderService.display(true);
    this.cmService.approveDocument(id, AorR).subscribe(data => {
      this.loaderService.display(false);
      this.ngOnInit();
      this.toaterService.pop('success', data.message, '');
    },
      err => {
        this.loaderService.display(false);
        console.log(err);
      }
    );
  }

  getDocumentsList(key) {
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
    this.filterDocuments();
    // this.filterDocuments('default');
  }
  public childToggle(value, key) {
    console.log(this.selectedValue);
    
    switch(key){
      case 'site': {
        const index = this.siteTypeValue.indexOf(value);
        if (index > -1) {
          this.siteTypeValue.splice(index, 1);
        } else {
          this.siteTypeValue.splice(index, 0, value);
        }
  
        console.log(this.siteTypeValue);
        
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
        case 'sites': {
          this.toggleFilterSubmenu('showAllSites');
          if (event.checked) {
            this.siteTypeValue = Object.assign([], this.defaultSiteType);
          } else {
            this.siteTypeValue =[];
          }
          break
        };
        case 'docType': {
          this.toggleFilterSubmenu('showAllDocumentType');
          if (event.checked) {
            this.docTypeValue = ['Global'];
          } else {
            this.docTypeValue = [];
          }
          break
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
      console.log('parent', event);
  
    }
  
    public toggleFilterSubmenu(param) {
      if (param === 'showAllSites') {
      this.showAllSites = !this.showAllSites;
      this.showGlobalType = false;
      this.showAllLanguageType = false;
      } else if (param === 'showGlobalType') {
      this.showGlobalType = !this.showGlobalType;
      this.showAllSites = false;
      this.showAllLanguageType = false;
      }
      else if (param === 'showAllLanguageType') {
        this.showAllLanguageType = !this.showAllLanguageType;
        this.showAllSites = false;
        this.showGlobalType = false;
        }
      }

    public filterDocuments(){
      this.selectedValue=[];
      // if (this.defaultSiteType.length === this.siteTypeValue.length) {
      //   this.selectedValue.push('All Sites');
      // } else {
      //   this.selectedValue.splice(this.selectedValue.indexOf('All Sites'), 1);
      // }
      // if (this.defaultLangType.length === this.langTypeValue.length) {
      //   this.selectedValue.push('All Languages');
      // } else {
      //   this.selectedValue.splice(this.selectedValue.indexOf('All Languages'), 1);
      // }
      this.selectedValue = this.selectedValue.concat(this.siteTypeValue).concat(this.docTypeValue).concat(this.langTypeValue);
      this.paginationData = _.filter(this.temporaryData, (row) => {
        return ((this.docTypeValue.indexOf(row.docType) > -1  || this.siteTypeValue.indexOf(row.siteName) > -1) && (row.language ? this.langTypeValue.indexOf(row.language) > -1 : 1));
  
      });
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
          (row['createdOn'] ? row['createdOn'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['language'] ? (row['language'].search(new RegExp(query, 'i')) !== -1) : 0) ||
          (row['siteId'] ? row['siteId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
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
