import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UserService} from './../../Service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
user:FormGroup;

  constructor(private fb:FormBuilder,private service:UserService,private snackBar: MatSnackBar,private router:Router) { }

  validation(){
    let data={
      firstName:this.valueOfInputField('firstName'),
      lastName:this.valueOfInputField('lastName'),
      email:this.valueOfInputField('userName'),
      password:this.valueOfInputField('password')
    }
    this.service.registrationAction(data,"api/account/AddUser").subscribe(
      response=>{
     this.openSnackBar("successfull","Registration");
     this.router.navigate(['/login'])
    },
    error => {
      this.openSnackBar(error.toString(),"Registration");

    });
  }

  valueOfInputField(inputElement:string){
    return this.user.get(inputElement).value;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.user =this.fb.group({
      firstName:['',
        Validators.required],
      lastName:['',
        Validators.required],
      userName:['',
        [Validators.required,Validators.email]],
      password:['',
        Validators.required],
      confirm:['',
        Validators.required]});
  }

}
