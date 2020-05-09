import { Component, OnInit } from '@angular/core';
import{DashboardComponent} from './../dashboard/dashboard.component';
import{CreateNoteComponent} from './../create-note/create-note.component';
import { from } from 'rxjs';
import { NoteService } from 'src/app/Service/note.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  clicked: boolean;
  result: any;

  constructor(private service:NoteService) { }



  ngOnInit(): void {
    this.clicked=false;
    this.service.getAllNote("api/Note/GetAllNotes").subscribe(
      response=>{
        this.result=response;
        console.log(response)
    });
  }

}
