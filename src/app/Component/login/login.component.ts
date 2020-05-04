import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:FormGroup;
  constructor(private fb:FormBuilder) { }
validation(){
  
}
  ngOnInit(): void {
    this.user =this.fb.group({
      userName:['',
        [Validators.required,Validators.email]],
      password:['',
        Validators.required]});
  }

}
