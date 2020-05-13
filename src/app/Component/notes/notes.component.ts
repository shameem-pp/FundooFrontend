import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  listOfNotes: Object;

  constructor(private service:NoteService) { }


  apiCallGetAllNote(event?){
    this.service.getAllNote("api/Note/GetAllNotes").subscribe(
      response=>{
        this.listOfNotes=response;
        console.log(response)
    });
  }

  apiCall(evnt){
    switch(evnt['name']){
      case "collaborator":this.collaborator(evnt);
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
    }
  }
  updateNote(event) {
    this.service.updateNote(event.data,'api/Note/EditNote').subscribe
    (
      response=>{
        this.apiCallGetAllNote();
      }
    );
  }

  addReminder(eventValue) {
    debugger;
    this.service.addReminder(eventValue,'api/Note/Reminder/'+eventValue.id).subscribe(
      response=>{
        this.apiCallGetAllNote();
        console.log("success")
      }
    );
  }

  archieve(eventValue) {
    
    this.service.archiveNote(eventValue.id,'api/Note/Archive/'+eventValue.id).subscribe
    (
      response=>{
        this.apiCallGetAllNote();
        console.log("success");
      }

    );
  }

  addImage(eventValue) {
  }

  addColor(eventValue) {
  }

  collaborator(eventValue) {
  }
 

  ngOnInit(): void {
  this.apiCallGetAllNote();
  }

}
