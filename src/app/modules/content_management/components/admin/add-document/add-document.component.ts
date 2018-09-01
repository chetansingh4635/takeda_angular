import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CKEditorComponent } from 'ngx-ckeditor';
import { CKEditorModule } from 'ngx-ckeditor';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentManagementService } from '../../../content-management.service';
import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../../../commons/services/loader.service';
import { AppConfig } from '../../../../../../config/appConfig';
import { PagerService } from '../../../../../commons/services/pager.service';
import { Constants } from '../../../../../../config/constant';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorage } from '../../../../../commons/services/localStorage.service';
@Component({
  selector: 'tm-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit, OnDestroy {

  public editorValue: any;
  public editorConfig: any;
  public Vampires = "VAMPIRES";
  public list: any;
  BAG = "DRAGULA_EVENTS";
  public editorsData: any = [];
  public editorObject = {
    title: "",
    data: ""
  }
  public form: FormGroup;
  public documentData: any = [];
  public constants = Constants;
  subs = new Subscription();
  public sitesList:any =[];
  public languageList:any =[];
  public currentTab: string = 'Site Specific';
  public submitted = false;
  public url:string;
  public docName:string;
  public docId:string;
  public currentFaqTab: string = 'Generic';
  public panelOpenState:any =[];
  @ViewChild('t') tab: NgbTabset;
  @ViewChild('faqTab') faqTab: NgbTabset;
  constructor(private dragulaService: DragulaService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private cmService: ContentManagementService,
    private toasterService: ToasterService,
    private loaderService: LoaderService, ) {
    this.form = this.fb.group({
      siteSpecific: this.fb.group({
        siteId: ['', [Validators.required]],
        siteName: ['', [Validators.required]],
        siteLocation: ['', [Validators.required]],
        language: ['', [Validators.required]],
        version: ['', Validators.required],
      }),
      global: this.fb.group({
        language: ['', [Validators.required]],
        version: ['', Validators.required],
      }),
      documentData: this.fb.array([])
    });
   
  }

  ngOnInit() {
    this.route.data.subscribe((value) => {
      this.docName = value.title;
      this.docId = value.docId;
      console.log(this.docName);
      
    });
  
    const thisPage = <HTMLElement>document.querySelector('#page');
    thisPage.style.background = '#eff3f6';
    this.getSitesList();
    this.getLanguageList();
    setTimeout(() => {
      this.currentTab = this.tab.activeId;
     }, 1);
     console.log(this.currentTab);
  }

  public getLanguageList(){
    this.cmService.getlanguagesList().subscribe((data)=>{
      this.languageList = data.data;
      console.log(this.languageList);
      
    },
  (err)=>{
    console.log(err);
    
  })
  }
  public getSitesList(){
    this.cmService.getSITESList().subscribe((data)=>{
      this.sitesList = data.data;
      console.log(this.sitesList);
      
    },
  (err)=>{
    console.log(err);
    
  })
  }
  public selectSites(type, value) {
    switch (type) {
      case 'siteName': {
        this.sitesList.forEach((row) => {
          if (row.siteName === value) {
            this.form['controls'].siteSpecific['controls'].siteId.setValue(row.siteId);
            this.form['controls'].siteSpecific['controls'].siteLocation.setValue(row.siteLocation);
          }
        });
        break;
      }
      case 'siteId': {
        this.sitesList.forEach((row) => {
          if (row.siteId === value) {
            this.form['controls'].siteSpecific['controls'].siteName.setValue(row.siteName);
            this.form['controls'].siteSpecific['controls'].siteLocation.setValue(row.siteLocation);
          }
        });
        break;
      }
      case 'siteLocation': {
        this.sitesList.forEach((row) => {
          if (row.siteLocation === value) {
            this.form['controls'].siteSpecific['controls'].siteName.setValue(row.siteName);
            this.form['controls'].siteSpecific['controls'].siteId.setValue(row.siteId);
          }
        });
        break;
      }
    }
  }
  public tabChanged(event){
    setTimeout(() => {
     this.currentTab = this.tab.activeId;
     console.log(this.currentTab);
    }, 1);
   
  }
  public faqTabChange(event){
    setTimeout(() => {
     this.currentFaqTab = this.faqTab.activeId;
     console.log(this.currentFaqTab);
    }, 1);
   
  }
  public newQestion(): FormGroup {
    return this.fb.group({
      docKey: ['', Validators.required],
      docValue: ['', Validators.required],
    })
  }

  addNewQuestion() {
    this.documentData = this.form.get('documentData') as FormArray;
    this.documentData.push(this.newQestion());
    console.log("New Questions", this.documentData);

  }

  addDocument() {
    this.editorsData.push(this.editorObject);
  }
  ngOnDestroy() {
    const thisPage = <HTMLElement>document.querySelector('#page');
    thisPage.style.background = '#ffffff';
  }
  public save() {
    this.submitted = true;
    switch (this.currentTab) {
      case 'Site Specific': {
        if (this.form.controls.siteSpecific.valid && this.documentData.length && this.form.controls.documentData.valid) {
          const formData = new FormData();
          let document = []
          const data = {
            "docType" : this.currentTab,
            "docVersion" : this.form['controls'].siteSpecific['controls'].version.value,
            "language" : this.form['controls'].siteSpecific['controls'].language.value,
            "siteId" : this.form['controls'].siteSpecific['controls'].siteId.value,
            "siteName" : this.form['controls'].siteSpecific['controls'].siteName.value,
            "siteLocation" : this.form['controls'].siteSpecific['controls'].siteLocation.value,
            "trialId" : LocalStorage.get('trialId'),
            "croId":'org1',
            "docNameId" : this.docId,
            "docName" : this.docName,
            "documentData": this.form['controls'].documentData.value,
          }
          document.push(data);
          formData.append('documentData', JSON.stringify(document));
          this.loaderService.display(true);
          this.cmService.documentUpload(formData).subscribe((data) => {
            this.loaderService.display(false);
            this.toasterService.pop('success', 'Document Uploaded Successfully', '');
            this.router.navigate([`../../allDocs?=${this.constants.adminId}`])
          },
            (error) => {
              console.log(error);
              this.loaderService.display(false);
              error = JSON.parse(error._body);
              this.toasterService.pop('error', error.message, '');
            });

        }
      }
      case 'Global': {
        if (this.form.controls.global.valid && this.documentData.length && this.form.controls.documentData.valid) {
          const formData = new FormData();
          let document = []
          const data = {
            "docType" : this.currentTab,
            "docVersion" : this.form['controls'].global['controls'].version.value,
            "language" : this.form['controls'].global['controls'].language.value,
            "trialId" : LocalStorage.get('trialId'),
            "croId":'org1',
            "docNameId" :this.docId,
            "docName" : this.docName,
            "documentData": this.form['controls'].documentData.value,
          }
          document.push(data);
          formData.append('documentData', JSON.stringify(document));
          this.loaderService.display(true);
          this.cmService.documentUpload(formData).subscribe((data) => {
            this.loaderService.display(false);
            this.toasterService.pop('success', 'Document Uploaded Successfully', '');
            this.router.navigate([`../../allDocs?=${this.constants.adminId}`])
          },
            (error) => {
              console.log(error);
              this.loaderService.display(false);
              error = JSON.parse(error._body);
              this.toasterService.pop('error', error.message, '');
            });

        }
      }
    }

    console.log(this.form.value);

  }
}
