import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MachineLearningService } from '../../../machine-learning/machine-learning-service.service';
//import 'rxjs/Rx'
import {Http} from '@angular/http'
@Component({
  selector: 'tm-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css']
})
export class DownloadDialogComponent implements OnInit {
  public fileDate;
  public chosenItem = "English";
  constructor(
    public dialogRef: MatDialogRef<DownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private mlService: MachineLearningService) {
      this.fileDate = data;
    }

  ngOnInit() {

  }
  closeDialog() {
    this.dialogRef.close('Yes');
  }

  startDownload(){
    console.log(this.chosenItem);
    //let index = this.data.index;
    //let an = (<HTMLElement>document.querySelector('#downloader'));
    this.changeLag(this.chosenItem);
    // an.href = "http://takedadsvm.eastus2.cloudapp.azure.com:8042"+this.chosenItem;
    if (this.chosenItem && this.chosenItem != "/media/None") window.location.href = "http://takedadsvm.eastus2.cloudapp.azure.com:8042"+this.chosenItem;
    //let doc = this.data.docData.icf_english || this.data.docData.icf_spanish;
    // this.mlService.downloadFile(doc).subscribe((data) => {
    //   console.log("Download Started! "+ doc);
    // },
    //   (err) => {
    //     console.log(err);
    //   });
    this.closeDialog();
  }

  changeLag(language){
    if(language == 'English'){
      this.chosenItem = this.data.docData.icf_english;
    }else{
      this.chosenItem = this.data.docData.icf_spanish;
    }
  }
}
