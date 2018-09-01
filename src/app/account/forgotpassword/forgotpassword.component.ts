import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../auth/account.service';
import { ToasterService } from 'angular2-toaster';
@Component({
  selector: 'tm-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['../account.component.scss'],
  providers: [AccountService],
})

export class ForgotpasswordComponent implements OnInit {

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
    private fb: FormBuilder) {
    this.form = this.fb.group({
      emailId: ['', Validators.required]
    });
  }

  requestPassword() {
    this.submitted = true;
    this.errMessage = '';
    if (this.form.valid) {
      this.spiner = true;
      this.submitted = true;
      this.accountService.forgotPassword(this.form.value).subscribe((data) => {
        console.log(data);
        this.spiner = false;
        this.toasterService.pop('success', data.message);
        this.router.navigate(['login']);
      },
        (err) => {
          console.log(err);

        })
      // //  console.log(this.accountService.requestPassword(this.emailId));
    }
  }

  ngOnInit() {
  }

}
