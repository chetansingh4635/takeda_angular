import { Component, Inject, OnInit, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../../commons/services/loader.service';
import { PagerService } from '../../../../commons/services/pager.service';
import { MachineLearningService } from '../../machine-learning-service.service';
import { AppConfig } from '../../../../../config/appConfig';

import { SelectLanguageDialogComponent } from '../../dialogs/select-language-dialog/select-language-dialog.component';
import { SuccessDialogComponent } from '../../dialogs/success-dialog/success-dialog.component';
import { DownloadDialogComponent } from '../../dialogs/download-dialog/download-dialog.component';

import * as _ from 'lodash';


@Component({
  selector: 'tm-generate-informed-consent-form',
  templateUrl: './generate-informed-consent-form.component.html',
  styleUrls: ['./generate-informed-consent-form.component.css'],
  providers: [DatePipe]
})

export class GenerateInformedConsentFormComponent implements OnInit {

  closeResult: string;
  public dataLoading = true;    // loader
  public errResponse = false;   // when data not fouond
  public responseMessage: string;
  private results: any;
  private resultById: any;
  private dataNotFound: boolean;
  public selectedValue = ['allLanguages', 'english', 'japanese', 'french', 'spanish', 'czech'];
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
  // public checked: boolean;
  formData: FormData;
  public index;
  @Input() fileExt = 'docx';
  public uploadgetDatA: any;
  public uploadgetDatATemp: any;
  public docHistory = false;

  dateObj: any;

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public router: Router,
    private toaterService: ToasterService,
    private loaderService: LoaderService,
    private pagerService: PagerService,
    private mlService: MachineLearningService,
    private modalService: NgbModal) {
    this.dateObj = new Date();
    // this.router.get('data')
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  ngOnInit() {
    // this.addDocument();
    this.loaderService.display(true);
    this.uploadget();
  }

  public uploadget = function(): void {
    let ths = this;
    this.mlService.uploadget().subscribe((data) => {
      let duration = 5*60*10000;
      if (data.length > 0) {
        this.uploadgetDatA = data.reverse();
        this.filteredData = Object.assign([], data);
        this.paginationData = Object.assign([], data);
        this.setPage(1);
        this.loaderService.display(false);
        console.log('uploadget data is:-');
        console.log(data);

        let timer = setTimeout(function () {
          let allClear = true;
          for (let i = 0; i < data.length; i++){
            if (data[i].status != "Successful"){
              allClear = false;
            }
          }
          if(allClear){
            clearTimeout(timer);
          }else{
            duration = 3*60*10000;
          }
          console.log("uploadget"+ duration +"Seconds");
          ths.uploadget();
        }, duration);

      }
    },
      (err) => {
        console.log(err);
      });
  }

  openCreateTranslateIcfDialog(): void {
    const dialogRef = this.dialog.open(SelectLanguageDialogComponent, {
      width: '650px',
      data: { name: 'ranjit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.paginationData.length, page);
    this.index = (page - 1) * 10;
    if (page < 1 || page > this.pager.totalPages) {
      this.uploadgetDatA = [];
      return;
    }
    this.uploadgetDatA = this.paginationData.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.paginationData = _.filter(this.filteredData, row => {
        return (row['upload_file'].search(new RegExp(query, 'i')) !== -1) ||
          (row['icf_name'].search(new RegExp(query, 'i')) !== -1) ||
          (row['doctype'] ? row['doctype'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['language'].length ? (row['language'].search(new RegExp(query, 'i')) !== -1) : 0) ||
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

/**
 * Showes history of the document
 * @param : protocol ID
 */
  showistory(protocolId) {
    let filteredData = [];
    for (let i = 0; i < this.uploadgetDatA.length; i++) {
      if (this.uploadgetDatA[i].study_number == protocolId) {
        filteredData.push(this.uploadgetDatA[i]);
      }
    }
    this.uploadgetDatATemp = this.uploadgetDatA;
    this.uploadgetDatA =  filteredData;
    this.docHistory = true;
  }

/**
 * Opens dialouge box
 */
  openDownloadDialog(index){
    let docData = this.uploadgetDatA[index];
    console.log(this.uploadgetDatA);
    const dialogRef30 = this.dialog.open(DownloadDialogComponent, {
      data: {"docData" : docData}
    });
  }

  cancelHistory(){
    this.docHistory = false;
    this.uploadgetDatA = this.uploadgetDatATemp;
  }

}
