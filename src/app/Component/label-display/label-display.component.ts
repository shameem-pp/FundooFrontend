import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-label-display',
  templateUrl: './label-display.component.html',
  styleUrls: ['./label-display.component.css']
})
export class LabelDisplayComponent implements OnInit {
  @Input() labels:any;
  @Output() notify:EventEmitter<any> =new EventEmitter();
  constructor() {}

  apiCallDelete(id){
    this.notify.emit(id);
  }
  
  ngOnInit(): void {
  }

}
