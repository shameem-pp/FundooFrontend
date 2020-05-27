import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { DataService } from 'src/app/Service/data.service'
import { LabelService } from 'src/app/Service/label.service';
import { LabelNote } from 'src/app/Models/label-note';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { NoteService } from 'src/app/Service/note.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input() labels: [];
  @Input() result: any;
  @Input() labelNote: any;
  dialogeValue: any;
  backgroundColor: string;
  width: any;
  margin: any;
  data: LabelNote = new LabelNote();

  constructor(private labelService: LabelService, public dialog: MatDialog, private dataService: DataService, private service: NoteService, private spinner: NgxSpinnerService, private snackBar: MatSnackBar) { }

  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  iconEvent(event, id) {
    console.log(id);
    switch (event['name']) {
      case "label": this.addLabel(event, id);
        break
      case "collaborator": this.addCollaborator(event, id);
        break
      case "trash": this.trash(event, id);
        break;
      case "color": this.addColor(event,id);
        break;
      case "archive": this.archieve(event,id);
        break;
      case "reminder": this.addReminder(event,id);
        break;
      default:
        this.notify.emit({ id: id, value: event.value, name: event.name });
        break;
    }
  }

  deleteReminder(contents) {
    contents.remainder = null;
    this.service.updateNote(contents, 'api/Note/EditNote').subscribe
      (
        response => {
          this.notify.emit({name})
        }
      )
  }


  trash(evnt: any,id) {
    this.startSpinner();
    this.service.trashNote("api/Note/Trash/" +id,id).subscribe
      (
        response => {
          this.notify.emit({ name: 'callGetAllNoteApi' });
        },
        error => {
          this.stopSpinner();
        }
      )
  }

  updateNote(evnt) {
    this.startSpinner();
    this.service.updateNote(evnt.data, 'api/Note/EditNote').subscribe
      (
        response => {
          this.notify.emit({ name: 'callGetAllNoteApi' });
        },
        error => {
          this.stopSpinner();
        }
      );
  }

  addReminder(eventValue,id) {
    let data = {
      id: id,
      value: eventValue.value
    }
    this.startSpinner();
    this.service.addReminder(data, 'api/Note/Reminder').subscribe(
      response => {
        this.notify.emit({ name: 'callGetAllNoteApi' });
      },
      error => {
        this.stopSpinner();
      }
    );
  }

  archieve(eventValue,id) {

    this.service.archiveNote(id, 'api/Note/Archive/' + id).subscribe
      (
        response => {
          this.notify.emit({ name: 'callGetAllNoteApi' });
        },
        error => {
          this.stopSpinner();
        }

      );
  }

  addColor(eventValue,id) {
    let data = {
      id: id,
      value: eventValue.value.color
    }
    this.startSpinner();
    this.service.addColor(data, "api/Note/ChangeColor").subscribe
      (
        response => {
          this.notify.emit({ name: 'callGetAllNoteApi' });
        }
      );
  }

  startSpinner() {
    this.spinner.show();
  }

  stopSpinner() {
    this.spinner.hide();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  addCollaborator(event: any, id) {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '50%',
      height: 'auto',
      data: { pageValue: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogeValue = result;
      console.log('The dialog was closed');
    });
  }

  addLabel(evnt, id) {
    debugger
    this.data.labelId = evnt.value.id;
    this.data.noteId = id;
    this.labelService.createLabel('api/label/CreateLabelNote', this.data).subscribe
      (
        res => {
          this.notify.emit({ name: 'callGetAllNoteApi' });
        }
      )
  }

  findLabel(labelId) {
    if (this.labels != null) {
      for (let i = 0; i < this.labels.length; i++) {
        if (labelId == this.labels[i]['id']) {
          return this.labels[i]['labelName'];
        }
      }
    }

  }

  changeColour(color: string) {
    this.backgroundColor = 'rgba(255,255,255,0.3)';
    if (color != null) {
      let index = color.indexOf(')');
      let output = ['rgba', color.slice(3, index), ',0.3', color.slice(index)].join('');
      this.backgroundColor = output;
    }
  }

  deleteLabel(id) {
    this.labelService.deleteLabel("api/label/DeleteLabelNote/" + id).subscribe
      (
        res => {

          this.notify.emit({ name: 'callGetAllNoteApi' });
        }
      )
  }

  openEditDialogue(contentOfNote) {
    const dialogRef = this.dialog.open(EditNoteComponent, {
      width: '50%',
      height: 'auto',
      data: { pageValue: contentOfNote }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogeValue = result;
      this.updateNote(this.dialogeValue)
      console.log('The dialog was closed', result);
    });
  }

  ngOnInit(): void {
    this.dataService.share.subscribe(x => this.width = x);
    this.dataService.shareMargin.subscribe(x => this.margin = x);
  }

}
