import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppConfig } from '../../../../config/appConfig';
@Component({
  selector: 'tm-add-site-coordinator',
  templateUrl: './add-site-coordinator.component.html',
  styleUrls: ['./add-site-coordinator.component.css']
})
export class AddSiteCoordinatorComponent implements OnInit {
  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  namePattern = '^[a-zA-Z ]{3,20}$';
  public form: FormGroup;
  siteCoordinators: any = [];
  public Object: Object;
  public submitted: Boolean = false;
  // public formSponsor:FormGroup;
  constructor(public dialogRef: MatDialogRef<AddSiteCoordinatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder) {
    this.form = this.fb.group({
      siteLocation: [''],
      siteId: [''],
      croPIName: [''],
      irbName: [''],
      siteCoordinator: this.fb.array([])
    });
  }

  ngOnInit() {
    // CROLIST Data

    this.form.controls.siteLocation.setValue(this.data.details.siteLocation);
    this.form.controls.siteId.setValue(this.data.details.siteId);
    this.form.controls.croPIName.setValue(this.data.details.croPIName);
    this.form.controls.irbName.setValue(this.data.details.irbName);
    this.form.controls.siteLocation.disable();
    this.form.controls.siteId.disable();
    this.form.controls.croPIName.disable();
    this.form.controls.irbName.disable();
    console.log(this.form);

    this.appendSiteCoordinator();

  }

  public addSiteCoordinator(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required]],
    })
  }
  public appendSiteCoordinator() {
    if (this.siteCoordinators.length) {
      this.submitted = true;
      if (this.form.valid) {
        this.submitted = false;
        this.siteCoordinators = this.form.get('siteCoordinator') as FormArray;
        this.siteCoordinators.push(this.addSiteCoordinator());
      }
    } else {
      this.siteCoordinators = this.form.get('siteCoordinator') as FormArray;
      this.siteCoordinators.push(this.addSiteCoordinator());
    }

  }

  saveSiteCoordinators() {
    this.submitted = true;
    if (this.form.valid) {
      this.dialogRef.close(this.form.controls.siteCoordinator.value);
    }
    console.log(this.form);

  }

  closeDialog(): void {
    this.dialogRef.close();
  }



}
