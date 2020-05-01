import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  showLogin=false;
  login(){
this.showLogin=true;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
