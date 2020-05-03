import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder,FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
user:FormGroup;
  validation(){
    
  }
  constructor(private fb:FormBuilder) { }

//   checkPasswords(group: FormGroup) {
//   let pass = group.get('password').value;
//   let confirmPass = group.get('confirmPass').value;

//   return pass === confirmPass ? null : { notSame: true }     
// }
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
