import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private service:UserService,private snackBar: MatSnackBar) { }

validation(){
  let data={
    email:this.valueOfInputField('userName'),
    password:this.valueOfInputField('password')
  }

  this.service.loginAction(data,"api/Account/Login").subscribe(
    success=>{
      this.openSnackBar("Successfull","Login");
      this.router.navigate(['/fundoo']);
    },
    error=>{
      this.openSnackBar(error.toString(),"Login");
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
      userName:['',
        [Validators.required,Validators.email,Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$')]],
      password:['',
        [Validators.required,Validators.pattern('^([a-z0-9])')]]});
  }

}
