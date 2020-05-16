import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'src/app/Models/label';

@Component({
  selector: 'app-label-display',
  templateUrl: './label-display.component.html',
  styleUrls: ['./label-display.component.css']
})
export class LabelDisplayComponent implements OnInit {
  @Input() labels:any;
  constructor() {
   }
  apiCallDelete(){
    
  }
  ngOnInit(): void {
  }

}
