import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {
 notes:any;
  fromPage: any;
  fromDialog: any;
 contents:any
  constructor(public dialogRef: MatDialogRef<EditNoteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.fromPage = data.pageValue;
    }

  ngOnInit(): void {
  }

}
