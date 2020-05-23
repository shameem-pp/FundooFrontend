import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  selectedFile: File;

  constructor(private service:UserService,public dialogRef: MatDialogRef<ProfilePictureComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: any) { 
    }


  ngOnInit(): void {
  }
  onFileSelected(event){
    this.selectedFile=event.target.files[0];
    console.log(this.selectedFile)
  }

  uploadImage(){
    const formData = new FormData();
    formData.append('file',this.selectedFile)

    this.service.uploadProfilePic("api/Account/UploadImage/"+localStorage.getItem('email'),formData).subscribe
    (
      response=>{
        localStorage.setItem('profilePic',response.toString());
        this.selectedFile=null;
      }
    )
  }
}
