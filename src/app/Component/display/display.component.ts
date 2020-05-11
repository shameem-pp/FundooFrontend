import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() result: any;
  isShow: boolean;

  constructor() { }

showIcon(){
this.isShow=!this.isShow;
}

  ngOnInit(): void {
    this.isShow=false;   
  }

}
