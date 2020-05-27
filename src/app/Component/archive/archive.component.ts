import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { LabelService } from 'src/app/Service/label.service';
import { Label } from 'src/app/Models/label';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  labels:any;
  listOfNotes:any;

  data:Label=new Label();
  labelNote: Object;
  constructor(private noteService:NoteService,private labelService:LabelService,private spinner: NgxSpinnerService,private snackBar: MatSnackBar) { }

  apiCallGetAllLabel(){
    this.labelService.getAllLabel('api/label/GetAllLabel').subscribe
    (
      response=>{
        this.labels=response;
      },
      err=>{
        this.stopSpinner();
      }
    )
  }

  apiCallGetAllLabelNote(){
    this.labelService.getAllLabel("api/Label/GetAllLabelNote").subscribe
    (
      res=>{
        this.labelNote=res;
        console.log(res)
      },
      err=>{
        this.stopSpinner();
      }
    )
  }

  apiCallGetAllNote(event?){
    this.noteService.getAllNotes("api/Note/GetArchivededNotes").subscribe(
      response=>{
        this.listOfNotes=response;
        this.stopSpinner();
        console.log(response)
    },
    err=>{
      this.stopSpinner();
    }
    );
  }

  apiCall(evnt){
    switch(evnt['name']){
      case "callGetAllNoteApi":this.apiCallGetAllNote();
      break;
    }
  }

  startSpinner(){
    this.spinner.show();
  }
  
  stopSpinner(){
    this.spinner.hide();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
  ngOnInit(): void {
    this.startSpinner();
    this.apiCallGetAllNote();
    this.apiCallGetAllLabel();
  }

}
