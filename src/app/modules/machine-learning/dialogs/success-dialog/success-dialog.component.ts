import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GenerateInformedConsentFormComponent } from '../../components/generate-informed-consent-form/generate-informed-consent-form.component'
@Component({
  selector: 'tm-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css'],
  providers : [GenerateInformedConsentFormComponent]
})
export class SuccessDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, @Inject(GenerateInformedConsentFormComponent) public dat: any) {

    }

  ngOnInit() {

  }
  closeDialog() {
    let loader = this.dat;
    loader.uploadget();
    this.dialogRef.close('Yes');
    setTimeout(function(){
      window.location.reload();
    },200);
  }
}
