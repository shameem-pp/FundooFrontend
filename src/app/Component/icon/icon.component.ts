import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Output() notify:EventEmitter<any>=new EventEmitter<any>();
  reminder(){
    this.notify.emit();
  }

  collaborator(){

  }

  addColor(){

  }

  addImage(){

  }

  archive(){
    this.notify.emit(true);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
