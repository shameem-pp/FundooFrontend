import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user:FormGroup;
token:string;
email:string;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,private service:UserService,private snackBar: MatSnackBar) { }

  validation(){
    let data={
      email:this.valueOfInputField('userName'),
      newPassword:this.valueOfInputField('password'),
      confirmPassword:this.valueOfInputField('confirm')
    }
this.service.resetPasswordAction(data,"api/Account/ResetPassword?email="+this.email+"&token="+this.token).subscribe(
  success=>{
    this.openSnackBar("Successfull","Reset Password");
  },
  error=>{
    this.openSnackBar(error.toString(),"reset password");
  }
)

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
      userName:['',
        [Validators.required,Validators.email,Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$')]],
      password:['',
        [Validators.required,Validators.pattern('^([a-z0-9]+)')]],
      confirm:['',
        [Validators.required,Validators.pattern('^([a-z0-9]+)')]]});
this.email=this.route.snapshot.queryParamMap.get("email");
this.token=this.route.snapshot.queryParamMap.get("token");
  }

}
