import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AddDocumentDialogService } from './add-document-dialog.service';
import { LoaderService } from '../../../commons/services/loader.service';
import { AppConfig } from '../../../../config/appConfig';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'tm-upload-wet-dialog',
  templateUrl: './upload-wet-dialog.component.html',
  styleUrls: ['./upload-wet-dialog.component.css']
})
export class UploadWetDialogComponent implements OnInit {
  pattern = '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
  public croList: any;
  public sitesList: any;
  public irbList: any;
  private results: any;
  private dataNotFound: boolean;
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
  constructor(public dialogRef: MatDialogRef<UploadWetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public loaderService: LoaderService,
    public toasterService: ToasterService) { }

    ngOnInit() {
      this.form = this.fb.group({
        file: ['', [Validators.required]],
      });
    }
  
    uploadWet() {
      this.submitted = true;
      if (this.files.length ) {
        this.dialogRef.close(this.files);
      } else {
        console.log('invalid form');
      }
    }
    onFileChange1(event) {
      this.fileErrors = undefined;
      if (this.isValidFiles(event.target.files ? event.target.files : event.dataTransfer.files)) {
        this.files = [];
        const file = (event.target.files ? event.target.files[0] : event.dataTransfer.files[0]);
        this.files.splice(0, 0, file);
      }
      // console.log('on file change', this.files);
    }
    // @HostListener('dragover', ['$event'])
  onDragOver(event) {
    this.isImageDragged = true;
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  // @HostListener('drop', ['$event'])
  onDrop(event) {
    this.dragAreaClass = 'dragarea';
    this.isImageDragged = false;
    event.preventDefault();
    event.stopPropagation();
    if (this.docNames) {
      this.onFileChange1(event);
    }
  }
  private isValidFiles(files) {
    return this.isValidFileExtension(files);
  }
  private isValidFileExtension(files) {
    // Make array of file extensions
    const extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim(); });
    for (let i = 0; i < files.length; i++) {
      // Get file extension
      const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      const exists = extensions.includes(ext);
      if (!exists) {
        this.fileErrors = 'Please Select a Pdf File';
        return false;
      } else {
        return true;
      }
    }
  }
  cancelUpload(){
    this.files.pop();
  }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    closeDialog(): void {
      this.dialogRef.close();
    }
   
}
