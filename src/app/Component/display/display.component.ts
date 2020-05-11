import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/Models/note';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() result: any;

  constructor() { }
  @Output() notify:EventEmitter<any> =new EventEmitter<any>();

  iconEvent(eventValue,id){
    console.log(id);
    this.notify.emit({id:id,value:eventValue.value,name:eventValue.name})
  }


  ngOnInit(): void {
  }

}
