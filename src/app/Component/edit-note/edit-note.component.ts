import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

 notes:any;
  fromPage: any;
  fromDialog: any;
  title: string;
  description: string;

  constructor(public dialogRef: MatDialogRef<EditNoteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.fromPage = data.pageValue;
      console.log(this.fromPage)
      if(this.fromPage.title!=null){
        this.title=this.fromPage.title;
      }
      else if(this.fromPage.description!=null){
        this.description=this.fromPage.description;
      }
    }

  
    apiCallUpdateNote(){
      debugger
      if(this.title!=null){
        this.notes['title'].setValue=this.title;
      }

      if(this.description!=null){
        this.notes['description'].setValue=this.description;
      }

      console.log(this.description)
    }

  ngOnInit(): void {
  }

} 
