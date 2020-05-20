import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import {DataService} from 'src/app/Service/data.service'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() labels:any;
  @Input() result: any;
  dialogeValue:any;
  backgroundColor:string;
  width: any;
  margin:any;

  constructor(public dialog:MatDialog,private dataService:DataService) { }

  @Output() notify:EventEmitter<any> =new EventEmitter<any>();

  iconEvent(eventValue,id){
    console.log(id);
    if(eventValue.name=='color'){
      this.backgroundColor=eventValue.value.color;
    }

    this.notify.emit({id:id,value:eventValue.value,name:eventValue.name})
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
    this.notify.emit({id:id,name:'deleteLabel'})
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
