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

  ngOnInit(): void {
  this.apiCallGetAllNote();
  }

}
