import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-label-create',
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.css']
})
export class LabelCreateComponent implements OnInit {

  clicked:boolean=true;//toggle
  notes = new FormControl('');//create note input
  @Output () notify:EventEmitter<any>=new EventEmitter();

  constructor() { }

  apiCallCreateNote(){
    this.notify.emit(this.notes);
    this.notes.setValue('');
  }

  onClickToggle(){
    this.clicked=!this.clicked;
  }
  ngOnInit(): void {
  }

}
