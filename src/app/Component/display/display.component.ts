import { Component, OnInit } from '@angular/core';
import{DashboardComponent} from './../dashboard/dashboard.component';
import{CreateNoteComponent} from './../create-note/create-note.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  clicked: boolean;

  constructor() { }

  createNote(){
    this.clicked=true;
  }
  ngOnInit(): void {
    this.clicked=false;
  }

}
