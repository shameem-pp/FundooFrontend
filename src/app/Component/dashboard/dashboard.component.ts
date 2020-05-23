import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from 'src/app/Service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LabelsComponent } from '../labels/labels.component';
import { LabelService } from 'src/app/Service/label.service';
import { DataService } from 'src/app/Service/data.service'
import { ProfilePictureComponent } from '../profile-picture/profile-picture.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  labels: any = null;

  email=localStorage.getItem('email');
  name=localStorage.getItem('name');
  profilePic:string=localStorage.getItem('profilePic')
  private _mobileQueryListener: () => void;
  viewToggle: boolean = true;

  constructor(private dataService: DataService, private labelService: LabelService, public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private snackBar: MatSnackBar, private router: Router, private service: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.apiCallGetAllLabel();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '25%',
      data: { pageValue: this.labels }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  apiCallGetAllLabel() {
    this.labelService.getAllLabel("api/Label/GetAllLabel").subscribe
      (
        response => {
          this.labels = response;
        }
      )

  }

  toggleViews() {
    this.viewToggle = !this.viewToggle;
    if (!this.viewToggle) {
      this.dataService.updateData('52%')
      this.dataService.updateMargin('2% 30%')
    }
    else{
      this.dataService.updateData('20%')
      this.dataService.updateMargin('2% 20%')
    }
  }
  
  signOut() {
    this.service.signOutAction('api/Account/Logout').subscribe(
      success => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
        localStorage.removeItem('name');
        this.openSnackBar("Successfull", "Logout");
        this.router.navigate(['/login']);
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onSearchChange(searchValue: string): void {  
    this.dataService.updateSearch(searchValue);
    console.log(searchValue)
  }

  openDialogueOfProfilePic(){
    const dialogRef = this.dialog.open(ProfilePictureComponent, {
      width:'50%',
      height:'80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
