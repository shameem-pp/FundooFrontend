import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/Models/note';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() result: any;

  constructor(public dialog:MatDialog) { }
  @Output() notify:EventEmitter<any> =new EventEmitter<any>();

  iconEvent(eventValue,id){
    console.log(id);
    this.notify.emit({id:id,value:eventValue.value,name:eventValue.name})
  }

  openEditDialogue(contentOfNote){
    const dialogRef = this.dialog.open(EditNoteComponent, {
      data: { pageValue: contentOfNote }
    });
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  ngOnInit(): void {
  }

}
