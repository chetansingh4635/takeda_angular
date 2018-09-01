import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tm-add-video-dialog',
  templateUrl: './add-video-dialog.component.html',
  styleUrls: ['./add-video-dialog.component.css']
})
export class AddVideoDialogComponent implements OnInit {
  public form: FormGroup;
  public submitted: Boolean;
  public validUrl: Boolean = false;
  pattern = '/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/';
  constructor(
    public dialogRef: MatDialogRef<AddVideoDialogComponent>,
    public fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      videoLink: ['', Validators.required],
      videoTitle: ['', Validators.required],
    });
  }
   matchYoutubeUrl(url) {
    var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    var matches = url.match(p);
    if(matches){
        return matches[1];
    }
    return false;
}
check(url){
  var id = this.matchYoutubeUrl(url);
  if(id!=false){
      // alert(id);
      this.validUrl = true;
  }else{
    this.validUrl = false;
      // alert('Incorrect URL');
  }
}
  closeDialog(): void {
    this.dialogRef.close();
  }
  addVideo() {
    let videoUrl = this.form['controls'].videoLink.value;
    videoUrl = videoUrl.replace('watch?v=', 'embed/');
    this.form['controls'].videoLink.setValue(videoUrl);
    this.submitted = true;
    // console.log(this.form.valid );
    
    if (this.form.valid ) {
      this.dialogRef.close(this.form.value);
    } else {
      console.log('invalid form');
    }
  }
}
