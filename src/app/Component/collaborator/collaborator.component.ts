import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  email:string=localStorage.getItem('email');
  profilePic:string=localStorage.getItem('profilePic');
  name:string=localStorage.getItem('name');
  constructor() { }

  ngOnInit(): void {
  }

}
