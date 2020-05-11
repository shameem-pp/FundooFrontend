import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { Note } from 'src/app/Models/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  clicked:boolean=false;
  @Input() notes:Note;
  constructor(private service:NoteService) { }

  openNote(){
    this.clicked=true;
  }

  apiCallCreateNote(){
    if(this.notes.title!=null || this.notes.description!=null ){
      this.service.createNote(this.notes,'api/Note/CreateNote').subscribe(
        response=>{
        });
    }
    else{
      this.clicked=false;
    }
  }

  iconEvent(evnt){
debugger;
  }

  ngOnInit(): void {
    this.notes=new Note();
  }

}
