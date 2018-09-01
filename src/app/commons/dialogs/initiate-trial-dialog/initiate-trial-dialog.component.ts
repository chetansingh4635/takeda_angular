import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup, MatSelect } from '@angular/material';
import { TrialManagementService } from '../../../modules/trial_management/trialManagement.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../commons/services/loader.service';


@Component({
  selector: 'tm-initiate-trial-dialog',
  templateUrl: './initiate-trial-dialog.component.html',
  styleUrls: ['./initiate-trial-dialog.component.css']
})
export class InitiateTrialDialogComponent implements OnInit {
  public form: FormGroup;
  public trialPhases: any = [];
  public files: any = [];
  public phases = [
    { "value": "Phase 1" },
    { "value": "Phase 2" },
    { "value": "Phase 3" },
    { "value": "Phase 4" }
  ];
  public phasesName: any = [];
  public submitted: Boolean = false;
  public addRegionError: string;
  public isAddTrial = false;


  public sitesList: any = [];
  @Input() fileExt = 'docx';
  @ViewChild('t') tab: NgbTabset;
  public fileErrors: string;
  public irbList: any = [];


  public countryList: any = [];
  public sponsorNameList = [];

  constructor(public fb: FormBuilder,
    public trialManagementService: TrialManagementService,
    public tabset: NgbTabset, public dialog: MatDialog,
    public toasterService: ToasterService,
    public loaderService: LoaderService,
    public dialogRef: MatDialogRef<InitiateTrialDialogComponent>,
  ) {
    this.form = fb.group({
      trialDetails : fb.group({
        sponsorName: ['', Validators.required],
        trialName: ['', Validators.required],
        trialTitle: ['', Validators.required],
        trialProtocolNumber: ['', Validators.required],
        protocolDocument: ['', Validators.required],
        version: ['', Validators.required],
        regulatoryBody: ['', Validators.required],
        therapeuticArea: ['', Validators.required],
        diseaseName: ['', Validators.required],
        typeOfMolecule: ['', Validators.required],
        designOfTrial: ['', Validators.required],
        phaseOfTrial: fb.array([]),
      })
    });
  }

  ngOnInit() {
    const thisPage = <HTMLElement>document.querySelector('#page');
    thisPage.style.background = '#eff3f6';

    const thisDialog = <HTMLElement>document.querySelector('.mat-dialog-container');
    thisDialog.style.maxHeight = '500px';
    // const thisDialog = <HTMLElement>document.querySelector('#mat-dialog-0');
    // thisDialog.style.maxHeight = '700px';

    this.trialPhases = this.form.controls['trialDetails'].get('phaseOfTrial') as FormArray;
    console.log("trial phases",this.trialPhases);
    
    for (let i = 0; i < 4; i++) {
      this.trialPhases.push(this.createTrialPhase());
    }
    // this.addRegion();
    this.getIrbList();
    this.getSponsorList();
  }
  // ---------------------------------------Getting Initial Listing  ---------------------------------------------------------------
  public getIrbList() {
    this.trialManagementService.getIrbList().subscribe((data) => {
      this.irbList = data.data;
      console.log("irb List", this.irbList);

    },
      err => {
        console.log(err);
      }
    );
  }


  public getSponsorList() {
    this.trialManagementService.getSponsorList().subscribe((data) => {
    this.sponsorNameList = data.data;
    console.log("Sponsor List", this.sponsorNameList);
    },
    err => {
    console.log(err);
    }
    );
    }
    
  // ------------------------------------------------- Trial Details ---------------------------------------------------------

  public createTrialPhase(): FormGroup {
    return this.fb.group({
      phase: [''],
    });
  }




  public onFileChange(event) {
    if (this.isValidFile(event.target.files)) {
      this.fileErrors = undefined;
      this.files = [];
      this.files.push(event.target.files[0]);
    }
  }
  public isValidFile(files) {
    // Make array of file extensions
    const extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim(); });
    for (let i = 0; i < files.length; i++) {
      // Get file extension
      const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      const exists = extensions.includes(ext);
      if (!exists) {
        this.fileErrors = 'Please Select a Docx File';
        return false;
      } else {
        return true;
      }
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }

  setPhase(){
    let i = 1;
    this.phasesName = [];
    this.form['controls'].trialDetails['controls'].phaseOfTrial['controls'].forEach(index => {
      if (index['controls'].phase.value === true) {
        this.phasesName.push('phase' + i);
      }
      i = i + 1;
    });
    console.log(this.phasesName);  
  }

  saveTrial(){
    this.submitted =true;
    console.log(this.form);
    
    if(this.form.controls['trialDetails'].valid){
     
      console.log(this.phasesName);
      const formData = new FormData();
      formData.append('sponsorName', this.form['controls']['trialDetails']['controls'].sponsorName.value);
      formData.append('trialName', this.form['controls']['trialDetails']['controls'].trialName.value);
      formData.append('trialTitle', this.form['controls']['trialDetails']['controls'].trialTitle.value);
      formData.append('trialProtocolNumber', this.form['controls']['trialDetails']['controls'].trialProtocolNumber.value);
      formData.append('version', this.form['controls']['trialDetails']['controls'].version.value);
      formData.append('regulatoryBody', this.form['controls']['trialDetails']['controls'].regulatoryBody.value);
      formData.append('theRapeuticArea', this.form['controls']['trialDetails']['controls'].therapeuticArea.value);
      formData.append('typeOfMolecule', this.form['controls']['trialDetails']['controls'].typeOfMolecule.value);
      formData.append('designOfTrial', this.form['controls']['trialDetails']['controls'].designOfTrial.value);
      formData.append('phaseOfTrial', JSON.stringify(this.phasesName));
      formData.append('file', this.files[0]);
      this.loaderService.display(true);
     this.dialogRef.close(formData);
      console.log('valid');   
    } else {
      console.log('invalid');
      
    }
  }

}
