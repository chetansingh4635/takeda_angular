import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppConfig } from '../../../../config/appConfig';
import { Constants } from '../../../../config/constant';
import { UserManagementService } from '../../../modules/user_management/user-management.service';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'tm-add-user-dialog-admin',
  templateUrl: './add-user-dialog-admin.component.html',
  styleUrls: ['./add-user-dialog-admin.component.css']
})
export class AddUserDialogAdminComponent implements OnInit {
  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  namePattern = '^[a-zA-Z ]{3,20}$';
  public form: FormGroup;
  siteCoordinators: any = [];
  public Object: Object;
  public submitted: Boolean = false;
  public type: string;
  public constants = Constants;
  public sponsorUsers: any = [];
  public croUsers: any = [];
  public piUsers: any = [];
  public sponsorName = []
  public roles = [
    {
      '_id': this.constants.sitesId,
      'name': 'Site Coordinator'
    },
    {
      '_id': this.constants.piId,
      'name': 'PI'
    }
  ]
  public sitesList: any = [];
  public roleList: any = [];
  public croList: any = [];
  public piList: any = [];
  public irbs: any = [];


  constructor(public dialogRef: MatDialogRef<AddUserDialogAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public userManagementService: UserManagementService,
    public toasterService: ToasterService) {
    this.form = this.fb.group({
      sponsor: this.fb.group({
        organisation: this.fb.group({
          orgName: ['', Validators.required],
          location: ['', Validators.required]
        }),
        users: this.fb.array([]),
      }),
      cro: this.fb.group({
        organisation: this.fb.group({
          orgName: ['', Validators.required],
          orgId: ['', Validators.required]
        }),
        users: this.fb.array([]),
      }),
      sites: this.fb.group({
        organisation: this.fb.group({
          orgId: ['', Validators.required],
          orgName: ['', Validators.required],
          location: ['', Validators.required],
          irbId: ['', Validators.required],
        }),
        users: this.fb.array([]),
      }),
      irb: this.fb.group({
        complianceType: ['', Validators.required],
        irbId: ['', Validators.required],
        irbName: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
    console.log('data', this.data);
    //  ---------------------------------------------------Setting the role ----------------------------------------------------------

    this.type = this.data.type;
    this.submitted = false;
    this.getSponsorList();
    this.appendSponsorUsers();
    this.appendCroUsers();
    this.appendSiteCoordinator();
    this.getIrbList();
    this.userManagementService.getCroList().subscribe((data) => {
      console.log(data);
      this.croList = data.data;

    },
      (error) => {
        console.log(error);
      });
    this.userManagementService.getRoleList().subscribe((data) => {
      console.log(data);
      this.roleList = data.data;

    },
      (error) => {
        console.log(error);
      })
    this.userManagementService.getPiList().subscribe((data) => {
      console.log(data);
      this.piList = data.data;

    },
      (error) => {
        console.log(error);
      })
    // this.appendSiteCoordinator();
    // //  console.log(this.data.data);
    // if (this.data.data && this.data.type === 'Cro') {
    //   this.form.controls['cro'].setValue(this.data.data);
    // } else if (this.data.data && this.data.type === 'Pi') {
    //   this.form.controls['pi'].setValue(this.data.data);
    // } else if (this.data.data && this.data.type === 'RegulatoryBody') {
    //   this.form.controls['regulatoryBody'].setValue(this.data.data);
    // } else if (this.data.data && this.data.type === 'Sponsor') {
    //   this.form.controls['sponsor'].setValue(this.data.data);
    // }
    // //  console.log(this.form.controls);
  }

  public getIrbList() {
    this.userManagementService.getIrbList().subscribe((data) => {
      this.irbs = data.data;
      console.log("irb", this.irbs);

    },
      (err) => {
        console.log(err);

      })
  }
  public getSponsorList() {
    this.userManagementService.getSponsorList().subscribe((data) => {
      this.sponsorName = data.data;
      console.log("Sponsor List", this.sponsorName);
    },
      err => {
        console.log(err);
      }
    );
  }
  // -----------------------------------------------Defining FormArrays --------------------------------------------------------------------

  public addSponsorUsers(): FormGroup {
    return this.fb.group({
      userId: ['', Validators.required],
      nickName: ['', Validators.required],
      emailId: ['', Validators.required]
    });
  }

  public addSiteCoordinator(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      emailId: ['', Validators.required]
    })
  }
  public addCroUsers() {
    return this.fb.group({
      nickName: ['', Validators.required],
      emailId: ['', Validators.required]
    });
  }
  public addPiUsers() {
    return this.fb.group({
      nickName: ['', Validators.required],
      emailId: ['', Validators.required]
    });
  }
  public addSiteCoordinators() {
    return this.fb.group({
      roleId: ['', Validators.required],
      nickName: ['', Validators.required],
      emailId: ['', Validators.required]
    });
  }

  // -----------------------------------------Appending FormArray ------------------------------------------------------------------------------
  public appendSponsorUsers() {
    this.sponsorUsers = this.form.controls['sponsor'].get('users') as FormArray;
    this.sponsorUsers.push(this.addSponsorUsers());
  }
  public appendCroUsers() {
    this.croUsers = this.form.controls['cro'].get('users') as FormArray;
    this.croUsers.push(this.addCroUsers());
  }
  public appendPiUsers() {
    this.piUsers = this.form.controls['pi'].get('users') as FormArray;
    this.piUsers.push(this.addCroUsers());
  }
  public appendSiteCoordinator() {
    this.siteCoordinators = this.form.controls['sites'].get('users') as FormArray;
    this.siteCoordinators.push(this.addSiteCoordinators());
  }

  public saveSponsorUsers() {
    this.submitted = true;
    if (this.form['controls'].sponsor['controls'].users.valid) {
      this.submitted = false;
      if (this.userManagementService.checkDuplicateUser(this.form['controls'].sponsor['controls'].users.value)) {
        this.appendSponsorUsers();
      } else {
        this.toasterService.pop('warn', "Please Remove Duplicate Users");
      }
    }
  }
  public saveCroUsers() {
    this.submitted = true;
    if (this.form['controls'].cro['controls'].users.valid) {
      this.submitted = false;
      if (this.userManagementService.checkDuplicateUser(this.form['controls'].cro['controls'].users.value)) {
        this.appendCroUsers();
      } else {
        this.toasterService.pop('warn', "Please Remove Duplicate Users");
      }

    }
  }

  public saveSiteCordinators() {
    this.submitted = true;
    if (this.form['controls'].sites['controls'].users.valid) {
      this.submitted = false;
      if (this.userManagementService.checkDuplicateUser(this.form['controls'].sites['controls'].users.value)) {
        this.appendSiteCoordinator();
      } else {
        this.toasterService.pop('warn', "Please Remove Duplicate Users");
      }
    }
  }

  public setUserId(type, value) {
    if (type === 'croList') {
      this.croList.forEach((row) => {
        if (row._id === value) {
          this.form.controls['siteCoordinator']['controls'].userId.setValue(row.userId);
        }
      });

    } else {
      this.piList.forEach((row) => {
        if (row._id === value) {
          this.form.controls['siteCoordinator']['controls'].userId.setValue(row.userId);
        }
      });
    }
  }

  public selectSponsor(type, value) {
    console.log("value", value);
    switch (type) {
      case 'sponsor': {
        this.sponsorName.forEach((row) => {
          if (row.orgName === value) {
            this.form['controls'].sponsor['controls'].organisation['controls'].location.setValue(row.location);
          }
        });
        break;
      }
      case 'location': {
        this.sponsorName.forEach((row) => {
          if (row.location === value) {
            this.form['controls'].sponsor['controls'].organisation['controls'].orgName.setValue(row.orgName);
          }
        });
        break;
      }
    }

  }

  //----------------------------- Saving Form Data ----------------------------------------------------------------------
  public saveUsers() {
    this.submitted = true;
    switch (this.data.type) {
      case 'organisation': {
        if (this.data.role === this.constants.sponsorId && this.form['controls'].sponsor['controls'].organisation.valid) {
          const data = {
            type: 'sponsor',
            data: this.form['controls'].sponsor['controls'].organisation.value
          }
          data.data.roleId = this.data.role;
          this.dialogRef.close(data);
        } else if (this.data.role === this.constants.croId && this.form['controls'].cro['controls'].organisation.valid) {
          const data = {
            type: 'cro',
            data: this.form['controls'].cro['controls'].organisation.value
          }
          data.data.roleId = this.data.role;
          this.dialogRef.close(data);
        } else if (this.data.role === this.constants.irbId && this.form['controls'].irb.valid) {
          this.dialogRef.close(this.form['controls'].irb.value);
        } else if (this.data.role === this.constants.sitesId && this.form['controls'].sites['controls'].organisation.valid) {
          const data = {
            type: 'siteCoordinator',
            data: this.form['controls'].sites['controls'].organisation.value
          }
          data.data.roleId = this.data.role;
          this.dialogRef.close(data);
        }
        break;
      }
      case 'user': {
        if (this.data.role === this.constants.sponsorId && this.form['controls'].sponsor['controls'].users.valid) {

          const data = {
            users: this.form['controls'].sponsor['controls'].users.value
          }
          data['roleId'] = this.data.role;
          data['orgId'] = this.data.data._id;
          if (this.userManagementService.checkDuplicateUser(this.form['controls'].sponsor['controls'].users.value)) {
            this.dialogRef.close(data);
          } else {
            this.toasterService.pop('warn', "Please Remove Duplicate Users");
          }
        } else if (this.data.role === this.constants.croId && this.form['controls'].cro['controls'].users.valid) {
          const data = {
            users: this.form['controls'].cro['controls'].users.value
          }
          data['roleId'] = this.data.role;
          data['orgId'] = this.data.data._id;
          if (this.userManagementService.checkDuplicateUser(this.form['controls'].cro['controls'].users.value)) {
            this.dialogRef.close(data);
          } else {
            this.toasterService.pop('warn', "Please Remove Duplicate Users");
          }
        } else if (this.data.role === this.constants.irbId && this.form['controls'].irb['controls'].users.valid) {
          const data = {
            type: 'irb',
            data: this.form['controls'].irb.value
          }
          data.data.roleId = this.data.role;
          this.dialogRef.close(data);
        } else if (this.data.role === this.constants.sitesId && this.form['controls'].sites['controls'].users.valid) {
          const data = {
            users: this.form['controls'].sites['controls'].users.value
          }
          // data['roleId'] = this.data.role;
          data['orgId'] = this.data.data._id;
          if (this.userManagementService.checkDuplicateUser(this.form['controls'].sites['controls'].users.value)) {
            this.dialogRef.close(data);
          } else {
            this.toasterService.pop('warn', "Please Remove Duplicate Users");
          }
        }
        break;
      }
    }


  }
}
