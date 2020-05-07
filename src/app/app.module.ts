import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { RegistrationComponent } from './Component/registration/registration.component';
import { LoginComponent } from './Component/login/login.component';
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';
import { UserService } from './Service/user.service';
import { HttpService } from './Service/http.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FundooComponent } from './Component/fundoo/fundoo.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { CreateNoteComponent } from './Component/create-note/create-note.component';
import { IconComponent } from './Component/icon/icon.component';
import { NotesComponent } from './Component/notes/notes.component';
import { RemindersComponent } from './Component/reminders/reminders.component';
import { LabelsComponent } from './Component/labels/labels.component';
import { ArchiveComponent } from './Component/archive/archive.component';
import { BinComponent } from './Component/bin/bin.component';
import { DisplayComponent } from './Component/display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    FundooComponent,
    DashboardComponent,
    CreateNoteComponent,
    IconComponent,
    NotesComponent,
    RemindersComponent,
    LabelsComponent,
    ArchiveComponent,
    BinComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [UserService,
  HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
