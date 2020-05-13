import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  fromPage: any;
  fromDialog: any;
  @Input() title:any;
  @Input() description:any;
 

  constructor(public dialogRef: MatDialogRef<EditNoteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.fromPage = data.pageValue;
      console.log(this.fromPage)
    }

  
    apiCallUpdateNote(){
      if(this.title!=null){
        this.fromPage.title=this.title;
      }
      if(this.description!=null){
        this.fromPage.description=this.description;
      }
      
      this.dialogRef.close({ name: 'updateNote', data: this.fromPage });
    }

  ngOnInit(): void {
  }

} 
