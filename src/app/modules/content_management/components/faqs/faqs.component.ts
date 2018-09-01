import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NG_VALUE_ACCESSOR} from '@angular/forms';
import { CKEditorComponent } from 'ngx-ckeditor';
import { CKEditorModule } from 'ngx-ckeditor';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { ContentManagementService } from '../../content-management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../../commons/services/loader.service';
import { AppConfig } from '../../../../../config/appConfig';
import { PagerService } from '../../../../commons/services/pager.service';
import { Constants } from '../../../../../config/constant';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'tm-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
})

export class FaqsComponent implements OnInit, OnDestroy, AfterViewInit {


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
  public currentTab: string = 'Generic';
  public submitted = false;
  public url:string;
  public docName:string;
  public genericData:any = [];
  public siteSpecificData:any = [];
  @ViewChild('t') tab: NgbTabset;
  constructor(private dragulaService: DragulaService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private cmService: ContentManagementService,
    private toasterService: ToasterService,
    private loaderService: LoaderService, ) {
    this.form = this.fb.group({
      generic: this.fb.group({
        language: ['', [Validators.required]],
        version: ['', Validators.required],
        genericData: this.fb.array([])
      }),
      siteSpecific: this.fb.group({
        language: ['', [Validators.required]],
        version: ['', Validators.required],
        siteSpecificData: this.fb.array([])
      }),
 
    });
  }

  ngOnInit() {
    this.route.data.subscribe((value) => {
      this.docName = value.title;
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

    
  ngAfterViewInit() {
    const el = <HTMLDataElement>document.querySelector('.nav-pills');
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'itpHeaderNew');
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    //   //  console.log('afterViewInit => ', this.tabGroup.selectedIndex);
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
  public tabChanged(event){
    this.submitted = false;
    setTimeout(() => {
     this.currentTab = this.tab.activeId;
     console.log(this.currentTab);
    }, 1);
   
  }
  public newQestion(): FormGroup {
    return this.fb.group({
      docKey: ['', Validators.required],
      docValue: ['', Validators.required],
    })
  }

  addNewGenericQuestion() {
    this.genericData = this.form['controls'].generic.get('genericData') as FormArray;
    this.genericData.push(this.newQestion());
    console.log("New Questions", this.form);
  }
  addNewSiteSpecificQuestion() {
    this.siteSpecificData = this.form['controls'].siteSpecific.get('siteSpecificData') as FormArray;
    this.siteSpecificData.push(this.newQestion());
    console.log("New Questions", this.siteSpecificData);
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
        if (this.form.controls.siteSpecific.valid && this.siteSpecificData.length && this.form['controls'].siteSpecific['controls'].genericData.valid) {
          const formData = new FormData();
          let document = []
          const data = {
            "docType" : 'Global',
            "docVersion" : this.form['controls'].siteSpecific['controls'].version.value,
            "language" : this.form['controls'].siteSpecific['controls'].language.value,
            "trialId" : LocalStorage.get('trialId'),
            "croId":'org1',
            "docNameId" : this.constants.faqsId,
            "docName" : this.docName,
            "documentData": this.form['controls'].siteSpecific['controls'].genericData.value,
            "faqType": this.currentTab
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
      case 'Generic': {
        if (this.form.controls.generic.valid && this.genericData.length && this.form['controls'].generic['controls'].genericData.valid) {
          const formData = new FormData();
          let document = []
          const data = {
            "docType" : 'Global',
            "docVersion" : this.form['controls'].generic['controls'].version.value,
            "language" : this.form['controls'].generic['controls'].language.value,
            "trialId" : LocalStorage.get('trialId'),
            "croId":'org1',
            "docNameId" : this.constants.faqsId,
            "docName" : this.docName,
            "documentData": this.form['controls'].generic['controls'].genericData.value,
            "faqType": this.currentTab
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
