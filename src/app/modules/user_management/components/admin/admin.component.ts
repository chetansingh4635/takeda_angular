import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AddUserDialogAdminComponent } from '../../../../commons/dialogs/add-user-dialog-admin/add-user-dialog-admin.component';
import { ConfirmDialogComponent } from '../../../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { Constants } from '../../../../../config/constant';
import { DatePipe } from '@angular/common';
import { LoaderService } from '../../../../commons/services/loader.service';
import { ToasterService } from 'angular2-toaster';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
import * as _ from 'lodash';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'tm-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  temp: any;
  croData: any;
  piData: any;
  regulatoryBodyData: any;
  sponsorData: any;
  currentTabIndex = 0;
  searchFilter:string;
  public constants = Constants;
  public adminFilter: any;
  public sponsorFilter: any;
  public sortType: string;
  public siteCoordinator = true;
  public irb = true;
  public url: string;
  public userType: string = this.constants.sponsorId;
  public userList: any = [];
  public croList: any = [];
  public piList: any = [];
  public croOrganisationList: any = [];
  public filteredData: any =[];

  @ViewChild('t') tab: MatTabGroup;
  public arrayOne(n: number): any[] {
    n = 9 - n;
    return Array(n);
  }
  constructor(public dialog: MatDialog,
    public router: Router,
    public adminService: AdminService,
    public loaderService: LoaderService,
  public toasterService: ToasterService,
  config: NgbTooltipConfig) { 
    config.placement = 'right';
    config.triggers = 'click';
  }

  ngOnInit() {

    const thisPage = <HTMLElement>document.querySelector('#page');
    thisPage.style.background = '#eff3f6';

   

    this.url = this.router.url;
    const lastIndex = this.url.length - 30;
    this.url = this.url.slice(0, lastIndex);
    const index = this.url.lastIndexOf('/');
    this.url = this.url.slice(index + 1, this.url.length);
    switch (this.url) {
      case 'sponsor': this.getUserList('sponsor'); break;
      case 'cro': this.getUserList('cro'); break;
      case 'pi': this.getUserList('pi'); break;
      case 'siteCoordinator': this.getUserList('siteCoordinator'); break;
      case 'irb': this.getUserList('irb'); break;
    }
    // this.getUserList(this.userType);

  }

  getCroList() {
    this.adminService.getCroList().subscribe((success) => {
      this.croOrganisationList = success.data;
    },
      (error) => {

      });
  }
  getUserList(type) {
    this.loaderService.display(true);
    switch (type) {
      case 'sponsor': {
        this.adminService.getList(this.constants.sponsorId).subscribe((data) => {
          console.log('success', data);
          this.loaderService.display(false);
          this.userList = data.data;
          this.filteredData = Object.assign([],this.userList);

        },
          (err) => {
            console.log('error', err);
            this.loaderService.display(false);
          });
        break;
      }
      case 'cro': {
        this.adminService.getList(this.constants.croId).subscribe((data) => {
          console.log('success', data);
          this.loaderService.display(false);
          this.userList = data.data;
          this.filteredData = Object.assign([],this.userList);

        },
          (err) => {
            console.log('error', err);
            this.loaderService.display(false);
          });
        break;
      }
      case 'pi': {
        this.adminService.getList(this.constants.piId).subscribe((data) => {
          console.log('success', data);
          this.loaderService.display(false);
          this.userList = data.data;
          this.filteredData = Object.assign([],this.userList);

        },
          (err) => {
            console.log('error', err);
            this.loaderService.display(false);
          });
        break;
      }
      case 'siteCoordinator': {
        this.adminService.getList(this.constants.sitesId).subscribe((data) => {
          console.log('success', data);
          this.loaderService.display(false);
          // data.data.forEach(row => {
          //   if (row.role.indexOf(this.constants.croId)) {
          //     this.croList.push(row);
          //   }
          //   if (row.role.indexOf(this.constants.piId)) {
          //     this.piList.push(row);
          //   }
          // });
          this.userList = data.data;
          this.filteredData = Object.assign([],this.userList);

        },
          (err) => {
            console.log('error', err);
            this.loaderService.display(false);
          });
        break;
      }
      case 'irb': {
        this.adminService.getIrbList().subscribe((data) => {
          console.log('success', data);
          this.loaderService.display(false);
          this.userList = data.data;
          this.filteredData = Object.assign([],this.userList);

        },
          (err) => {
            console.log('error', err);
            this.loaderService.display(false);
          });
        break;
      }
    }
    // this.adminService.getList(type).subscribe((data) => {
    //    console.log('success', data);
    //    this.userList = data.data;

    // },
    //   (err) => {
    //      console.log('error', err);
    //   });

  }
  changeOrder(data): void {
    this.sortType = data;
  }

  openDialog(type, item): void {
    let roleId;
    this.getCroList();
    if (this.url === 'sponsor') {
      roleId = this.constants.sponsorId;
    } else if (this.url === 'cro') {
      roleId = this.constants.croId
    } else if (this.url === 'siteCoordinator') {
      roleId = this.constants.sitesId
    } else if (this.url === 'irb') {
      roleId = this.constants.irbId
    }
    if (type === 'organisation') {

    } else {

    }
    const dialogRef = this.dialog.open(AddUserDialogAdminComponent, {
      width: '700px',
      // height: '500px',
      // maxHeight: '700px',
      data: { type: type, role: roleId, data: item, activeTab: this.tab }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (type) {
          case 'organisation': {
            if(this.url !== 'irb'){
            this.saveOrganisation(result.data);
            } else {
              this.saveIrb(result);
            }
            break;
          }
          case 'user': {
            this.saveUsers(result);
            break;
          }
        }
      }
    });
 
  }
 
  saveIrb(data){
    this.loaderService.display(true);
    this.adminService.saveIrb(data).subscribe((success) => {
      this.loaderService.display(false);
      this.toasterService.pop('success', 'Organization Added Successfully')
      console.log(success);
      this.getUserList(this.url);;
    }),
      (error) => {
        console.log(error);
        this.loaderService.display(false);
      }
  }
  saveOrganisation(data) {
    this.loaderService.display(true);
    this.adminService.saveOrganisations(data).subscribe((success) => {
      this.loaderService.display(false);
      this.toasterService.pop('success', 'Organization Added Successfully')
      console.log(success);
      this.getUserList(this.url);;
    }),
      (error) => {
        console.log(error);
        this.loaderService.display(false);
      }
  }
  saveUsers(result) {
    this.loaderService.display(true);
    this.adminService.saveUsers(result).subscribe((success) => {
      this.loaderService.display(false);
      this.toasterService.pop('success', 'User Added Successfully')
      console.log(success);
      this.getUserList(this.url);;
    }),
      (error) => {
        console.log(error);
        this.loaderService.display(false);

      }
  }
  deleteOrgnisation(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { type: 'delete', user: this.url }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {

    this.loaderService.display(true);
    this.adminService.deleteOrganisation(id).subscribe((success) => {
      this.loaderService.display(false);
      this.toasterService.pop('success', 'Organization Deleted Successfully')
      console.log(success);
      this.getUserList(this.url);
    },
      (error) => {
        console.log(error);
        this.loaderService.display(false);

      })
    }
  });
  }

  deleteUser(userId) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { type: 'delete', user: this.url }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
    this.loaderService.display(true);
    this.adminService.deleteUser(userId).subscribe((success) => {
      this.loaderService.display(false);
      this.toasterService.pop('success', 'User Deleted Successfully')
      console.log(success);
      this.getUserList(this.url);
    },
      (error) => {
        console.log(error);
        this.loaderService.display(false);
      })
        }
  });
  }
  deleteIrb(id){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { type: 'delete', user: this.url }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
    this.loaderService.display(true);
    this.adminService.deleteIrb(id).subscribe((success) => {
      this.loaderService.display(false);
      this.toasterService.pop('success', 'User Deleted Successfully')
      console.log(success);
      this.getUserList(this.url);
    },
      (error) => {
        console.log(error);
        this.loaderService.display(false);
      })
    }
  });
    }
  getSiteCoordinatorTabList(event) {
    console.log(event, this.tab);

  }

  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.userList = _.filter(this.filteredData, row => {
        return (row['orgName'] ? row['orgName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['orgId'] ? row['orgId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['userId'] ? row['userId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['nickName'] ? (row['nickName'].search(new RegExp(query, 'i')) !== -1) : 0) ||
          (row['emailId'] ? row['emailId'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['complianceType'] ? row['complianceType'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['irbName'] ? row['irbName'].search(new RegExp(query, 'i')) !== -1 : 0) ||
          (row['irbId'] ? row['irbId'].search(new RegExp(query, 'i')) !== -1 : 0);
      });
      return;
    } else {
      this.userList = this.filteredData;
      return;
    }
  }
  // confirmDialog(id): void {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     width: '250px',
  //     data: {}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     //  console.log('The dialog was closed', result);
  //     if (result === 'Yes') {
  //       if (this.currentTabIndex === 0) {
  //         this.croData.splice(id, 1);
  //       } else if (this.currentTabIndex === 1) {
  //         this.piData.splice(id, 1);
  //       } else if (this.currentTabIndex === 2) {
  //         this.regulatoryBodyData.splice(id, 1);
  //       } else if (this.currentTabIndex === 3) {
  //         this.sponsorData.splice(id, 1);
  //       }
  //     }
  //   });
  // }

}


