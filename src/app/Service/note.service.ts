import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {environment} from './../../environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }
  
  header = new HttpHeaders().set(
    "Authorization",
     localStorage.getItem("token")
  );

  createNote(data:object,path:string){
    this.http.post(environment.baseUrl+path,data,{headers:this.header});
  }
}
