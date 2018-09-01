import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorage } from '../../../../../../commons/services/localStorage.service';
import { Constants } from '../../../../../../../config/constant';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../../../../../../commons/services/loader.service';
import { UserManagementService } from '../../../../user-management.service';
import { ToasterService } from 'angular2-toaster';
import { AppConfig } from '../../../../../../../config/appConfig';
import { PagerService } from '../../../../../../commons/services/pager.service';
import * as _ from 'lodash';
@Component({
  selector: 'tm-medication-setup',
  templateUrl: './medication-setup.component.html',
  styleUrls: ['./medication-setup.component.css']
})
export class MedicationSetupComponent implements OnInit {
  public medicationLists: any = [];
  public subjectId: any;
  public subjectName: any;
  date: Date = new Date();
  public medications: any = [];
  public searchFilter: any;
  public paginationData: any = [];
  public medicationData: any = [];
  public pager: any = [];
  public isView: Boolean;
  public enrollmentVisit: any;
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy',
    defaultOpen: false
  };
  constructor(
    private loaderService: LoaderService,
    private userManagementService: UserManagementService,
    private datePipe: DatePipe,
    public router: Router,
    private toaterService: ToasterService,
  private pagerService: PagerService,
  private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.data.subscribe((data) => {
        this.isView = data.view;
        // console.log(this.isView);
      });
      this.subjectId = LocalStorage.get('subjectId1');
      this.subjectName = LocalStorage.get('subjectName');
      this.loaderService.display(true);
      if (!this.isView) {
      this.userManagementService.getAllMedications().subscribe((data) => {
        this.loaderService.display(false);
        this.medicationLists = data.data;
        this.paginationData =  Object.assign([], this.medicationLists);
        this.setPage(1);
        console.log(data);
      },
        (err) => {
          this.loaderService.display(false);
          console.log(err);
        });
      } else {
        this.userManagementService.getSubjectDetail(this.subjectId).subscribe((data) => {
          this.loaderService.display(false);
          this.enrollmentVisit = data.data[0].enrollmentVisit;
          this.medicationLists = data.data[0].medications;
          this.paginationData =  Object.assign([], this.medicationLists);
          this.setPage(1);
          console.log(data);
        },
          (err) => {
            this.loaderService.display(false);
            console.log(err);
          });
      }

    }
    public addAndUpdate() {
      if (this.medications.length) {
        this.loaderService.display(true);
        const visitData = {
          'medications': this.medications
        };
        this.userManagementService.addAndUpdateMedication(visitData, this.subjectId).subscribe((data) => {
          const role = LocalStorage.get('role');
          this.loaderService.display(false);
          this.toaterService.pop('success', data.message);
          // this.router.navigate([`../allSubjects?=${role}`]);
        },
          (err) => {
            this.loaderService.display(false);
            this.toaterService.pop('error', 'Network Error');
            console.log(err);
          });
    } else {
    this.toaterService.pop('error', 'Please Select Visits ');
  }
    }
    public updateVisit(event, medication) {
    const data = {
      medicationId: medication._id,
      medicationStartDate: medication.medicationStartDate ? medication.medicationStartDate : new Date(),
      noInCycle: medication.noInCycle,
      medicineName: medication.medicineName,
      dosePerDay: medication.dosePerDay,
      medicineDose: medication.medicineDose
    };
    const index = this.medications.findIndex(row => row['_id'] === medication._id);
    if (event.checked) {
      if (index > -1) {
        this.medications.splice(index, 1);
        this.medications.push(data);
      } else {
        this.medications.push(data);
      }
    } else {
      this.medications.splice(index, 1);
    }
    // console.log(this.medications);
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.paginationData.length, page);
    if (page < 1 || page > this.pager.totalPages) {
      this.medicationData = [];
      return;
    }
    this.medicationData = this.paginationData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log(this.trialDocData);

  }
 public searchData() {
   const query = this.searchFilter;
   if (query) {
     this.paginationData = _.filter(this.medicationLists, row => {
       return (row['medicineName'] ? row['medicineName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
         (row['dosePerDay'] ? (row['dosePerDay'].toString()).search(new RegExp(query, 'i')) !== -1 : 0);
        //  (row['enrolledDate'].length ? (row['irbInfo'][0].irbName.search(new RegExp(query, 'i')) !== -1) : 0);
     });
     this.setPage(1);
     return;
   } else {
     this.paginationData = this.medicationLists;
     this.setPage(1);
     return;
   }
 }
}
