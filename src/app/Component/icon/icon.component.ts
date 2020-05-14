import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Note } from 'src/app/Models/note';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  time = {hour: 13, minute: 30};
  @Input() onDisplay:boolean=false;
  @Input() onCreateNote:boolean=false;
  
  notes:Note=new Note();

  @Output() notify:EventEmitter<any>=new EventEmitter<any>();

  colorArray: { color: string; name: string; }[][];

  constructor() {

   }

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

  addColor(color){
    this.notify.emit({name:"color",value:color});
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

  delete(){
    this.notify.emit({name:"trash",value:true});
  }


  ngOnInit(): void {
    this.colorArray=[
      [{'color':'rgb(255,255,255)','name':'White'},
      {'color':'rgb(242,139,130)','name':'Red'},
      {'color':'rgb(251,188,4)','name':'Orange'},
      {'color':'rgb(255,244,117)','name':'Yellow'}],

      [{'color':'rgb(204,255,144)','name':'Green'},
      {'color':'rgb(167,255,235)','name':'Teal'},
      {'color':'rgb(203,240,248)','name':'Blue'},
      {'color':'rgb(174,203,250)','name':'Darkblue'}],

      [{'color':'rgb(239, 222, 205)','name':'Almond'},
      {'color':'rgb(75, 83, 32)','name':'Army green'},
      {'color':'rgb(255, 153, 102)','name':'Atomictangerine'},
      {'color':'rgb(152, 119, 123)','name':'Bazaar'}],
  ]
  }

}
