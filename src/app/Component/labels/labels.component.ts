import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LabelService } from 'src/app/Service/label.service';
import { Label } from 'src/app/Models/label';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  clicked:boolean=true;//toggle
  data:Label=new Label();//create note api
  notes = new FormControl('');//create note input
  labels: any;//get all note

  constructor(private labelService:LabelService) { }

  onClickToggle(){
    this.clicked=!this.clicked;
  }

  apiCallGetAllLabel(){
    this.labelService.getAllLabel("api/Label/GetAllLabel").subscribe
    (
      response=>{
        this.labels=response;
      }
    )
  }

  apiCallCreateNote(){
    if(this.clicked && this.notes.value!=null){
      this.data.labelName=this.notes.value;
      this.labelService.createLabel('api/Label/CreateLabel',this.data).subscribe
      (
        response=>{
          this.apiCallCreateNote()
        }
      )
    }
  }
  ngOnInit(): void {
  }

}
