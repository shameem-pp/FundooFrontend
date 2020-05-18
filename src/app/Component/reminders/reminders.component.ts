import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/Models/label';
import { NoteService } from 'src/app/Service/note.service';
import { LabelService } from 'src/app/Service/label.service';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.css']
})
export class RemindersComponent implements OnInit {

  labels:any;
  listOfNotes:any;

  data:Label=new Label();
  constructor(private noteService:NoteService,private labelService:LabelService) { }

  apiCallGetAllLabel(){
    this.labelService.getAllLabel('api/label/GetAllLabel').subscribe
    (
      response=>{
        this.labels=response;
      }
    )
  }


  apiCallGetAllNote(event?){
    this.noteService.getAllNote("api/Note/GetReminderNotes").subscribe(
      response=>{
        this.listOfNotes=response;
        console.log(response)
    },
    error=>{
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
    }
  }
  addLabel(evnt) {
    debugger
    this.data.noteId=evnt.id;
    this.data.id=evnt.value.id;
    this.data.labelName=evnt.value.labelName;
    this.data.email=evnt.value.email;
    this.labelService.editlabel('api/label/EditLabel',this.data).subscribe
    (
      response=>{
        this.apiCallGetAllLabel();
      }
    )
  }

  trash(evnt: any) {
    this.noteService.trashNote("api/Note/Trash/"+evnt.id,evnt.id).subscribe
    (
      response=>{
        this.apiCallGetAllNote();
      },
      error=>{
      }
    )
  }
  updateNote(event) {
    this.noteService.updateNote(event.data,'api/Note/EditNote').subscribe
    (
      response=>{
        this.apiCallGetAllNote();
      },
      error=>{
      }
    );
  }

  addReminder(eventValue) {
    let data={
      id:eventValue.id,
      value:eventValue.value
    }
    this.noteService.addReminder(data,'api/Note/Reminder').subscribe(
      response=>{
        this.apiCallGetAllNote();
        console.log("success")
      },
      error=>{
      }
    );
  }

  archieve(eventValue) {
    
    this.noteService.archiveNote(eventValue.id,'api/Note/Archive/'+eventValue.id).subscribe
    (
      response=>{
        this.apiCallGetAllNote();
        console.log("success");
      },
      error=>{
      }

    );
  }

  addImage(eventValue) {
  }

  addColor(eventValue) {
    let data={
      id:eventValue.id,
      value:eventValue.value.color
    }
    this.noteService.addColor(data,"api/Note/ChangeColor").subscribe
    (
      response=>{
        this.apiCallGetAllNote();
      }
    );
  }

  collaborator(eventValue) {
  }
 

  ngOnInit(): void {
  this.apiCallGetAllNote();
  this.apiCallGetAllLabel();
  }

}

