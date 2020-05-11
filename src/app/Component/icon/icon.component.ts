import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Output() notify:EventEmitter<any>=new EventEmitter<any>();
  reminder(){
    this.notify.emit({name:"reminder",value:""});
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
