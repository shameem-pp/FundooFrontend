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
    iconEvent(eventValue){
      switch(eventValue['name']){
        case "collaborator":
        break;
        case "trash":this.fromPage.trash=true;
        break;
        case "color":this.fromPage.color=eventValue.value.color;
        break;
        case "addImage":
        break;
        case "archive":this.fromPage.archeive=true;
        break;
        case "reminder":this.fromPage.remainder=eventValue.value;
        break;
        case "label":
        break;
      }
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
