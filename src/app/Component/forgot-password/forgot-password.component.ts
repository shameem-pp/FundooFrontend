import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private fb:FormBuilder) { }
  user:FormGroup;
  ngOnInit(): void {
    this.user =this.fb.group({
      userName:['',[Validators.required,Validators.email]]});
  }
}
