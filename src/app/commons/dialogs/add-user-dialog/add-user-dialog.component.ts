import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../../../commons/services/loader.service';
import { AppConfig } from '../../../../config/appConfig';
import { ToasterService } from 'angular2-toaster';
import { AddUserDialogService } from './add-user-dialog.service';
import { Constants } from '../../../../config/constant';

@Component({
  selector: 'tm-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  public roleListData: any = [];
  public role: any;
  public tempRoleListData: any = [];
  public locationListData: any = [];
  public errMessage: any;
  public form: FormGroup;
  public submitted: Boolean;
  namePattern = '^[a-zA-Z ]{3,20}$';
  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  constants = Constants;

  constructor(public addUserService: AddUserDialogService,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public loaderService: LoaderService,
    public toasterService: ToasterService) {
  }


  ngOnInit() {
    this.tempRoleListData = this.data.role;
    this.locationList();

    this.form = this.fb.group({
      roleId: ['', [Validators.required]],
      nickName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      location: ['', [Validators.required]],
      orgName: ['', [Validators.required]]
    });
    this.form['controls'].roleId.setValue(this.data.type === 'admin' ? this.constants.adminId : this.constants.sponsorId);
    this.editUser();
    console.log(this.data);
    
  }

  addUser() {
    this.submitted = true;
    this.role = this.form['controls'].roleId.value;
    if(!this.form['controls'].nickName.value.trim()){
      this.form['controls'].nickName.setValue(undefined);
    } 
    if(!this.form['controls'].orgName.value.trim()){
      this.form['controls'].orgName.setValue(undefined);
    }
    if (this.role === this.constants.adminId) {
      if (this.form['controls'].nickName.valid && this.form['controls'].nickName.valid && this.checkAutoComplete()) {
        if (this.form['controls'].email.valid ||this.form['controls'].email.disabled ) {
          if (this.form['controls'].location.valid) {
            console.log(this.form.value);
            
            this.dialogRef.close(this.form.value);
          }
        }
      }
    } else if (this.role === this.constants.sponsorId) {
      if (this.form['controls'].orgName.valid &&this.form['controls'].orgName.valid && this.checkAutoComplete()) {
        if (this.form['controls'].location.valid) {
          this.dialogRef.close(this.form.value);
        }
      }
    } 
    else{
      console.log("Invalid Form");
      
    }
  }

  public checkAutoComplete() {
    const index = this.locationListData.findIndex(row => row['location'] === this.form.controls['location'].value);
        if (index > -1) {
          return true;
        } else {
          this.form.controls['location'].setValue(undefined);
          return false;
        }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  locationList() {
    this.addUserService.getLocationList().subscribe((res) => {
      this.locationListData = res.data;
      console.log(this.locationListData);
      
    }, (err) => {
      this.errMessage = JSON.parse(err._body).message;
    });
  }


  editUser() {
    console.log(this.data);
    if (this.data.isEdit) {
      this.form['controls'].roleId.disable();
      if (this.data.type === 'admin') {
        this.form['controls'].roleId.setValue(this.constants.adminId);
        this.form['controls'].nickName.setValue(this.data.data.nickName);
        this.form['controls'].location.setValue(this.data.data.location);
        this.form['controls'].email.setValue(this.data.data.emailId);
        this.form['controls'].email.disable();
      }
      else if (this.data.type === 'sponsor') {
        this.form['controls'].roleId.setValue(this.constants.sponsorId);
        this.form['controls'].orgName.setValue(this.data.data.orgName);
        this.form['controls'].location.setValue(this.data.data.location);
      }
    }
  }
  // public formReset(role): void {
  //   this.form.reset();
  //   this.form['controls'][role]['controls']['role'].setValue(role);
  // }
}
