import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/Service/label.service';

@Component({
  selector: 'app-label-display',
  templateUrl: './label-display.component.html',
  styleUrls: ['./label-display.component.css']
})
export class LabelDisplayComponent implements OnInit {
  labels: any;


  constructor(private labelService:LabelService) { }


  apiCallGetAllLabel(){
    this.labelService.getAllLabel("api/Label/GetAllLabel").subscribe
    (
      response=>{
        this.labels=response;
      }
    )
  }
  ngOnInit(): void {
  }

}
