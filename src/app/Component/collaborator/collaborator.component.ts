import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/Service/note.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  email:string=localStorage.getItem('email');
  profilePic:string=localStorage.getItem('profilePic');
  name:string=localStorage.getItem('name');
  collaboratorEmail=new FormControl('')
  fromPage: any;
  constructor(private service:NoteService,public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.fromPage = data.pageValue;
     }

  ngOnInit(): void {
  }

  addCollaborator(){
    let data={
      senderEmail:this.email,
      recieverEmail:this.collaboratorEmail.value,
      noteId:this.fromPage
    }
    console.log(this.fromPage)
    this.service.addCollaborator(data,'api/Collaborator/AddCollaborator').subscribe
    (
      res=>{
        this.dialogRef.close();
      }
    );
  }

}
