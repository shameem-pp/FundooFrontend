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
  data:Label=new Label();
  constructor(private labelService:LabelService,private service:NoteService,private spinner: NgxSpinnerService,private snackBar: MatSnackBar) { }

  apiCallGetAllLabel(){
    this.labelService.getAllLabel('api/label/GetAllLabel').subscribe
    (
      response=>{
        this.labels=response;
      }
    )
  }


  apiCallGetAllNote(evnt?){
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
      break;
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
      case "createLabel":this.addLabelFromCreateNote(evnt);
      break;
      case "deleteLabel":this.deleteLabel(evnt.id);
      break;
      case "deleteReminder":this.deleteReminder(evnt)
      break;
      case "callGetAllNoteApi":this.apiCallGetAllNote(evnt);
      break;
    }
  }
  addLabelFromCreateNote(evnt: any) {
    this.data.noteId=this.listOfNotes[0].id;
    this.data.id=evnt.value.id;
    this.data.labelName=evnt.value.labelName;
    this.data.email=evnt.value.email;
    this.labelService.editlabel('api/label/EditLabel',this.data).subscribe
    (
      response=>{
        this.apiCallGetAllLabel();
      },
      error=>{
        this.apiCallGetAllLabel();
      }
    )
  }

deleteReminder(evnt){
  this.service.updateNote(evnt.value,'api/Note/EditNote').subscribe
  (
    response=>{
      this.apiCallGetAllNote();
    }
  )
}

  deleteLabel(id: any) {
    this.labelService.deleteLabel('api/label/DeleteLabel/'+id).subscribe
    (
      response=>{
        this.apiCallGetAllLabel();
      }
    );
  }
  addLabel(evnt) {
    this.data.noteId=evnt.id;
    this.data.id=evnt.value.id;
    this.data.labelName=evnt.value.labelName;
    this.data.email=evnt.value.email;
    this.labelService.editlabel('api/label/EditLabel',this.data).subscribe
    (
      response=>{
        this.apiCallGetAllLabel();
      },
      error=>{
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
  updateNote(evnt) {
    this.startSpinner();
    this.service.updateNote(evnt.data,'api/Note/EditNote').subscribe
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
  this.apiCallGetAllLabel();
  }

}
