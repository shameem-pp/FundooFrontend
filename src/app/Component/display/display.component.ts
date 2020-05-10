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
  result: any;
  isShow: boolean;

  constructor(private service:NoteService) { }

showIcon(){
this.isShow=!this.isShow;
}

  ngOnInit(): void {
    this.isShow=false;
    this.service.getAllNote("api/Note/GetAllNotes").subscribe(
      response=>{
        this.result=response;
        console.log(response)
    });
  }

}
