import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Service/note.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';
import { LabelService } from 'src/app/Service/label.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  listOfNotes: Object;
  labels:Object; 
  searchText: string;
  show: boolean=false;
  noteSearch: any;
  labelNote: any;

  constructor(private dataService:DataService, private labelService:LabelService,private service:NoteService,private spinner: NgxSpinnerService,private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.startSpinner();
    this.apiCallGetAllNote();
    this.apiCallGetAllLabel();
    this.dataService.shareSearch.subscribe(x=>this.searchText=x);
    this.dataService.shareNote.subscribe(x=>this.noteSearch=x);
    }
    
  apiCallGetAllLabel(){
    this.labelService.getAllLabel('api/label/GetAllLabel').subscribe
    (
      response=>{
        console.log(response)
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


   apiCallGetAllNote(){
    this.apiCallGetAllLabelNote();
    this.service.getAllNotes("api/Note/GetAllNotes").subscribe
    ( 
    response=>{
        this.listOfNotes=response;
        this.stopSpinner();
        this.dataService.updateNote(response);
        console.log(response)
    },
    error=>{
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

// deleteReminder(evnt){
//   this.service.updateNote(evnt.value,'api/Note/EditNote').subscribe
//   (
//     response=>{
//       this.apiCallGetAllNote();
//     }
//   )
// }


//   trash(evnt: any) {
//     this.startSpinner();
//     this.service.trashNote("api/Note/Trash/"+evnt.id,evnt.id).subscribe
//     (
//       response=>{
//         this.apiCallGetAllNote();
//       },
//       error=>{
//         this.stopSpinner();
//       }
//     )
//   }
//   updateNote(evnt) {
//     this.startSpinner();
//     this.service.updateNote(evnt.data,'api/Note/EditNote').subscribe
//     (
//       response=>{
//         this.apiCallGetAllNote();
//       },
//       error=>{
//         this.stopSpinner();
//       }
//     );
//   }

//   addReminder(eventValue) {
//     let data={
//       id:eventValue.id,
//       value:eventValue.value
//     }
//     this.startSpinner();
//     this.service.addReminder(data,'api/Note/Reminder').subscribe(
//       response=>{
//         this.apiCallGetAllNote();
//         console.log("success")
//       },
//       error=>{
//         this.stopSpinner();
//       }
//     );
//   }

//   archieve(eventValue) {
    
//     this.service.archiveNote(eventValue.id,'api/Note/Archive/'+eventValue.id).subscribe
//     (
//       response=>{
//         this.apiCallGetAllNote();
//         console.log("success");
//       },
//       error=>{
//         this.stopSpinner();
//       }

//     );
//   }

//   addImage(eventValue) {
//   }

//   addColor(eventValue) {
//     let data={
//       id:eventValue.id,
//       value:eventValue.value.color
//     }
//     this.startSpinner();
//     this.service.addColor(data,"api/Note/ChangeColor").subscribe
//     (
//       response=>{
//         this.apiCallGetAllNote();
//       }
//     );
//   }

//   collaborator(eventValue) {
//   }
 
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

}
