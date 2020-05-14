import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from 'src/app/Service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {DisplayComponent} from './../display/display.component';
import{CreateNoteComponent} from './../create-note/create-note.component';
import { from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LabelsComponent } from '../labels/labels.component';
import { LabelService } from 'src/app/Service/label.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  labels:any=null;

  private _mobileQueryListener: () => void;

  constructor(private labelService:LabelService, public dialog:MatDialog,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private snackBar: MatSnackBar,private router: Router,private service:UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openDialog(){
    const dialogRef = this.dialog.open(LabelsComponent, {
      width:'25%',
      data: { pageValue: this.labels }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
}

apiCallGetAllLabel(){
  this.labelService.getAllLabel("api/Label/GetAllLabel").subscribe
  (
    response=>{
      this.labels=response;
    }
  )
}

  signOut(){
    this.service.signOutAction('api/Account/Logout').subscribe(
      success=>{
        localStorage.removeItem('token');
        this.openSnackBar("Successfull","Logout");
        this.router.navigate(['/login']);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
