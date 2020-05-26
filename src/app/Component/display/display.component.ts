import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import {DataService} from 'src/app/Service/data.service'
import { LabelService } from 'src/app/Service/label.service';
import { LabelNote } from 'src/app/Models/label-note';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() labels:[];
  @Input() result: any;
  @Input() labelNote:any;
  dialogeValue:any;
  backgroundColor:string;
  width: any;
  margin:any;
  data:LabelNote=new LabelNote();

  constructor( private labelService:LabelService,public dialog:MatDialog,private dataService:DataService) { }

  @Output() notify:EventEmitter<any> =new EventEmitter<any>();

  iconEvent(event,id){
    console.log(id);
switch(event['name']){
  case "label":this.addLabel(event,id);
  break;
  case "collaborator":this.addCollaborator(event,id);
}
    this.notify.emit({id:id,value:event.value,name:event.name})
  }
  addCollaborator(event: any,id) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width:'50%',
      height:'auto',
      data:id
    });
 
    dialogRef.afterClosed().subscribe(result => {
      this.dialogeValue=result;
      this.notify.emit(this.dialogeValue);
      console.log('The dialog was closed');
    });
  }
  
  deleteLabelNote(id: any) {
  }

  addLabel(evnt,id) {
    this.data.labelId=evnt.value.id;
    this.data.noteId=id;
    this.labelService.createLabel('api/label/CreateLabelNote',this.data).subscribe
    (
      res=>{
        this.notify.emit({name:'callGetAllNoteApi'});
      }
    )
  }
  
  findLabel(labelId){
    if(this.labels!=null){
      for(let i=0;i<this.labels.length;i++){
        if(labelId==this.labels[i]['id']){
          return this.labels[i]['labelName'];
        }
      }
    }

  }

  changeColour(color:string){
    this.backgroundColor='rgba(255,255,255,0.3)';
    if(color!=null){
      let index=color.indexOf(')');
      let output=['rgba',color.slice(3,index),',0.3',color.slice(index)].join('');
      this.backgroundColor=output;
    }
  }
  updateNote(contents){
    contents.remainder=null;
    this.notify.emit({id:contents.id,value:contents,name:"deleteReminder"})
  }
  deleteLabel(id){
    this.labelService.deleteLabel("api/label/DeleteLabelNote/"+id).subscribe
    (
      res=>{

        this.notify.emit({name:'callGetAllNoteApi'});
      }
    )
  }

  openEditDialogue(contentOfNote){ 
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width:'50%',
      height:'auto',
      data: { pageValue: contentOfNote }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      this.dialogeValue=result;
      this.notify.emit(this.dialogeValue);
      console.log('The dialog was closed', result);
    });
  }

  ngOnInit(): void {
    this.dataService.share.subscribe(x=> this.width=x);
    this.dataService.shareMargin.subscribe(x=>this.margin=x);
  }

}
