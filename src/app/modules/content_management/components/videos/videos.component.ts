import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { AddVideoDialogComponent } from '../../../../commons/dialogs/add-video-dialog/add-video-dialog.component';
import { LoaderService } from '../../../../commons/services/loader.service';
import { VideoSanitizerPipe } from '../../../../commons/pipes/video-sanitizer.pipe';
import { ContentManagementService } from '../../content-management.service';
import { ToasterService } from 'angular2-toaster';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalStorage } from '../../../../commons/services/localStorage.service';
import * as _ from 'lodash';
@Component({
  selector: 'tm-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  public searchFilter: any;
  public videoList: any;
  public filteredData: any;
  constructor(public dialog: MatDialog,
    private loaderService: LoaderService,
    private contentManagementService: ContentManagementService,
    private toaterService: ToasterService,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    // const thisPage = <HTMLElement>document.querySelector('.videosContainer');
    // thisPage.style.minHeight = '850px';

    this.loaderService.display(true);
    this.contentManagementService.getVideoList().subscribe((data) => {
      console.log(data);
      this.loaderService.display(false);
      this.videoList = Object.assign([], data.data);
      this.filteredData = Object.assign([],this.videoList);
      // console.log(this.videoList);


    },
      (err) => {
        console.log(err);
      });
  }

  addVideo(): void {
    const dialogRef = this.dialog.open(AddVideoDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const dataObj = {
          videoName: result.videoTitle,
          videoUrl: result.videoLink,
          trialId: LocalStorage.get("trialName")
        };
        this.loaderService.display(true);
        this.contentManagementService.addVideo(dataObj).subscribe((data) => {
          this.loaderService.display(false);
          this.ngOnInit();
          this.toaterService.pop('success', 'Video Added Successfully', '');
        },
          (error) => {
            console.log(error);
            this.loaderService.display(false);
            error = JSON.parse(error._body);
            this.toaterService.pop('error', error.message, '');
          });
      } else {
        console.log('no data');
      }
    });

  }

  searchData() {
    const query = this.searchFilter;
    if (query) {
      this.videoList = _.filter(this.filteredData, row => {
        return (row['videoName'].search(new RegExp(query, 'i')) !== -1)
      });
      // this.setPage(1);
      return;
    } else {
      this.videoList = this.filteredData;
      // this.setPage(1);
      return;
    }
  }
}
