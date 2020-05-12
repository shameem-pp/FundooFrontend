import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Note } from 'src/app/Models/note';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

  @Input() onDisplay:boolean=false;
  @Input() onCreateNote:boolean=false;
  
  notes:Note=new Note();

  @Output() notify:EventEmitter<any>=new EventEmitter<any>();
  reminder(event){
    let date=new Date(); 
    switch(event){
      case 'Later Today':
        event+=date.getDate();
        break;
        case 'Tomorrow':
          event+=new Date(date).getDate()+1;
          break;
          case 'Next Week':
            event+=new Date(date).getDate()-1;
            break;
    }
    this.notify.emit({name:"reminder",value:event});
    
  }

  collaborator(){
    this.notify.emit({name:"collaborator",value:""});
  }

  addColor(){
    this.notify.emit({name:"color",value:""});
  }

  addImage(){
    this.notify.emit({name:"addImage",value:""});
  }

  archive(){
    this.notify.emit({name:"archive",value:true});
  }

  createNote(){
    this.notify.emit({name:"createNote",value:true});
  }
  constructor() { }

  ngOnInit(): void {
  }

}
