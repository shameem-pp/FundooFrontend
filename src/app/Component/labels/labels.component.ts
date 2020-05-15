import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  clicked:boolean=true;
  constructor() { }

  onClickToggle(){
    this.clicked=!this.clicked;
  }
  ngOnInit(): void {
  }

}
