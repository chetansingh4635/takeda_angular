import { Component, OnInit, AfterContentInit } from '@angular/core';
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
  selector: 'tm-visite-setup',
  templateUrl: './visite-setup.component.html',
  styleUrls: ['./visite-setup.component.css']
})
export class VisiteSetupComponent implements OnInit, AfterContentInit {
  public visitLists: any = [];
  public subjectId: any;
  public subjectName: any;
  date: Date = new Date();
  public visits: any = [];
  public searchFilter: any;
  public paginationData: any = [];
  public visitsData: any = [];
  public pager: any = [];
  public isView: Boolean;
  public constants = Constants;
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy,HH:MM',
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
    this.userManagementService.getAllVisits().subscribe((data) => {
      this.loaderService.display(false);
      this.visitLists = data.data;
      // console.log("visits set",this.visitLists);
      this.paginationData = Object.assign([], this.visitLists);
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
        this.visitLists = data.data[0].visits;
        // console.log("visits view",this.visitLists);
        this.paginationData = Object.assign([], this.visitLists);
        this.setPage(1);
        console.log(data);
      },
        (err) => {
          this.loaderService.display(false);
          console.log(err);
        });

    }
  }

  ngAfterContentInit() {
    const banner = <HTMLElement>document.querySelector('.wc-day-row');
    if (banner) {
    banner.style.display = 'none';
    }
    }
  public addAndUpdate() {
    if (this.visits.length) {
      this.loaderService.display(true);
      const visitData = {
        'visits': this.visits
      };
      this.userManagementService.addAndUpdateVisit(visitData, this.subjectId).subscribe((data) => {
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

  public updateVisit(event, visit) {
    console.log(visit);
    const data = {
      visitId: visit._id,
      visitDate: visit.visitDate ? visit.visitDate : new Date(),
      visitProcedure: visit.visitProcedure,
      visitWindow: visit.visitWindow
    };
    const index = this.visits.findIndex(row => row['_id'] === visit._id);
    if (event.checked) {
      if (index > -1) {
        this.visits.splice(index, 1);
        this.visits.push(data);
      } else {
        this.visits.push(data);
      }
    } else {
      this.visits.splice(index, 1);
    }
    // console.log(this.visits);
  }
  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.paginationData.length, page);
    if (page < 1 || page > this.pager.totalPages) {
      this.visitsData = [];
      return;
    }
    this.visitsData = this.paginationData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log(this.trialDocData);

  }
  public searchData() {
    const query = this.searchFilter;
    if (query) {
      this.paginationData = _.filter(this.visitLists, row => {
        return (row['visitDescription'] ? row['visitDescription'].search(new RegExp(query, 'i')) !== -1 : 0);
      });
      this.setPage(1);
      return;
    } else {
      this.paginationData = this.visitLists;
      this.setPage(1);
      return;
    }
  }
}
