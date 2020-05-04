import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user:FormGroup;

  constructor(private fb:FormBuilder,private service:UserService,private router:Router,private snackBar:MatSnackBar) { }

  validation(){
    let data={
      email:this.valueOfInputField('userName'),
    }

    this.service.forgotPasswordAction(data,"api/Account/ForgotPassword").subscribe(
      success=>{
        this.openSnackBar("Successfull","ForgotPassword");
        this.router.navigate(['/fundoo']);
      },
      error=>{
        this.openSnackBar(error.toString(),"ForgotPassword");
      }
    );

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  valueOfInputField(inputElement:string){
    return this.user.get(inputElement).value;
  }

  ngOnInit(): void {
    this.user =this.fb.group({
      userName:['',[Validators.required,Validators.email]]});
  }
}
