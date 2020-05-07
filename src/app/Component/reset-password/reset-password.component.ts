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
  loading:boolean=false;

  constructor(private fb:FormBuilder,private router: Router,private route: ActivatedRoute,private service:UserService,private snackBar: MatSnackBar) { }

  validation(){
    this.loading=true;
    let data={
      newPassword:this.valueOfInputField('password'),
      confirmPassword:this.valueOfInputField('confirm')
    }
this.service.resetPasswordAction(data,"api/Account/ResetPassword?email="+this.email+"&token="+this.token).subscribe(
  success=>{
    this.loading=false;
    this.openSnackBar("Successfull","Reset Password");
    this.router.navigate(['/login']);
  },
  error=>{
    this.openSnackBar(error.toString(),"reset password");
    this.loading=false;
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
      password:['',
        [Validators.required,Validators.pattern('^([a-z0-9]+)')]],
      confirm:['',
        [Validators.required,Validators.pattern('^([a-z0-9]+)')]]});
this.email=this.route.snapshot.queryParamMap.get("email");
this.token=this.route.snapshot.queryParamMap.get("token");
  }

}
