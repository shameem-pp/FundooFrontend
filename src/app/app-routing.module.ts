import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegistrationComponent} from './Component/registration/registration.component';
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';
import { FundooComponent } from './Component/fundoo/fundoo.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CreateNoteComponent } from './Component/create-note/create-note.component';
import { DisplayComponent } from './Component/display/display.component';
import { NotesComponent } from './Component/notes/notes.component';
import { IconComponent } from './Component/icon/icon.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:DashboardComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'resetPassword',component:ResetPasswordComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  {path:'fundoo',component:FundooComponent},
  {path:'i',component:IconComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],
  children:[{path:'',component:NotesComponent},{path:'note',component:NotesComponent,children:[{path:'display',component:DisplayComponent,children:[{path:'icon',component:IconComponent}]},{path:'createnote',component:CreateNoteComponent,children:[{path:'icon',component:IconComponent}]}]}
  ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
