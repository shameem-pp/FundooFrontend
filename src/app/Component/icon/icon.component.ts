import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Note } from 'src/app/Models/note';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  selectedDate: Date= new Date;
  month:any = new Array();
  currentTime:any;
  dateAndTime: any;
  @Input() onDisplay: boolean = false;
  @Input() onCreateNote: boolean = false;

  notes: Note = new Note();

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  colorArray: { color: string; name: string; }[][];

  constructor() {
  }

  reminder(event) {
    // this.selectedDate = new Date;
    // this.month = new Array();
    // this.currentTime = { hour: 08, minute: 0 };
    // this.month[0] = "Jan";
    // this.month[1] = "Feb";
    // this.month[2] = "Mar";
    // this.month[3] = "Apr";
    // this.month[4] = "May";
    // this.month[5] = "Jun";
    // this.month[6] = "Jul";
    // this.month[7] = "Aug";
    // this.month[8] = "Sep";
    // this.month[9] = "Oct";
    // this.month[10] = "Nov";
    // this.month[11] = "Dec";
    switch (event) {
      case 'Later Today':
        this.dateAndTime.day = this.selectedDate.getDate();
        break;
      case 'Tomorrow':
        this.dateAndTime.day = new Date(this.selectedDate).getDate() + 1;
        break;
      case 'Next Week':
        this.dateAndTime.day = new Date(this.selectedDate).getDate() + 7;
        break;
      default:
        this.dateAndTime = this.selectedDate.getDate();
        break;
    }

    this.dateAndTime.month=this.month[this.selectedDate.getMonth()];
    this.notify.emit({ name: "reminder", value: this.dateAndTime.day+" "+this.dateAndTime.month+", "+this.currentTime.hour+":"+this.currentTime.minute });

  }

  collaborator() {
    this.notify.emit({ name: "collaborator", value: "" });
  }

  addColor(color) {
    this.notify.emit({ name: "color", value: color });
  }

  addImage() {
    this.notify.emit({ name: "addImage", value: "" });
  }

  archive() {
    this.notify.emit({ name: "archive", value: true });
  }

  createNote() {
    this.notify.emit({ name: "createNote", value: true });
  }

  delete() {
    this.notify.emit({ name: "trash", value: true });
  }
  Propogation($event) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  ngOnInit(): void {
    this.colorArray = [
      [{ 'color': 'rgb(255,255,255)', 'name': 'White' },
      { 'color': 'rgb(242,139,130)', 'name': 'Red' },
      { 'color': 'rgb(251,188,4)', 'name': 'Orange' },
      { 'color': 'rgb(255,244,117)', 'name': 'Yellow' }],

      [{ 'color': 'rgb(204,255,144)', 'name': 'Green' },
      { 'color': 'rgb(167,255,235)', 'name': 'Teal' },
      { 'color': 'rgb(203,240,248)', 'name': 'Blue' },
      { 'color': 'rgb(174,203,250)', 'name': 'Darkblue' }],

      [{ 'color': 'rgb(239, 222, 205)', 'name': 'Almond' },
      { 'color': 'rgb(75, 83, 32)', 'name': 'Army green' },
      { 'color': 'rgb(255, 153, 102)', 'name': 'Atomictangerine' },
      { 'color': 'rgb(152, 119, 123)', 'name': 'Bazaar' }],
    ];
  }

}
