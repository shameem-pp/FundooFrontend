import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelService } from 'src/app/Service/label.service';
import { Label } from 'src/app/Models/label';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  listOfNotes: Object;
  labels:Object; 
  data:Label;
  constructor(private labelService:LabelService,private service:NoteService,private spinner: NgxSpinnerService,private snackBar: MatSnackBar) { }

  apiCallGetAllLabel(){
    this.labelService.getAllLabel('api/label/GetAllLabel').subscribe
    (
      response=>{
        this.labels=response;
      }
    )
  }


  apiCallGetAllNote(event?){
    this.service.getAllNote("api/Note/GetAllNotes").subscribe(
      response=>{
        this.listOfNotes=response;
        this.stopSpinner();
        console.log(response)
    },
    error=>{
      this.stopSpinner();
    }
    );
  }

  apiCall(evnt){
    switch(evnt['name']){
      case "collaborator":this.collaborator(evnt);
      break;
      case "trash":this.trash(evnt);
      case "color":this.addColor(evnt);
      break;
      case "addImage":this.addImage(evnt);
      break;
      case "archive":this.archieve(evnt);
      break;
      case "reminder":this.addReminder(evnt);
      break;
      case "updateNote":this.updateNote(evnt);
      break;
      case "label":this.addLabel(evnt);
      break;
    }
  }
  addLabel(evnt) {
    this.data.noteId=evnt.id;
    this.labelService.editlabel('api/label/EditLabel',this.data).subscribe
    (
      response=>{
        this.apiCallGetAllLabel();
      }
    )
  }

  trash(evnt: any) {
    this.startSpinner();
    this.service.trashNote("api/Note/Trash/"+evnt.id,evnt.id).subscribe
    (
      response=>{
        this.apiCallGetAllNote();
      },
      error=>{
        this.stopSpinner();
      }
    )
  }
  updateNote(event) {
    this.startSpinner();
    this.service.updateNote(event.data,'api/Note/EditNote').subscribe
    (
      response=>{
        this.apiCallGetAllNote();
      },
      error=>{
        this.stopSpinner();
      }
    );
  }

  addReminder(eventValue) {
    let data={
      id:eventValue.id,
      value:eventValue.value
    }
    this.startSpinner();
    this.service.addReminder(data,'api/Note/Reminder').subscribe(
      response=>{
        this.apiCallGetAllNote();
        console.log("success")
      },
      error=>{
        this.stopSpinner();
      }
    );
  }

  archieve(eventValue) {
    
    this.service.archiveNote(eventValue.id,'api/Note/Archive/'+eventValue.id).subscribe
    (
      response=>{
        this.apiCallGetAllNote();
        console.log("success");
      },
      error=>{
        this.stopSpinner();
      }

    );
  }

  addImage(eventValue) {
    this.startSpinner();
  }

  addColor(eventValue) {
    let data={
      id:eventValue.id,
      value:eventValue.value.color
    }
    this.startSpinner();
    this.service.addColor(data,"api/Note/ChangeColor").subscribe
    (
      response=>{
        this.apiCallGetAllNote();
      }
    );
  }

  collaborator(eventValue) {
    this.startSpinner();
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
  ngOnInit(): void {
  this.apiCallGetAllNote();
  }

}
