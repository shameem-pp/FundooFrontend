import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { Note } from 'src/app/Models/note';
import { Label } from 'src/app/Models/label';
import { LabelNote } from 'src/app/Models/label-note';
import { LabelService } from 'src/app/Service/label.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  clicked:boolean=false;
  contents:any;
  @Input() notes:Note;
  @Input() labels:any
  backgroundColor:any='rgb(255,255,255)';
  labelArray=new Array();
  data:LabelNote=new LabelNote();
  constructor(private service:NoteService,private labelService:LabelService) { }

  @Output() notify=new EventEmitter<any>();
  openNote(){
    this.clicked=true;
  }

  apiCallCreateNote(){

    if(this.notes.title!=null || this.notes.description!=null){
      this.service.createNote(this.notes,'api/Note/CreateNote').subscribe(
        response=>{
          if(this.labelArray.length!=0){
            this.labelArray.forEach(element => {
              this.addLabel(element['id'],response['id'])
            });
          }
          this.clicked=false;
         this.notify.emit({name:'callGetAllNoteApi'});
          this.notes.title=null;
          this.notes.description=null;
          this.backgroundColor='rgb(255,255,255)';
        });
    }
    else{
      if(this.labelArray.length!=0){
        this.labelArray=[];
      }
      this.clicked=false;
    }
  }

  iconEvent(evnt){
    switch(evnt['name']){
    case "collaborator":this.collaborator(evnt['value']);
    break;
    case "color":this.addColor(evnt);
    break;
    case "addImage":this.addImage(evnt);
    break;
    case "archive":this.archieve(evnt['value']);
    break;
    case "reminder":this.addReminder(evnt['value']);
    break;
    case "createNote":this.apiCallCreateNote();
    break;
    case "label":this.addLabelToLabelArr(evnt);
    break;
    }
  }

  
 async addLabel(labelId,noteId) {
    this.data.labelId=labelId;
    this.data.noteId=noteId;
    await this.labelService.createLabel('api/label/CreateLabelNote',this.data).subscribe
    (
      res=>{
        debugger
        console.log(res);
      }
    )
  }
  addLabelToLabelArr(evnt) {
    this.labelArray.push(evnt.value);
  }

  addReminder(eventValue) {
    this.notes.remainder=eventValue;
  }

  archieve(eventValue) {
    this.notes.archeive=eventValue;
  }

  addImage(eventValue) {
    this.notes.image=eventValue;
  }

  addColor(eventValue) {
      this.backgroundColor=eventValue.value.color;
      this.notes.changeColor=eventValue.value.color;
  }

  collaborator(eventValue) {
    this.notes.collaborator=eventValue;
  }
 

  ngOnInit(): void {
    this.notes=new Note();
  }

}
