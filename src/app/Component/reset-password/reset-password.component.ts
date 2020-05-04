import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  user:FormGroup;
  constructor(private fb:FormBuilder) { }
  validation(){
    
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
