import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSelect } from '@angular/material';
import { LoaderService } from '../../../../commons/services/loader.service';
import { MachineLearningService } from '../../machine-learning-service.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'tm-select-language-dialog',
  templateUrl: './select-language-dialog.component.html',
  styleUrls: ['./select-language-dialog.component.css']
})
export class SelectLanguageDialogComponent implements OnInit {

  language = new FormControl('Spanish');
  languageList: string[] = ['Spanish'];

  formData: FormData;
  @Input() fileExt = 'docx';
  @Input() studyNumber : string;
  public checked: boolean;
  statusMessage: string;
  public form: FormGroup;
  public files: any = [];
  public submitted: Boolean = false;
  public isImageDragged: Boolean = false;
  public dragAreaClass;
  @ViewChild(MatSelect) languageDdn: MatSelect;

  constructor(
    public dialog: MatDialog,
    private mlService: MachineLearningService,
    private loaderService: LoaderService,
    public dialogRef: MatDialogRef<SelectLanguageDialogComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      docType: ['', Validators.required],
      docLanguage: ['', Validators.required],
      studyNumber: ['', Validators.required],
    });
  } // constructor end

  togglelanguageDdn() {
    console.log('select langulage');

    this.languageDdn.toggle();

    const cdkpane = <HTMLElement>document.querySelector('.cdk-overlay-pane');
    if (cdkpane) {
      cdkpane.classList.add('cdkOverlayMypane');
      const cdkOverlayMypane = <HTMLElement>document.querySelector('.cdkOverlayMypane');
      const x = cdkOverlayMypane.style.top;
      const a: any = x.split('p');
      const currTop = Number(a[0]) + 91;
      console.log(currTop);
      cdkOverlayMypane.style.top = currTop + 'px';
    }
  }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close('Yes');
  }

  onSelect() {
    this.checked = true;
  }

  onFileChange(event) {
    this.formData = new FormData();
    if (this.isValidFileExtension(event.target.files)) {
      console.log(event);
      this.files.push(event.target.files);
      this.formData.append('protocol_document', event.target.files[0]);
      this.formData.append('doctype', this.form['controls'].docType.value);
      this.formData.append('language', (this.form['controls'].docLanguage.value)[0]);
      this.formData.append('study_number', this.form['controls'].studyNumber.value);
      console.log(this.form.value);
      // this.formData.append('language');
    }
  }
  onDragOver(event) {
    this.isImageDragged = true;
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  cancelUpload() {
    this.files.pop();
    // this.fileErrors = '';
  }
  // @HostListener('drop', ['$event'])
  onDrop(event) {
    this.dragAreaClass = 'dragarea';
    this.isImageDragged = false;
    event.preventDefault();
    event.stopPropagation();
    this.onFileChange(event);
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
        alert('Please Select a docx File');
        return false;
      } else {
        return true;
      }
    }
  }

  convertDoc(): void {
    this.submitted = true;
    if (this.validateForm()) {
      this.loaderService.display(true);
      this.mlService.uploadDocument(this.formData).subscribe((data) => {
        this.dialogRef.close();
        console.log(data);
        this.loaderService.display(false);
        console.log('success upload');
        const dialogRef3 = this.dialog.open(SuccessDialogComponent, {
          data: {}
        });
        this.statusMessage = 'success upload';
      },
        (err) => {
          console.log('Error found as:' + err);
          this.statusMessage = 'err';
        });
    }
  }

  validateForm() {
    if (this.files.length) {
      console.log(this.form);
      if (this.form.controls['docType'].value === 'Convert ICF' && this.form.controls['docLanguage'].valid) {
        return true;
      } else if (this.form.controls['docType'].value === 'Protocol Document') {
        return true;
      } else {
        return false;
      }
    }
  }

  adjestDropdown() {
    //alert("ok");
    let langSelector  = document.querySelector('#langSelector').getBoundingClientRect();
    let element: any  = document.querySelector('.mat-select-panel').parentNode;
    element.style.removeProperty('top');
    element.style.setProperty('top', langSelector.bottom +10+'px', 'important');
    element.style.left = langSelector.left +'px';
    (<HTMLElement>document.querySelector('.mat-select-panel')).style['margin-left'] = "0px";
  }
}
