import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AddUserDialogComponent } from '../../../../commons/dialogs/add-user-dialog/add-user-dialog.component';
import { ConfirmDialogComponent } from '../../../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from './super-admin.service';
// import { ConfirmDialogComponent } from '../../../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { AddSubjectDialogComponent } from '../../../../commons/dialogs/add-subject-dialog/add-subject-dialog.component';
import { AssignSiteDialogComponent } from '../../../../commons/dialogs/assign-site-dialog/assign-site-dialog.component';
import { LoaderService } from '../../../../commons/services/loader.service';
import { UserManagementService } from '../../user-management.service';
import { PagerService } from '../../../../commons/services/pager.service';
import { ToasterService } from 'angular2-toaster';
import { DatePipe } from '@angular/common';
import { Constants } from '../../../../../config/constant';
import * as _ from 'lodash';

@Component({
  selector: 'tm-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuperAdminComponent implements OnInit {
  temp: any;
  hotPatientsData: any;
  warmPatientsData: any;
  currentTabIndex = 0;
  public hotPatientsFilter: any;
  public warmPatientsFilter: any;
  public sortType: string;
  public searchFilter: any;
  public userData: any;
  public userDataFilter: any;
  public url: string;
  public temporaryData: any = [];
  public paginationData: any = [];
  public filteredData: any = [];
  pager: any = {};
  pagedItems: any[];
  public locationList: any;
  public selectedValue = [];
  public defaultLocationType: any = [];
  public locationTypeValue = [];
  constants = Constants;
  public index: any;
  public roleListData: any = [];
  public tempRoleListData: any = [];
  public errMessage: any;


  @ViewChild('userManagementTab') userManagementTab: MatTabGroup;
  public arrayOne(n: number): any[] {
    n = 9 - n;
    return Array(n);
  }
  constructor(private loaderService: LoaderService,
    private userManagementService: UserManagementService,
    public router: Router,
    private datePipe: DatePipe,
    private pagerService: PagerService,
    private toaterService: ToasterService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.url = this.router.url;
    const lastIndex = this.url.length - 30;
    this.url = this.url.slice(0, lastIndex);
    const index = this.url.lastIndexOf('/');
    this.url = this.url.slice(index + 1, this.url.length);
    this.roleList();
    this.loaderService.display(true);
  }


  public roleList(): void {
    this.userManagementService.getRoleList().subscribe((res) => {
      this.roleListData = res.data;
      this.tempRoleListData = [];
      this.allLocations();
      this.roleListData.forEach(role => {
        if ((role._id === this.constants.adminId) || (role._id === this.constants.sponsorId)) {
          this.tempRoleListData.push(role);
        }

      });
    }, (err) => {
      this.errMessage = JSON.parse(err._body).message;
    });
  }

  public allLocations(): void {
    this.userManagementService.getLocationList().subscribe((data) => {
      this.locationList = data.data;
      const type = this.url === 'admin' ? this.constants.adminId : this.constants.sponsorId;
      this.userManagementService.getUserList(type).subscribe((data) => {
        // console.log(data);
        this.loaderService.display(false);
        this.userDataFilter = Object.assign([], data.data);
        this.url = this.router.url;
        const lastIndex = this.url.length - 30;
        this.url = this.url.slice(0, lastIndex);
        const index = this.url.lastIndexOf('/');
        this.url = this.url.slice(index + 1, this.url.length);
        switch (this.url) {
          case 'admin': this.getUserList('admin'); break;
          case 'sponsor': this.getUserList('sponsor'); break;
        }
      },
        (err) => {
          console.log(err);
        });
      this.locationList.forEach(addLoc => {
        this.locationTypeValue.push(addLoc.location);
      });
      // console.log(this.locationTypeValue);

      this.defaultLocationType = Object.assign([], this.locationTypeValue);


      this.selectedValue = this.selectedValue.concat(this.locationTypeValue);
      // console.log(this.defaultLocationType);

    },
      err => {
        console.log(err);
      }
    );
  }

  public toggle(event, type, value) {
    switch (type) {
      case 'allLocations': {
        // this.toggleFilterSubmenu('showAllStatus');
        if (event.checked) {
          this.locationTypeValue = Object.assign([], this.defaultLocationType);

        } else {
          this.locationTypeValue = [];
        }
        break
      }
      case 'location': {
        const index = this.locationTypeValue.indexOf(value);
        if (index > -1) {
          this.locationTypeValue.splice(index, 1);
        } else {
          this.locationTypeValue.splice(index, 0, value);
        }

        // console.log(this.locationTypeValue);
        break
      }
      case 'toggle': break;
    }
    this.selectedValue = this.selectedValue.concat(this.locationTypeValue);
    this.filterSubjects();
    // console.log('parent', event);

  }

  public addUser(userDetails, callFrom): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '700px',
      data: { data: userDetails, isEdit: callFrom === 'add' ? false : true, type: this.url, role: this.tempRoleListData }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        let dataObj: any;
        dataObj = {
          roleId: result.roleId,
          nickName: result.nickName,
          emailId: result.email,
          location: result.location,
          orgName: result.orgName
        };
        // }
        if (callFrom === 'add') {
          this.loaderService.display(true);
          this.userManagementService.addUser(dataObj,this.url).subscribe((data) => {
            // this.loaderService.display(false);
            this.ngOnInit();
            if (result.roleId === this.constants.adminId) {
              this.toaterService.pop('success', 'Admin Added Successfully', '');
            }
            else if (result.roleId === this.constants.sponsorId) {
              this.toaterService.pop('success', 'Sponsor Added Successfully', '');

            } else {
              this.toaterService.pop('success', 'User Added Successfully', '');
            }

          },
            (error) => {
              console.log(error);
              this.loaderService.display(false);
              error = JSON.parse(error._body);
              this.toaterService.pop('error', error.message, '');
            });
        }

        if (callFrom === 'edit') {
          this.loaderService.display(true);
          const type = this.url === 'admin' ? this.constants.adminId : this.constants.sponsorId;
          this.userManagementService.editUser(dataObj, userDetails._id, type).subscribe((data) => {
            // this.loaderService.display(false);
            this.ngOnInit();
            if (this.url === 'admin') {
              this.toaterService.pop('success', 'Admin Updated Successfully', '');
            }
            else if (this.url === 'sponsor') {
              this.toaterService.pop('success', 'Sponsor Updated Successfully', '');

            } else {
              this.toaterService.pop('success', 'User Updated Successfully', '');
            }
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

      }

    });

  }


  public getUserList(type) {
    switch (type) {
      case 'admin': {
        this.temporaryData = this.userDataFilter.filter((row) => {
          return (row.role.indexOf(this.constants.adminId) > -1);
        });
        break;
      } case 'sponsor': {
        this.temporaryData = this.userDataFilter.filter((row) => {
          return (row.role.indexOf(this.constants.sponsorId) > -1);
        });
        break;

      }
    }
    console.log(this.temporaryData);


    // }
    this.filterSubjects();

  }


  public filterSubjects() {
    this.selectedValue = this.locationTypeValue;
    this.paginationData = _.filter(this.temporaryData, (row) => {
      return (row.location ? this.locationTypeValue.indexOf(row.location) > - 1 : true);

    });
    this.filteredData = this.paginationData;
    this.setPage(1);
    this.searchData();
  }


  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.paginationData.length, page);
    this.index = (page - 1) * 10;
    console.log(this.index);

    if (page < 1 || page > this.pager.totalPages) {
      this.userData = [];
      return;
    }
    this.userData = this.paginationData.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log(this.userData);

  }

  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.paginationData = _.filter(this.filteredData, row => {
        return (row['nickName'] ? row['nickName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['orgName'] ? row['orgName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['emailId'] ? row['emailId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['location'] ? row['location'].search(new RegExp(query, 'i')) !== -1 : 0);
      });
      this.setPage(1);
      return;
    } else {
      this.paginationData = this.filteredData;
      this.setPage(1);
      return;
    }
  }

  deleteUser(item, id) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { type: 'delete', user: this.url }
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result === 'yes') {

        this.loaderService.display(true);
        const index = this.temporaryData.indexOf(item);
        console.log('index', index);
        const type = this.url === 'admin' ? this.constants.adminId : this.constants.sponsorId;
        this.userManagementService.deleteUserDetails(id, type).subscribe(() => {
          console.log('before', this.temporaryData);


          console.log('after', this.temporaryData);
          // this.loaderService.display(false);
          if (this.url === 'admin') {
            this.toaterService.pop('success', 'Admin Deleted Successfully', '');
          }
          else if (this.url === 'sponsor') {
            this.toaterService.pop('success', 'Sponsor Deleted Successfully', '');

          } else {
            this.toaterService.pop('success', 'User Deleted Successfully', '');
          }

          // this.temporaryData.splice(index, 1);
          this.ngOnInit();
        },
          (error) => {
            console.log(error);
            this.loaderService.display(false);
            // error = JSON.parse(error._body);
            this.toaterService.pop('error', JSON.parse(error._body).message.split(':')[0], '');
          });
      }
    });
  }




}



