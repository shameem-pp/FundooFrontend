import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/Models/note';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {


  notes:Note=new Note();

  @Output() notify:EventEmitter<any>=new EventEmitter<any>();
  reminder(){
    this.notify.emit({name:"reminder",value:""});
    console.log(this.notes.remainder)
  }

  collaborator(){
    this.notify.emit({name:"collaborator",value:""});
  }

  addColor(){
    this.notify.emit({name:"color",value:""});
  }

  addImage(){
    this.notify.emit({name:"addImage",value:""});
  }

  archive(){
    this.notify.emit({name:"archive",value:true});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
