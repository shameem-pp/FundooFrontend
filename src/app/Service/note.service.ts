import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {environment} from './../../environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }
  
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${localStorage.token}`)
  }


  getAllNote(path:string){
    return this.http.get(environment.baseUrl+path,this.header)
  }

  createNote(data:object,path:string){
    return this.http.post(environment.baseUrl+path,data,this.header);
  }

  archiveNote(data:number,path:string){
    return this.http.put(environment.baseUrl+path,data);
  }

  addReminder(data:string,path:string){
    return this.http.put(environment.baseUrl+path,data);
  }
}
