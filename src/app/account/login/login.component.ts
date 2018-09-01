import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ToasterService } from 'angular2-toaster';
import { Router } from '@angular/router';
import { AccountService } from '../auth/account.service';
import { Constants } from '../../../config/constant';
import { LocalStorage } from '../../commons/services/localStorage.service';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'tm-login',
  templateUrl: './login.component.html',
  styleUrls: ['../account.component.scss'],
  providers: [AccountService],
})

export class LoginComponent implements OnInit {
  hide = true;             // used for password show hide
  spiner: boolean;          // login button spiner
  results: any[] | any;      // response data
  errMessage: any;              // used for catching response message
  dataNotFound = false;
  savedTakedaUser: any;
  submitted: Boolean;
  public loginForm: FormGroup;
  roleListData = [];
  tempRoleListData = [];
  selectedRole = null;
  constants = Constants;
  /*
  **form input data
  */
  emailId: string;
  password: string;

  isChecked = false;
  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  passwordPattern = '^[a-zA-Z0-9]{8,16}$';
  constructor(private accountService: AccountService,
    private router: Router,
    @Inject(FormBuilder) fb: FormBuilder,
    private toasterService: ToasterService) {
    if (LocalStorage.get('takedaUser')) {
      this.savedTakedaUser = LocalStorage.get('takedaUser');
      this.emailId = this.savedTakedaUser.emailId;
      this.password = this.savedTakedaUser.password;
      this.isChecked = true;
    }
    this.loginForm = fb.group({
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      isChecked: ['']
    });
  }

  ngOnInit() {

    this.roleList();
    if (LocalStorage.hasOwnProperty('takedaUser')) {
      const user = LocalStorage.get('takedaUser');
      this.loginForm['controls'].emailId.setValue(user.emailId);
      this.loginForm['controls'].password.setValue(user.password);
      this.loginForm['controls'].isChecked.setValue(user.isChecked);
      this.loginForm['controls'].role.setValue(user.role);
      this.selectedRole = user.role;
      // this.loginForm['controls'].role.setValue(user.role);
    }
    const role = LocalStorage.get('role');
    if (this.accountService.getUserLoggedIn() && role) {
      this.setUserAndRedirect(role);
    }
  }

  roleList() {
    this.accountService.getRoleList().subscribe((res) => {
      this.roleListData = res.data;
      // console.log('Role List', this.roleListData);
      this.roleListData.forEach(role => {
        if ((role._id !== this.constants.subjectId) &&  (role._id !== this.constants.irbId) ){
          this.tempRoleListData.push(role);
        }
        console.log(role);
        
        if ((role._id === this.constants.sitesId)){
          role.roleName = 'Site Coordinator';
        }
      });
    }, (err) => {
      this.errMessage = JSON.parse(err._body).message;
    });


    // console.log(this.roleListData);

  }


  /*
  **used for login
  */
  login() {
    this.spiner = true;
    this.errMessage = '';
    this.submitted = true;
    if (this.loginForm.valid) {
      this.spiner = true;
      const userObj = {
        emailId: this.loginForm['controls'].emailId.value,
        password: this.loginForm['controls'].password.value,
        role: this.loginForm['controls'].role.value
      };
      this.accountService.login(userObj).subscribe((data) => {
        if (this.loginForm['controls'].isChecked.value) {
          this.rememberMe();
        } else {
          LocalStorage.clear();
        }
        if (data.status === 'success') {
          this.spiner = false;
          this.accountService.setUserLoggedIn();
          LocalStorage.set('access_token', data['access-token']);
          let token = data['access-token'];
          token = token.replace('Bearer~', '');
          token = jwt_decode(token);
          // console.log("token", token);
          
          LocalStorage.set('nickName', token.nickName);
          if(token.roleName){
            token.roleName = token.roleName.replace(/([A-Z])/g, ' $1').trim();
            LocalStorage.set('userRole', token.roleName); 
          }
                 
          LocalStorage.set('isUserLoggedIn', 'true');
          const currentUser = LocalStorage.set('currentUser', token.email);
          this.setUserAndRedirect(userObj.role);
        } else {
          this.spiner = false;
          this.errMessage = data.message;
        }

      },
        (err) => {
          this.errMessage = JSON.parse(err._body).message;
          this.toasterService.pop('error', this.errMessage);
          this.spiner = false;
        });
    } else {
      this.spiner = false;
    }
  }

  /*
  **saving login details in LocalStorage
  */
  rememberMe() {
    const user = {
      emailId: this.loginForm['controls'].emailId.value,
      password: this.loginForm['controls'].password.value,
      role: this.loginForm['controls'].role.value,
      isChecked: this.loginForm['controls'].isChecked.value
    };
    LocalStorage.set('takedaUser', user);

  }

  setUserAndRedirect(role) {
    LocalStorage.set('role', role);
      LocalStorage.set('sectionName', 'dashboard');
      this.router.navigate([`dashboard/dashboard?=${role}`]);
      // if (role === this.constants.superAdminId) {
      //   LocalStorage.set('sectionName', 'userManagement');
      //   this.router.navigate([`userManagement/admin?=${role}`]);
      // } else {
      //   LocalStorage.set('sectionName', 'contentManagement');
      //   this.router.navigate([`contentManagement/allDocs?=${role}`]);
      // }
  }

}
