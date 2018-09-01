import { Component, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup, MatSelect } from '@angular/material';
import { TrialManagementService } from '../../../trialManagement.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddSiteCoordinatorComponent } from '../../../../../commons/dialogs/add-site-coordinator/add-site-coordinator.component';
import { ToasterService } from 'angular2-toaster';
import { LoaderService } from '../../../../../commons/services/loader.service';

@Component({
  selector: 'tm-initiate-trial',
  templateUrl: './initiate-trial.component.html',
  styleUrls: ['./initiate-trial.component.css']
})
export class InitiateTrialComponent implements OnInit, AfterViewInit {

  public form: FormGroup;
  public regions: any = [];
  public trialPhases: any = [];
  public files: any = [];
  public phases = [
    { "value": "Phase 1" },
    { "value": "Phase 2" },
    { "value": "Phase 3" },
    { "value": "Phase 4" }
  ];
  public phasesName: any = [];
  public regionObject = {
    "region": "",
    "country": ""
  }
  public submitted: Boolean = false;
  public addRegionError: string;
  public isAddTrial = false;
  public isAddSite = false;
  public isAddProcedure = false;
  public isAddTreatment = false;
  public isProcedureEdit = false;
  public isTreatmentEdit = false;
  public isAddProtocol = false;
  public isAddMedication = false;
  public isViewSiteCoordinator = false;
  public addTreatmentSubmitted = false;
  public addProcedureSubmitted = false;

  public isSiteManagement: Boolean = true;
  public isTableOfTask: Boolean = true;
  public isVisitsProtocol: Boolean = true;
  public isStudyMedication: Boolean = true;
  public updateIndexProcedure: string;
  public updateIndexTreatment: string;
  public sitesList: any = [];
  public siteCoordinator: any = [];
  public visitProcedures: any = [];
  public visitTreatments: any = [];
  public visitsProtocols: any = [];
  public studyMedicationData: any = [];
  public nOfTimes: any = [];
  @Input() fileExt = 'docx';
  @ViewChild('t') tab: NgbTabset;
  public fileErrors: string;

  public sponsorNameList: any = [];
  public visitWindow = ["Day", "Week", "Month"];
  public irbList: any = [];
  public sitesLocationList: any = [];
  public croList: any = [];
  public regionList: any = [];
  public countryList: any = [];
  public visitTypeList: any = [];
  public cycleOfDurationDays = ["Day(s)", "Week(s)", "Month(s)"];
  public noOfCycle = [1, 2, 3, 4, 5];
  public noOfTimesTaken = [1, 2, 3, 4, 5];
  public noOfDosesTaken = [1, 2, 3];
  public durationOfDays = ["Morning", "AfterNoon", "Night"];
  public noOfRestCycle = [1, 2, 3, 4, 5];
  public restCycleDuration = ["Day(s)", "Week(s)", "Month(s)"];
  public restCycleEndDay = [1, 2, 3, 4, 5];
  public restCycleStartDay = [1, 2, 3, 4, 5];
  public dosesLength: number;
  public cycles: any = [];

  constructor(public fb: FormBuilder,
    public trialManagementService: TrialManagementService,
    public tabset: NgbTabset, public dialog: MatDialog,
    public toasterService: ToasterService,
    public loaderService: LoaderService) {
    this.form = fb.group({
      trialDetails: fb.group({
        sponsorName: ['', Validators.required],
        trialName: ['', Validators.required],
        trialTitle: ['', Validators.required],
        trialProtocolNumber: ['', Validators.required],
        protocolDocument: [''],
        version: ['', Validators.required],
        regulatoryBody: ['', Validators.required],
        therapeuticArea: ['', Validators.required],
        diseaseName: ['', Validators.required],
        typeOfMolecule: ['', Validators.required],
        designOfTrial: ['', Validators.required],
        phaseOfTrial: fb.array([]),
        geographyRegion: fb.array([]),
        region: [''],
        country: ['']

      }),
      siteManagement: fb.group({
        siteName: ['', Validators.required],
        siteId: ['', Validators.required],
        siteLocation: ['', Validators.required],
        irbName: ['', Validators.required],
        croPiName: ['', Validators.required],
      }),
      tableOfTasks: fb.group({
        procedureDescription: ['', Validators.required],
        treatmentDescription: ['', Validators.required],
      }),
      visitsOfProtocol: fb.group({
        visitsOfProtocol: fb.array([]),
        visitType: ['', Validators.required],
        visitProcedure: ['', Validators.required],
        visitTreatMent: ['', Validators.required],
        visitWindow: ['', Validators.required],
        startWeek: ['', [Validators.required,Validators.min(1),,Validators.max(150)]],
        endWeek: ['', [Validators.required,Validators.min(1),Validators.max(150)]],
      }),
      addMedication: fb.group({
        medicineName: ['', Validators.required],
        cycleOfDurationNo: ['', Validators.required],
        cycleOfDurationDays: ['', Validators.required],
        noOfCycle: ['', Validators.required],
        noInCycle: fb.array([]),
        dosePerDay: ['', Validators.required],
        doses1: ['', Validators.required],
        doses2: [''],
        doses3: [''],
        restCycle: ['', Validators.required],
        noOfRestCycle: ['', Validators.required],
        durationOfRestCycle: ['', Validators.required],
        restCycleEndDay: ['', Validators.required],
        restCycleStartDay: ['', Validators.required],
      }),
      studyMedication: fb.group({
        studyMedication: fb.array([])
      }),
    });

  }

  ngOnInit() {
    const thisPage = <HTMLElement>document.querySelector('#page');
    thisPage.style.background = '#eff3f6';
    this.trialPhases = this.form.controls['trialDetails'].get('phaseOfTrial') as FormArray;
    for (let i = 0; i < 4; i++) {
      this.trialPhases.push(this.createTrialPhase());
    }
    // this.addRegion();
    console.log("regions", this.regions.length);
    this.getIrbList();
    this.getSitesList();
    this.getCroList();
    this.getRegionList();
    this.getVisitTypeList();
    this.form['controls'].addMedication['controls'].restCycle.setValue('Yes');
    this.getSponsorList();
    this.getTrialDetails();
  }

  getTrialDetails() {
    this.loaderService.display(true);
    const id = localStorage.getItem('tId');
    this.trialManagementService.getTrialDetail(id).subscribe((data) => {
      this.loaderService.display(false);
      const trialData = data.data[0];
      this.form['controls']['trialDetails']['controls'].sponsorName.setValue(trialData.sponsorName);
      this.form['controls']['trialDetails']['controls'].trialName.setValue(trialData.trialName);
      this.form['controls']['trialDetails']['controls'].trialTitle.setValue(trialData.trialTitle);
      this.form['controls']['trialDetails']['controls'].trialProtocolNumber.setValue(trialData.trialProtocolNumber);
      this.form['controls']['trialDetails']['controls'].version.setValue(trialData.version);
      this.form['controls']['trialDetails']['controls'].regulatoryBody.setValue(trialData.regulatoryBody);
      this.form['controls']['trialDetails']['controls'].therapeuticArea.setValue(trialData.theRapeuticArea);
      this.form['controls']['trialDetails']['controls'].typeOfMolecule.setValue(trialData.typeOfMolecule);
      this.form['controls']['trialDetails']['controls'].designOfTrial.setValue(trialData.designOfTrial);
      this.form['controls']['trialDetails']['controls'].diseaseName.setValue(trialData.diseaseName);
      const file = {
        name: trialData.protocolDocument.fileName
      }
      this.files.push(file);
      console.log("files", this.files);
      trialData.phaseOfTrial.forEach(phase => {
        if (phase === 'phase1') {
          this.form['controls'].trialDetails['controls'].phaseOfTrial['controls'][0]['controls'].phase.setValue(true);
        } else if (phase === 'phase2') {
          this.form['controls'].trialDetails['controls'].phaseOfTrial['controls'][1]['controls'].phase.setValue(true);
        } else if (phase === 'phase2') {
          this.form['controls'].trialDetails['controls'].phaseOfTrial['controls'][2]['controls'].phase.setValue(true);
        } else if (phase === 'phase2') {
          this.form['controls'].trialDetails['controls'].phaseOfTrial['controls'][3]['controls'].phase.setValue(true);
        }
      });
      this.setPhase();
      this.form['controls'].trialDetails['controls'].phaseOfTrial.markAsTouched();
      // this.form['controls'].trialDetails['controls'].phaseOfTrial['controls'].forEach(index => {
      //   if (index['controls'].phase.value === true) {
      //     this.phasesName.push('phase' + i);
      //   }
      //   i = i + 1;
      // });

    },
      (err) => {
        this.loaderService.display(false);
        console.log(err);
      }
    );
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
  public getSitesList() {
    this.trialManagementService.getSitesList().subscribe((data) => {
      this.sitesLocationList = data.data;
      console.log("Sites List", this.sitesLocationList);
    },
      err => {
        console.log(err);
      }
    );
  }
  public getCroList() {
    this.trialManagementService.getCroList().subscribe((data) => {
      this.croList = data.data;
      console.log("Cro List", this.croList);
    },
      err => {
        console.log(err);
      }
    );
  }
  public getRegionList() {
    this.trialManagementService.getRegionList().subscribe((data) => {
      this.regionList = data.data;
      console.log("Region List", this.regionList);
    },
      err => {
        console.log(err);
      }
    );
  }
  public getVisitTypeList() {
    this.trialManagementService.getVisitTypeList().subscribe((data) => {
      this.visitTypeList = data.data;
      console.log("irb List", this.visitTypeList);
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
  public createRegion(): FormGroup {
    return this.fb.group({
      region: ['', Validators.required],
      country: ['', Validators.required],

    });
  }
  public createTrialPhase(): FormGroup {
    return this.fb.group({
      phase: [],
    });
  }

  public saveRegion() {
    if (this.form['controls'].trialDetails['controls'].region.value && this.form['controls'].trialDetails['controls'].country.value) {
      this.isAddTrial = false;
      this.addRegionError = "";
      this.regions = this.form.controls['trialDetails'].get('geographyRegion') as FormArray;
      this.regions.push(this.createRegion());
      this.form['controls'].trialDetails['controls'].geographyRegion['controls'][this.regions.length - 1]['controls'].region.setValue(this.form['controls'].trialDetails['controls'].region.value);
      this.form['controls'].trialDetails['controls'].geographyRegion['controls'][this.regions.length - 1]['controls'].country.setValue(this.form['controls'].trialDetails['controls'].country.value);
      this.form['controls'].trialDetails['controls'].region.setValue(undefined);
      this.form['controls'].trialDetails['controls'].country.setValue(undefined);

    } else {
      this.addRegionError = "*Invalid Region";
    }
  }
  public selectCountry(data) {
    for (let i = 0; i < this.regionList.length; i++) {
      let obj = this.regionList.find(x => x.regionName === this.form['controls'].trialDetails['controls'].region.value);
      let index = this.regionList.indexOf(obj);
      this.countryList = this.regionList[i].countries;
      return;
    }

    console.log(data);

    // this.countryList =data.countries;
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
        this.toasterService.pop('info','Please Select a Docx File')
        // this.fileErrors = 'Please Select a Docx File';
        return false;
      } else {
        return true;
      }
    }
  }

  // ---------------------------------Site Management --------------------------------------------------------
  public tabSelected(event) {
    console.log('called', event);

  }
  public saveSites() {
    this.submitted = true;
    console.log(this.form['controls'].siteManagement.valid);

    if (this.form['controls'].siteManagement.valid) {
      this.isAddSite = false;
      this.submitted = false;
      let data = this.form['controls'].siteManagement.value;
      data.siteCoordinator = [];
      this.sitesList.push(data);
      console.log(this.sitesList)
    }
  }

  public openDialog(siteDetails, index) {
    const dialogRef = this.dialog.open(AddSiteCoordinatorComponent, {
      data: { details: siteDetails }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sitesList[index].siteCoordinator = this.sitesList[index].siteCoordinator.concat(result);
        console.log("result", this.sitesList);


      } else {
        console.log('no data');
      }
    });
  }

  public removeSite(index) {
    this.sitesList.splice(index, 1);
  }
  public removeSiteCoordinator(index1, index2) {
    this.sitesList[index1].siteCoordinator.splice(index2, 1);

  }

  public selectSites(type, value) {
    switch (type) {
      case 'siteName': {
        this.sitesLocationList.forEach((row) => {
          if (row.siteName === value) {
            this.form['controls'].siteManagement['controls'].siteId.setValue(row.siteId);
            this.form['controls'].siteManagement['controls'].siteLocation.setValue(row.siteLocation);
          }
        });
        break;
      }
      case 'siteId': {
        this.sitesLocationList.forEach((row) => {
          if (row.siteId === value) {
            this.form['controls'].siteManagement['controls'].siteName.setValue(row.siteName);
            this.form['controls'].siteManagement['controls'].siteLocation.setValue(row.siteLocation);
          }
        });
        break;
      }
      case 'siteLocation': {
        this.sitesLocationList.forEach((row) => {
          if (row.siteLocation === value) {
            this.form['controls'].siteManagement['controls'].siteName.setValue(row.siteName);
            this.form['controls'].siteManagement['controls'].siteId.setValue(row.siteId);
          }
        });
        break;
      }
    }
  }

  // ------------------------------------Table Of Task --------------------------------------------------------------------------------------------

  public addProcedure() {
    this.addProcedureSubmitted = true;
    if (this.form['controls']['tableOfTasks']['controls'].procedureDescription.valid) {
      this.isAddProcedure = false;
      this.addProcedureSubmitted = false;
      this.visitProcedures.push(this.form.value.tableOfTasks.procedureDescription);
      this.form['controls']['tableOfTasks']['controls'].procedureDescription.setValue('');
      this.form['controls']['tableOfTasks'].markAsUntouched();
      console.log("table of task", this.visitProcedures);
    } else {
      console.log("invalid", this.form['controls']['tableOfTasks'].value);

    }


  }

  public editProcedure(index) {
    this.addProcedureSubmitted = true;
    if (this.form['controls']['tableOfTasks']['controls'].procedureDescription.valid) {
      this.isProcedureEdit = false;
      this.addProcedureSubmitted = false;
      this.visitProcedures.splice(index, 1);
      this.visitProcedures.splice(index, 0, this.form.value.tableOfTasks.procedureDescription);
      this.form['controls']['tableOfTasks']['controls'].procedureDescription.setValue('');
      this.form['controls']['tableOfTasks'].markAsUntouched();
      console.log("table of task", this.form['controls']['tableOfTasks'].value);
    } else {
      console.log("invalid", this.form['controls']['tableOfTasks'].value);

    }
  }
  public addTreatment() {
    this.addTreatmentSubmitted = true;
    if (this.form['controls']['tableOfTasks']['controls'].treatmentDescription.valid) {
      this.isAddTreatment = false;
      this.addTreatmentSubmitted = false;
      this.visitTreatments.push(this.form.value.tableOfTasks.treatmentDescription)
      console.log("table of task", this.visitTreatments);
      this.form['controls']['tableOfTasks']['controls'].treatmentDescription.setValue(undefined);
      this.form['controls']['tableOfTasks'].markAsUntouched();
    } else {
      console.log("invalid", this.form['controls']['tableOfTasks'].value);

    }


  }

  public editTreatment(index) {
    this.addTreatmentSubmitted = true;
    if (this.form['controls']['tableOfTasks']['controls'].treatmentDescription.valid) {
      this.isTreatmentEdit = false;
      this.addTreatmentSubmitted = false;
      this.visitTreatments.splice(index, 1);
      this.visitTreatments.splice(index, 0, this.form.value.tableOfTasks.treatmentDescription);
      console.log("table of task", this.form['controls']['tableOfTasks'].value);
      this.form['controls']['tableOfTasks']['controls'].treatmentDescription.setValue(undefined);
      this.form['controls']['tableOfTasks'].markAsUntouched();
    } else {
      console.log("invalid", this.form['controls']['tableOfTasks'].value);

    }
  }

  // ------------------------------------------- Visits for Protocol ---------------------------------------------------------------------

  visitProtocol(): FormGroup {
    return this.fb.group({
      visitType: ['', Validators.required],
      visitProcedure: ['', Validators.required],
      visitTreatMent: ['', Validators.required],
      visitWindow: ['', Validators.required],
      startWeek: ['', Validators.required],
      endWeek: ['', Validators.required]
    })
  }
  saveProtocol() {
    this.submitted = true;
    if (this.form['controls'].visitsOfProtocol['controls'].visitType.valid && this.form['controls'].visitsOfProtocol['controls'].visitProcedure.valid &&
      this.form['controls'].visitsOfProtocol['controls'].visitTreatMent.valid && this.form['controls'].visitsOfProtocol['controls'].visitWindow.valid &&
      this.form['controls'].visitsOfProtocol['controls'].startWeek.valid && this.form['controls'].visitsOfProtocol['controls'].endWeek.valid) {
      this.visitsProtocols = this.form.controls['visitsOfProtocol'].get('visitsOfProtocol') as FormArray;
      this.visitsProtocols.push(this.visitProtocol());
      this.form['controls'].visitsOfProtocol['controls'].visitsOfProtocol['controls'][this.visitsProtocols.length - 1]['controls'].visitType.setValue(this.form['controls'].visitsOfProtocol['controls'].visitType.value);
      this.form['controls'].visitsOfProtocol['controls'].visitsOfProtocol['controls'][this.visitsProtocols.length - 1]['controls'].visitProcedure.setValue(this.form['controls'].visitsOfProtocol['controls'].visitProcedure.value);
      this.form['controls'].visitsOfProtocol['controls'].visitsOfProtocol['controls'][this.visitsProtocols.length - 1]['controls'].visitTreatMent.setValue(this.form['controls'].visitsOfProtocol['controls'].visitTreatMent.value);
      this.form['controls'].visitsOfProtocol['controls'].visitsOfProtocol['controls'][this.visitsProtocols.length - 1]['controls'].visitWindow.setValue(this.form['controls'].visitsOfProtocol['controls'].visitWindow.value);
      this.form['controls'].visitsOfProtocol['controls'].visitsOfProtocol['controls'][this.visitsProtocols.length - 1]['controls'].startWeek.setValue(this.form['controls'].visitsOfProtocol['controls'].startWeek.value);
      this.form['controls'].visitsOfProtocol['controls'].visitsOfProtocol['controls'][this.visitsProtocols.length - 1]['controls'].endWeek.setValue(this.form['controls'].visitsOfProtocol['controls'].endWeek.value);

      this.form['controls'].visitsOfProtocol['controls'].visitType.setValue(undefined);
      this.form['controls'].visitsOfProtocol['controls'].visitProcedure.setValue(undefined);
      this.form['controls'].visitsOfProtocol['controls'].visitTreatMent.setValue(undefined);
      this.form['controls'].visitsOfProtocol['controls'].visitWindow.setValue(undefined);
      this.form['controls'].visitsOfProtocol['controls'].startWeek.setValue(undefined);
      this.form['controls'].visitsOfProtocol['controls'].endWeek.setValue(undefined);
      // this.form['controls'].visitsOfProtocol.reset();
      this.form['controls'].visitsOfProtocol.markAsUntouched();
      // this.visitsProtocols.push(this.form['controls'].visitsOfProtocol.value);
      console.log(this.visitsProtocols.value);

      this.isAddProtocol = false;
      this.submitted = false;
    }
  }

  // ----------------------------------------------------- Study Medication ----------------------------------------------

  medicationGroup(): FormGroup {
    return this.fb.group({
      medicineName: ['', Validators.required],
      cycleOfDurationNo: ['', Validators.required],
      cycleOfDurationDays: ['', Validators.required],
      noOfCycle: ['', Validators.required],
      noInCycle: this.fb.array([this.noOfTimes()]),
      dosePerDay: ['', Validators.required],
      doses1: ['', Validators.required],
      doses2: ['', Validators.required],
      doses3: ['', Validators.required],
      restCycle: ['', Validators.required],
      noOfRestCycle: ['', Validators.required],
      durationOfRestCycle: ['', Validators.required],
      restCycleEndDay: ['', Validators.required],
      restCycleStartDay: ['', Validators.required],
    })
  }
  public noOfTimes(): FormGroup {
    return this.fb.group({
      time: ['', Validators.required],
    })
  }
  public addNoOfTimes() {

  }
  public setDoesSequence() {
    if (this.dosesLength === 2) {
      if (this.form['controls'].addMedication['controls'].doses1.value === 'Morning' && this.form['controls'].addMedication['controls'].doses2.value === 'Morning') {
        this.form['controls'].addMedication['controls'].doses1.setValue('AfterNoon');
      } else if (this.form['controls'].addMedication['controls'].doses1.value === 'AfterNoon' && this.form['controls'].addMedication['controls'].doses2.value === 'AfterNoon') {
        this.form['controls'].addMedication['controls'].doses1.setValue('Morning');
      } if (this.form['controls'].addMedication['controls'].doses1.value === 'Night' && this.form['controls'].addMedication['controls'].doses2.value === 'Night') {
        this.form['controls'].addMedication['controls'].doses1.setValue('Morning');
      }
    }
  }

  public setNoOfTimes() {
    let n = parseInt(this.form['controls'].addMedication['controls'].noOfCycle.value);
    this.nOfTimes = this.form.controls['addMedication'].get('noInCycle') as FormArray;
    this.nOfTimes['controls'] = [];
    for (let i = 0; i < n; i++) {
      this.nOfTimes.push(this.noOfTimes());
    }
  }
  public setDoses() {
    this.dosesLength = parseInt(this.form['controls'].addMedication['controls'].dosePerDay.value);
    if (this.dosesLength === 3) {
      this.form['controls'].addMedication['controls'].doses1.setValue('Morning');
      this.form['controls'].addMedication['controls'].doses2.setValue('AfterNoon');
      this.form['controls'].addMedication['controls'].doses3.setValue('Night');
      this.form['controls'].addMedication['controls'].doses1.disable();
      this.form['controls'].addMedication['controls'].doses2.disable();
      this.form['controls'].addMedication['controls'].doses3.disable();
    } else {
      this.form['controls'].addMedication['controls'].doses1.enable();
      this.form['controls'].addMedication['controls'].doses2.enable();
      this.form['controls'].addMedication['controls'].doses3.enable();
    }

  }
  public setRestCycle() {
    if (this.form['controls'].addMedication['controls'].restCycle.value === 'No') {
      this.form['controls'].addMedication['controls'].noOfRestCycle.setValue('NA');
      this.form['controls'].addMedication['controls'].durationOfRestCycle.setValue('NA');
      this.form['controls'].addMedication['controls'].restCycleEndDay.setValue('NA');
      this.form['controls'].addMedication['controls'].restCycleStartDay.setValue('NA');
    } else {
      this.form['controls'].addMedication['controls'].noOfRestCycle.setValue(undefined);
      this.form['controls'].addMedication['controls'].durationOfRestCycle.setValue(undefined);
      this.form['controls'].addMedication['controls'].restCycleEndDay.setValue(undefined);
      this.form['controls'].addMedication['controls'].restCycleStartDay.setValue(undefined);
    }

  }
  saveMedication() {
    this.submitted = true;
    console.log(this.form['controls'].addMedication.value);
    if (this.form['controls'].addMedication['controls'].restCycle.value === 'No' && this.form['controls'].addMedication['controls'].cycleOfDurationDays.valid &&
      this.form['controls'].addMedication['controls'].cycleOfDurationNo.valid && this.form['controls'].addMedication['controls'].dosePerDay.valid &&
       this.form['controls'].addMedication['controls'].medicineName.valid && this.form['controls'].addMedication['controls'].noOfCycle.valid &&
      this.form['controls'].addMedication['controls'].noInCycle.valid && (this.form['controls'].addMedication['controls'].doses1.valid ||
      this.form['controls'].addMedication['controls'].doses2.valid || this.form['controls'].addMedication['controls'].doses3.valid)) {
      this.medicationDataObject();
    } else if (this.form['controls'].addMedication.valid) {
      this.medicationDataObject();
    }
  }
  public medicationDataObject() {
    this.isAddMedication = false;
    for (let i = 0; i < this.form['controls'].addMedication['controls'].noInCycle.length; i++) {
      this.cycles.push(this.form['controls'].addMedication['controls'].noInCycle['controls'][i]['controls'].time.value);
    }
    const medicineDoes = {
      "morning": this.form['controls'].addMedication['controls'].doses1.value ? true : false,
      "afternoon": this.form['controls'].addMedication['controls'].doses2.value ? true : false,
      "night": this.form['controls'].addMedication['controls'].doses3.value ? true : false,
    }
    const data = {
      "cycleOfDurationDays": this.form['controls'].addMedication['controls'].cycleOfDurationDays.value,
      "cycleOfDurationNo": this.form['controls'].addMedication['controls'].cycleOfDurationNo.value,
      "dosePerDay": this.form['controls'].addMedication['controls'].dosePerDay.value,
      "durationOfRestCycle": this.form['controls'].addMedication['controls'].durationOfRestCycle.value,
      "medicineName": this.form['controls'].addMedication['controls'].medicineName.value,
      "noOfCycle": this.form['controls'].addMedication['controls'].noOfCycle.value,
      "noOfRestCycle": this.form['controls'].addMedication['controls'].noOfRestCycle.value,
      "restCycle": this.form['controls'].addMedication['controls'].restCycle.value,
      "restCycleEndDay": this.form['controls'].addMedication['controls'].restCycleEndDay.value,
      "restCycleStartDay": this.form['controls'].addMedication['controls'].restCycleStartDay.value,
      "noInCycle": this.cycles,
      "medicineDose": medicineDoes

    }
    console.log(this.studyMedicationData.length, this.studyMedicationData);
    this.studyMedicationData.push(data);
    this.form['controls'].addMedication.reset();
    this.form['controls'].addMedication['controls'].noInCycle.reset();
    this.cycles = [];
    this.form['controls'].addMedication['controls'].restCycle.setValue('Yes');
    console.log(this.studyMedicationData.length, this.studyMedicationData);

    this.isAddProtocol = false;
    this.submitted = false;
  }
  //-------------------------------------------------------------------------
  ngAfterViewInit() {
    const el = <HTMLDataElement>document.querySelector('.nav-pills');
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'itpHeader');
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    //   //  console.log('afterViewInit => ', this.tabGroup.selectedIndex);
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

  restrictData(event){
    console.log(this.form['controls'].visitsOfProtocol);
    
    return (event.keyCode ===  48 || event.keyCode ===  189 || event.keyCode ===  190) ? null : true
  }
  public valiDateForm(currentTab) {
    console.log(this.phasesName);
    
    this.submitted = true;
    switch (currentTab) {
      case 'trialDetails': {
        if (this.form['controls']['trialDetails'].valid && this.regions.length && this.files.length && !this.fileErrors && this.phasesName.length) {
          this.submitted = false;
          console.log("trial details value",
            this.form['controls']['trialDetails'].value);
            this.isTableOfTask = false;
            setTimeout(() => {
              this.tab.select('tableofTask');
            }, 1);

          return true;

        } else {
          return false;

        }
      }
      // case 'siteManagement': {
      //   if (this.sitesList.length) {
      //     this.isTableOfTask = false;
      //     this.submitted = false;
      //     console.log("site Management details", this.form['controls']['siteManagement'].value);
      //     this.isTableOfTask = false;
      //     setTimeout(() => {
      //       this.tab.select('tableofTask');
      //     }, 1);
      //   } else {
      //     console.log('invalid form');

      //   }
      //   break;
      // }
      case 'tableOfTask': {
        if (this.visitProcedures.length && this.visitTreatments.length) {
          this.isVisitsProtocol = false;
          this.submitted = false;
          console.log('valid form');
          this.isVisitsProtocol = false;
          setTimeout(() => {
            this.tab.select('visitsofProtocol');
          }, 1);
        } else {
          this.toasterService.pop('info', 'Please Enter Table Of Task Details First');
          console.log('invalid form');

        }
        break;
      }
      case 'visitsofProtocol': {
        if (this.visitsProtocols.length) {
          this.isStudyMedication = false;
          this.submitted = false;
          console.log('valid form');
          this.isStudyMedication = false;
          setTimeout(() => {
            this.tab.select('studyMedication');
          }, 1);
          console.log('visit Procedures', this.visitsProtocols.value);
        } else {
          console.log('invalid form');
          this.toasterService.pop('info', 'Please Enter Visits For Protocol Details First');
        }
        break;
      }
      case 'studyMedication': {
        if (this.studyMedicationData.length) {
          // this.finalTrialData();
          this.submitted = false;
          const data = {

          }
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
          formData.append('geographyRegion', JSON.stringify(this.form['controls']['trialDetails']['controls'].geographyRegion.value));
          formData.append('phaseOfTrial', JSON.stringify(this.phasesName));
          // formData.append('siteManagement', JSON.stringify(this.sitesList));
          formData.append('visitsForProtocol', JSON.stringify(this.visitsProtocols.value));
          formData.append('studyMedication', JSON.stringify(this.studyMedicationData));
          formData.append('file', this.files[0]);
          this.loaderService.display(true);
          this.trialManagementService.editTrial(formData).subscribe((success) => {
            console.log(success);
            this.loaderService.display(false);
            this.toasterService.pop('success', success.message);

          },
            (error) => {
              this.loaderService.display(false);
              console.log(error);

            })
        } else {
          this.toasterService.pop('info', 'Please Enter Study Medication Details First');
          console.log('invalid form');
        }
        break;
      }
    }
  }

}

