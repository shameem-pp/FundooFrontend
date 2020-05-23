import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/Service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  selectedFile: File;

  constructor(private service:UserService,public dialogRef: MatDialogRef<ProfilePictureComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: any,private spinner: NgxSpinnerService,private snackBar: MatSnackBar) { 
    }


  ngOnInit(): void {
  }
  onFileSelected(event){
    this.selectedFile=event.target.files[0];
    console.log(this.selectedFile)
  }

  uploadImage(){
    this.startSpinner();
    const formData = new FormData();
    formData.append('file',this.selectedFile)

    this.service.uploadProfilePic("api/Account/UploadImage/"+localStorage.getItem('email'),formData).subscribe
    (
      response=>{
        this.stopSpinner();
        this.openSnackBar("Image Uploaded Successfully","Dismiss");
        this.dialogRef.close();
        localStorage.setItem('profilePic',response['profilePic'].toString());
        this.selectedFile=null;
      },
      err=>{
        this.stopSpinner();
        this.openSnackBar("Failed","Dismiss");
      }
    )
  }
  startSpinner(){
    this.spinner.show();
  }
  
  stopSpinner(){
    this.spinner.hide();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
