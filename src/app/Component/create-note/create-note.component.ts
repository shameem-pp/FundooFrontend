import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { Note } from 'src/app/Models/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  clicked:boolean=false;
  contents:any={id:0};
  @Input() labels:any;
  @Input() notes:Note;
  backgroundColor:any='rgb(255,255,255)';
  constructor(private service:NoteService) { }

  @Output() notify:EventEmitter<any>=new EventEmitter<any>();
  openNote(){
    this.clicked=true;
  }

  apiCallCreateNote(){
    if(this.notes.title!=null || this.notes.description!=null){
      this.service.createNote(this.notes,'api/Note/CreateNote').subscribe(
        response=>{
          this.clicked=false;
          this.notify.emit('callGetAllNoteApi');
          this.notes.title=null;
          this.notes.description=null;
          this.backgroundColor='rgb(255,255,255)';
        });
    }
    else{
      this.clicked=false;
    }
  }

  iconEvent(evnt){
    switch(evnt['name']){
    case "collaborator":this.collaborator(evnt['value']);
    break;
    case "color":this.addColor(evnt);
    break;
    case "addImage":this.addImage(evnt);
    break;
    case "archive":this.archieve(evnt['value']);
    break;
    case "reminder":this.addReminder(evnt['value']);
    break;
    case "createNote":this.apiCallCreateNote();
    break;
    case "label":this.apiCallEditLabel(evnt);
    break;
    }
  }
  apiCallEditLabel(evnt) {
    evnt.name="addLabel";
    this.notify.emit(evnt);
  }

  addReminder(eventValue) {
    this.notes.remainder=eventValue;
  }

  archieve(eventValue) {
    this.notes.archeive=eventValue;
  }

  addImage(eventValue) {
    this.notes.image=eventValue;
  }

  addColor(eventValue) {
      this.backgroundColor=eventValue.value.color;
      this.notes.changeColor=eventValue.value.color;
  }

  collaborator(eventValue) {
    this.notes.collaborator=eventValue;
  }
 

  ngOnInit(): void {
    this.notes=new Note();
  }

}
