import { Component, OnInit,Optional, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LabelService } from 'src/app/Service/label.service';
import { Label } from 'src/app/Models/label';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
  clicked:boolean=true;//toggle
  data:Label=new Label();//create note api
  labels: any;//get all note

  constructor(private labelService:LabelService,public dialogRef: MatDialogRef<LabelsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public datas: any) { 
      this.labels = datas.pageValue;
      console.log(this.labels)
    }

 
  apiCallDelete(event){
    this.labelService.deleteLabel('api/label/DeleteLabel/'+event).subscribe
    (
      response=>{
        this.apiCallGetAllLabel();
      }
    )
  }

  apiCallGetAllLabel(){
    this.labelService.getAllLabel("api/Label/GetAllLabel").subscribe
    (
      response=>{
        this.labels=response;
      }
    )
  }

  apiCallCreateNote(event){
    if(this.clicked && event.value!=null){
      this.data.labelName=event.value;
      this.labelService.createLabel('api/Label/CreateLabel',this.data).subscribe
      (
        response=>{
          this.apiCallGetAllLabel();
        }
      )
    }
  }
  ngOnInit(): void {
  }

}
