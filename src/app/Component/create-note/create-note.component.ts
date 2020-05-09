import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
  clicked:boolean=false;
  notes:FormGroup;
  constructor(private service:NoteService,private fb:FormBuilder) { }

  openNote(){
    this.clicked=true;
  }

  apiCallCreateNote(){
    let data={
      title:this.valueOfInputField('title'),
      description:this.valueOfInputField('description')
    }

    if(data.title!=null || data.description!=null ){
      this.service.createNote(data,'api/Note/CreateNote')
    }
  }

  valueOfInputField(inputElement:string){
    return this.notes.get(inputElement).value;
  }

  ngOnInit(): void {
    this.notes =this.fb.group({
      title:[''],
      description:['']
    });
  }

}
