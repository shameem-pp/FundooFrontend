import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { Note } from 'src/app/Models/note';
import { LabelNote } from 'src/app/Models/label-note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  clicked: boolean = false;
  contents: any;
  @Input() notes: Note;
  @Input() labels: any
  backgroundColor: any = 'rgb(255,255,255)';
  labelArray:LabelNote[]=[];
  constructor(private service: NoteService) { }

  @Output() notify = new EventEmitter<any>();
  openNote() {
    this.clicked = true;
  }

  apiCallCreateNote() {
    this.clicked = false;
    if (this.notes.title != null || this.notes.description != null) {
      let param="";
      let self=this
      this.labelArray.forEach(function(item,index){
        if(index!=self.labelArray.length-1){
          param+='labelArray[]='+item.id+"&";
        }
        else{
        param+='labelArray[]='+item.id;
        }

      })
      this.labelArray=[]
      this.service.createNote(this.notes, 'api/Note/CreateNote?'+param).subscribe(
        response => {
          this.notify.emit({ name: 'callGetAllNoteApi' });
          this.notes.title = null;
          this.notes.description = null;
          this.backgroundColor = 'rgb(255,255,255)';
          if(this.notes.remainder!=null){
            this.notes.remainder=null;
          }
          this.notes.remainder=null;
        });
    }
    else {
      if (this.labelArray.length != 0) {
        this.labelArray = [];
      }
      if(this.notes.remainder!=null){
        this.notes.remainder=null;
      }
      this.clicked = false;
    }
  }

  iconEvent(evnt) {
    switch (evnt['name']) {
      case "collaborator": this.collaborator(evnt['value']);
        break;
      case "color": this.addColor(evnt);
        break;
      case "addImage": this.addImage(evnt);
        break;
      case "archive": this.archieve(evnt['value']);
        break;
      case "reminder": this.addReminder(evnt['value']);
        break;
      case "createNote": this.apiCallCreateNote();
        break;
      case "label": this.addLabel(evnt);
        break;
    }
  }

  addLabel(evnt) {
    this.labelArray.push(evnt.value);
  }

  addReminder(eventValue) {
    this.notes.remainder = eventValue;
  }

  archieve(eventValue) {
    this.notes.archeive = eventValue;
  }

  addImage(eventValue) {
    this.notes.image = eventValue;
  }

  addColor(eventValue) {
    this.backgroundColor = eventValue.value.color;
    this.notes.changeColor = eventValue.value.color;
  }

  collaborator(eventValue) {
    this.notes.collaborator = eventValue;
  }
  
  deleteLabel(index){
    this.labelArray.splice(index,1);
  }

  deleteReminder(){
    this.notes.remainder=null;
  }

  ngOnInit(): void {
    this.notes = new Note();
  }
}
