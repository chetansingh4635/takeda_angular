import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../auth/account.service';
import { ToasterService } from 'angular2-toaster';
import { LocalStorage } from '../../commons/services/localStorage.service';

@Component({
  selector: 'tm-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['../account.component.scss'],
  providers: [AccountService],
})
export class SetpasswordComponent implements OnInit {
  spiner: boolean;        // submit button spiner
  results: any[] | any;    // response data
  errMessage: any;            // used for catching response message
  emailId: string;         // form input data
  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public form: FormGroup;
  public submitted = false;
  constructor(private accountService: AccountService,
    private router: Router,
    private toasterService: ToasterService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });


  }

  setPassword() {
   this.submitted = true;
    this.errMessage = '';
    if (this.form.valid) {
      this.spiner = true;
      this.submitted = false;
      if(this.form['controls'].password.value === this.form['controls'].confirmPassword.value ){
      this.accountService.setPassword(this.form.value).subscribe((data) => {
        console.log(data);
        this.spiner = false;
        this.toasterService.pop('success', data.message);
        this.router.navigate(['login']);
      },
        (err) => {
          this.spiner = false;
          console.log(err);
        })
      } else {
        this.toasterService.pop('error', 'Passwords Do not match');
      }
    }
    // if (!this.form.valid) {
    //   this.errMessage = 'Please Enter Email ID';
    //   this.spiner = false;
    // } else {
    //   this.accountService.forgotPassword({ "emailId": this.emailId }).subscribe((data) => {
    //     console.log(data);
    //     this.spiner = false;
    //     // this.toasterService.pop('success', data.message)
    //   },
    //     (err) => {
    //       console.log(err);

    //     })
    //   // //  console.log(this.accountService.requestPassword(this.emailId));
    // }
  }

  ngOnInit() {
    // console.log( this.route.queryParams.value.key);
    this.route.queryParams.subscribe((value) => {
      console.log(value.key);
      if (!value.key) {
        this.router.navigate(['login']);
      }
      LocalStorage.set('access_token', value.key);
    });

  }

}
