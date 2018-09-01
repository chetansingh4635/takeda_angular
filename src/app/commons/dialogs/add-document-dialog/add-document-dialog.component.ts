import { Component, OnInit, Inject, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddDocumentDialogService } from './add-document-dialog.service';
import { LoaderService } from '../../../commons/services/loader.service';
import { AppConfig } from '../../../../config/appConfig';
import { ToasterService } from 'angular2-toaster';
import { CKEditorComponent } from 'ngx-ckeditor';
import { CKEditorModule } from 'ngx-ckeditor';
import { LocalStorage } from '../../services/localStorage.service';
@Component({
  selector: 'tm-add-document-dialog',
  templateUrl: './add-document-dialog.component.html',
  styleUrls: ['./add-document-dialog.component.css'],
})

export class AddDocumentDialogComponent implements OnInit {
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
  public editorValue: any;
public editorConfig = {

};
public   ckEditorComponent :CKEditorComponent;
  // public formSponsor:FormGroup;
  constructor(public addDocumentDialog: AddDocumentDialogService,
    public dialogRef: MatDialogRef<AddDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public loaderService: LoaderService,
    public toasterService: ToasterService,
 ) {
  }

  ngOnInit() {
    // CROLIST Data
    console.log(this.ckEditorComponent, CKEditorModule);
    
    
    this.form = this.fb.group({
      documentName: ['', Validators.required],
      version: ['', Validators.required],
      documentType: ['', Validators.required],
      croName: [''],
      croId: [''],
      irbId: ['', [Validators.required]],
      siteId: ['', [Validators.required]],
      siteName: ['', [Validators.required]],
      secondDocumentName: ['', [Validators.required]],
      file: ['', [Validators.required]],
      secondfile: ['', [Validators.required]],
      fileOff: ['', [Validators.required]],
      fileExp: ['', [Validators.required]],
      language: ['', [Validators.required]]
    });
    // Language List
    this.addDocumentDialog.getlanguagesList().subscribe((data) => {
      this.languages = data.data;
    },
      err => {
        console.log(err);
      }
    );
    // CRO List
    this.addDocumentDialog.getCROList().subscribe((data) => {
      this.croList = data.data;
    },
      err => {
        console.log(err);
      }
    );
    // SITESLIST Data
    this.addDocumentDialog.getSITESList().subscribe((data) => {
      this.sitesList = data.data;
    },
      err => {
        console.log(err);
      }
    );
    // IRBLIST Data
    this.addDocumentDialog.getIRBList().subscribe((data) => {
      this.irbList = data.data;
    },
      err => {
        console.log(err);
      }
    );
    this.addDocumentDialog.getDocumentslList().subscribe((data) => {
      this.docLists = data.data;
    },
      err => {
        console.log(err);
      }
    );
    this.form.controls['documentType'].setValue('Site Specific');

    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveDocument(type): void {
    if (type === 'addMoreDocument') {
      this.addMoreDocuments = true;
    }
    this.submitted = true;
    // this.documentData = [];
    switch (this.form['controls'].documentType.value) {
      case 'Global': {
        if (this.form['controls'].documentName.value === AppConfig.icfOfficialId ||
          this.form['controls'].documentName.value === AppConfig.icfExplanatoryId) {
          if (this.validateForm('ICF', 'Global')) {
            this.makeObject();
            if (type === 'submit') {
              this.appendAndSubmit();
            } else {
              this.formReset();
              this.submitted = false;
            }
          } else {
            return;
          }
        } else {
          if (this.validateForm('Other', 'Global')) {
            this.makeObject();
            if (type === 'submit') {
              this.appendAndSubmit();
            } else {
              this.formReset();
              this.submitted = false;
            }
          } else {
            return;
          }
        }
        break;
      }
      case 'Site Specific': {
        if (this.validateForm('Any', 'Site Specific')) {
          this.makeObject();
          if (type === 'submit') {
            this.appendAndSubmit();
          } else {
            this.formReset();
            this.submitted = false;
          }
        } else {
          return;
        }
        break;
      }
    }
  }

  public appendAndSubmit() {
    this.loaderService.display(true);
    this.formData.append('documentData', JSON.stringify(this.documentData));
    for (let i = 0; i < this.fileLists.length; i++) {
      this.formData.append('file', this.fileLists[i].file);
    }
    this.dialogRef.close(this.formData);
  }
  public validateForm(docName, type) {
    if (this.files.length && this.form['controls'].documentName.valid && (this.form['controls'].documentType.valid ||
      this.form['controls'].documentType.disabled) && this.form['controls'].version.valid && !this.versionError &&
      this.form['controls'].language.valid) {
      if (type === 'Global' && docName === 'ICF' && this.files.length > 1 && this.checkAutoComplete('irbId')) {
        return true;
      } else if (type === 'Global' && docName === 'Other' && this.checkAutoComplete('irbId')) {
        return true;
      } else if (type === 'Site Specific' && this.checkAutoComplete('all')) {
        return true;
      } else {
        return false;
      }
    } else {
      this.error = 'Invalid Form';
      return false;
    }
  }

  public checkAutoComplete(type) {
    switch (type) {
      case 'irbId': {
        const irbIndex = this.irbList.findIndex(row => row[type] === this.form.controls[type].value);
        if (irbIndex > -1) {
          return true;
        } else {
          this.form.controls[type].setValue(undefined);
          return false;
        }
      }
      case 'all': {
        const irbIndex = this.irbList.findIndex(row => row['irbId'] === this.form.controls['irbId'].value);
        const siteIdIndex = this.sitesList.findIndex(row => row['siteId'] === this.form.controls['siteId'].value);
        const siteNameIndex = this.sitesList.findIndex(row => row['siteName'] === this.form.controls['siteName'].value);
        const croIdIndex = this.croList.findIndex(row => row['orgId'] === this.form.controls['croId'].value);
        const croNameIndex = this.croList.findIndex(row => row['orgName'] === this.form.controls['croName'].value);
        if (irbIndex === -1) {
          this.form.controls['irbId'].setValue(undefined);
        } if (siteIdIndex === -1) {
          this.form.controls['siteId'].setValue(undefined);
        } if (siteNameIndex === -1) {
          this.form.controls['siteName'].setValue(undefined);
        } if (croIdIndex === -1) {
          this.form.controls['croId'].setValue(undefined);
        } if (croNameIndex === -1) {
          this.form.controls['croName'].setValue(undefined);
        }
        if (siteIdIndex !== -1 && siteNameIndex !== -1 && croIdIndex !== -1 && croNameIndex !== -1 && irbIndex !== -1) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  public makeObject() {
    this.files.forEach((row) => {
      const data = {
        docNameId: row['docId'],
        docName: row['docName'],
        docType: this.form['controls'].documentType.value,
        docVersion: this.form['controls'].version.value.toFixed(1),
        irbId: this.form['controls'].irbId.value,
        fileName: row['file'].name,
        language: this.form['controls'].language.value,
        trialId : LocalStorage.get("trialName")
      };
      if (this.form['controls'].documentType.value === 'Site Specific') {
        data['siteId'] = this.form['controls'].siteId.value;
        data['siteName'] = this.form['controls'].siteName.value;
        data['croName'] = this.form['controls'].croName.value;
        data['croId'] = this.form['controls'].croId.value;
      }
      // console.log(data);

      this.versions.push(data.docVersion);
      this.documentData.push(data);
    });

    this.fileLists = this.fileLists ? this.fileLists.concat(this.files) : this.files;
    // console.log(this.fileLists, this.files);
    this.files = [];
    this.docNames = [];
  }

  public formReset(): void {
    this.ngOnInit();
  }

  onFileChange1(event, index) {
    this.fileErrors = undefined;
    if ((this.form['controls'].documentName.value === AppConfig.invitaionLetterId || this.form['controls'].documentName.value ===
      AppConfig.studyDescriptionId || this.form['controls'].documentName.value === AppConfig.faqsId) &&
      this.isValidFiles(event.target.files ? event.target.files : event.dataTransfer.files)) {
      this.files = [];
      const data = {
        docName: this.docNames[index]['docName'],
        file: event.target.files ? event.target.files[0] : event.dataTransfer.files[0],
        docId: this.docNames[index]['docId']
      };
      const fileIndex = this.files.findIndex(row => row['docName'] === this.docNames[index]['docName']);
      if (fileIndex > -1) {
        this.files.splice(fileIndex, 1);
      }
      this.files.splice(index, 0, data);
    } else {
      if (this.files.length < 2 && this.isValidFiles(event.target.files ? event.target.files : event.dataTransfer.files)) {
        const data = {
          docName: this.docNames[index]['docName'],
          file: event.target.files ? event.target.files[0] : event.dataTransfer.files[0],
          docId: this.docNames[index]['docId']
        };
        const fileIndex = this.files.findIndex(row => row['docName'] === this.docNames[index]['docName']);
        if (fileIndex > -1) {
          this.files.splice(fileIndex, 1);
        }
        this.files.splice(index, 0, data);
      } else {
        if (this.files.length > 2) {
          this.fileErrors = 'You have Already uploaded two Documents';
        }
      }
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
  onDrop(event, index) {
    this.dragAreaClass = 'dragarea';
    this.isImageDragged = false;
    event.preventDefault();
    event.stopPropagation();
    if (this.docNames) {
      this.onFileChange1(event, index);
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

  secondDoc(event) {
    this.docNames = [];
    this.files = [];
    this.fileErrors = undefined;
    this.form['controls'].file.reset();
    this.form.controls['secondDocumentName'].setValue('');
    this.form.controls['documentType'].enable();
    if (this.form.controls['documentName'].value === AppConfig.icfOfficialId) {
      this.form.controls['secondDocumentName'].setValue(AppConfig.icfExplanatoryId);
      // this.docNames = [AppConfig[this.form.controls['documentName'].value], AppConfig[this.form.controls['secondDocumentName'].value]];
    } else if (this.form.controls['documentName'].value === AppConfig.icfExplanatoryId) {
      this.form.controls['secondDocumentName'].setValue(AppConfig.icfOfficialId);
    } else {
      this.form.controls['documentType'].setValue('Global');
      this.form.controls['documentType'].disable();
    }
    this.mapDocNames(this.form.controls['documentName'].value, this.form.controls['secondDocumentName'].value);
    // console.log(this.form.controls['secondDocumentName'].value);
  }

  mapDocNames(doc1, doc2) {
    const indexOfDoc1 = this.docLists.findIndex(x => x['_id'] === doc1);
    const indexOfDoc2 = this.docLists.findIndex(x => x['_id'] === doc2);
    if (indexOfDoc1 > -1) {
      this.docNames.push({
        docName: this.docLists[indexOfDoc1].docName,
        docId: doc1
      });
    }
    if (indexOfDoc2 > -1) {
      this.docNames.push({
        docName: this.docLists[indexOfDoc2].docName,
        docId: doc2
      });
    }
    // this.docLists.forEach((row) => {
    //   if (row['_id'] === doc1 || row['_id'] === doc2) {
    //     this.docNames.push(row.docName);
    //   }
    // });
  }
  cancelUpload(index) {
    this.files.splice(index, 1);
    this.fileErrors = '';
  }

  croIdAndNameChanged(value, type) {
    if (type === 'id') {
      this.croList.forEach((row) => {
        if (row.orgId === value) {
          this.form.controls['croName'].setValue(row.orgName);
        }
      });
    } else {
      this.croList.forEach((row) => {
        if (row.orgName === value) {
          this.form.controls['croId'].setValue(row.orgId);
        }
      });
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

  checkVersion(type) {
    this.fileErrors = undefined;
    const docVersion = this.form.controls['version'].value ? this.form.controls['version'].value.toFixed(1) : undefined;
    let siteId = this.form.controls['siteId'].value;
    const lang = this.form['controls'].language.value;
    const docName = this.form.controls['documentName'].value ? this.form.controls['documentName'].value : undefined;
    if (this.form.controls['documentType'].value === 'Global') {
      this.form['controls'].siteId.setValue(undefined);
      siteId = undefined;
    }
    if (docVersion && docName && lang && (this.form.controls['documentType'].value === 'Global' || siteId)) {
      this.loaderService.display(true);
      this.addDocumentDialog.checkVersion(docName, docVersion, siteId, lang).subscribe((data) => {
        this.loaderService.display(false);
        // console.log(this.versions.indexOf(docVersion));
        let isError = false;
        for (let i = 0; i < this.documentData.length; i++) {
          const row = this.documentData[i];
          if (row.docNameId === this.form.controls['documentName'].value &&
            row.siteId && row.siteId === this.form.controls['siteId'].value && row.language === this.form['controls'].language.value) {
            if (parseFloat(row.docVersion) === parseFloat(docVersion)) {
              this.versionError = '*Version Already Exist';
              isError = true;
              break;
            } else if (parseFloat(row.docVersion) > parseFloat(docVersion)) {
              this.versionError = '*Please select higher version';
              isError = true;
              break;
            }
          } else if (row.docNameId === this.form.controls['documentName'].value && this.form.controls['documentType'].value === 'Global' &&
            row.language === this.form['controls'].language.value) {
            if (parseFloat(row.docVersion) === parseFloat(docVersion)) {
              this.versionError = '*Version Already Exist';
              isError = true;
              break;
            } else if (parseFloat(row.docVersion) > parseFloat(docVersion)) {
              this.versionError = '*Please select higher version';
              isError = true;
              break;
            }
          } else {
            this.versionError = undefined;
          }
        }
        if (!this.documentData.length || !isError) {
          this.versionError = undefined;
          this.saveDocument(type);
        }
        // if (this.versions.indexOf(docVersion) > -1) {
        //   this.versionError = '*Version Already Exist';
        // } else {
        //   this.versionError = undefined;
        // }
      },
        err => {
          // this.saveDocument(type);
          this.loaderService.display(false);
          err = err._body ? JSON.parse(err._body) : {};
          this.versionError = '*' + err.message;
          // this.toasterService.pop('error', err.message, '');
        }
      );
    } else {
      this.saveDocument(type);
    }
  }
  // public docTypeChanged(docType) {
  //   if (docType === 'Global') {
  //     this.form['controls'].siteId.setValue(undefined);
  //   }
  // }

}
