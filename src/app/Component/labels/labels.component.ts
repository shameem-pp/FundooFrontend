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
  clicked:boolean=true;
  data:Label=new Label();
  notes = new FormControl('');

  constructor(private service:LabelService) { }

  onClickToggle(){
    this.clicked=!this.clicked;
    debugger
    if(this.clicked && this.notes.value!=null){
      this.data.LabelName=this.notes.value;
      this.service.createLabel('api/Label/CreateLabel',this.data).subscribe
      (
        response=>{
          console.log(response);
        }
      )
    }
  }
  ngOnInit(): void {
  }

}
