import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AddDocumentDialogService } from './add-document-dialog.service';
import { LoaderService } from '../../../commons/services/loader.service';
import { AppConfig } from '../../../../config/appConfig';
import { ToasterService } from 'angular2-toaster';
import { AddSubjectService } from '../add-subject-dialog/add-subject.service';

@Component({
  selector: 'tm-assign-site-dialog',
  templateUrl: './assign-site-dialog.component.html',
  styleUrls: ['./assign-site-dialog.component.css']
})
export class AssignSiteDialogComponent implements OnInit {

  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public croList: any;
  public sitesList: any;
  public irbList: any;
  public form: FormGroup;
  public role: string;
  public submitted: Boolean;
  public formData: FormData = new FormData();
  public required = true;
  public radioName: any;
  public error: any;
  public files: any = [];
  public fileLists: any = [];
  public isImageDragged: Boolean;
  public versionError: string;
  public fileErrors: string;
  public docNames: any = [];
  public documentData = [];
  public addMoreDocuments: Boolean;
  public dragAreaClass = 'dragarea';
  public docLists: any = [];
  public AppConfig = AppConfig;
  public versions: any = [];
  public languages: any = [];
  @Input() projectId = 0;
  @Input() sectionId = 0;
  @Input() fileExt = 'PDF';
  @Input() maxFiles = 1;
  @Input() maxSize = 5; // 5MB
  @Output() uploadStatus = new EventEmitter();

  // public formSponsor:FormGroup;
  constructor(public addSubjectService: AddSubjectService,
    public dialogRef: MatDialogRef<AssignSiteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public loaderService: LoaderService,
    public toasterService: ToasterService) {
  }

  ngOnInit() {
    // CROLIST Data

 
      this.addSubjectService.getSITESList().subscribe((data) => {
        this.sitesList = data.data;
      },
        err => {
          console.log(err);
        }
      );
    if (this.data.type === 'ASSIGN') {
      this.form = this.fb.group({
        assign: [''],
        siteId: ['', [Validators.required]],
        siteName: ['', [Validators.required]],
      });
    }
    else if (this.data.type === 'QUALIFY') {
      this.form = this.fb.group({
        assign: ['', [Validators.required]],
        siteId: [''],
        siteName: [''],
      });
      this.form.controls['assign'].setValue('assignNow');
    }
 
  }

  addSubject() {
    this.submitted = true;
    if (this.data.type === 'QUALIFY' && this.form.controls['assign'].value === 'assignLater'){
      this.dialogRef.close({});
    }
    if (this.form.valid) {
      if (this.data.type === 'ASSIGN' && this.checkAutoComplete()) {
        this.dialogRef.close(this.form.value);
      } else  {
        this.dialogRef.close(this.form.value);
      }

    } else {
      console.log('invalid form');
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  public checkAutoComplete() {
    const siteIdIndex = this.sitesList.findIndex(row => row['siteId'] === this.form.controls['siteId'].value);
    const siteNameIndex = this.sitesList.findIndex(row => row['siteName'] === this.form.controls['siteName'].value);
    if (siteIdIndex === -1) {
      this.form.controls['siteId'].setValue(undefined);
    } if (siteNameIndex === -1) {
      this.form.controls['siteName'].setValue(undefined);
    }
    if (siteIdIndex !== -1 && siteNameIndex !== -1) {
      return true;
    } else {
      return false;
    }
  }

  siteIdAndNameChanged(value, type) {
    if (type === 'id') {
      this.sitesList.forEach((row) => {
        if (row.siteId === value) {
          this.form.controls['siteName'].setValue(row.siteName);
        }
      });
    } else {
      this.sitesList.forEach((row) => {
        if (row.siteName === value) {
          this.form.controls['siteId'].setValue(row.siteId);
        }
      });
    }
  }

  onChange(event){
    this.form.controls.siteId.setValue('');
    this.form.controls.siteId.markAsUntouched();
    this.form.controls.siteName.setValue('');
    this.form.controls.siteName.markAsUntouched();;
  }

}
