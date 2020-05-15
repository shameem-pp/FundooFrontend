import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(private http:HttpClient) { }

  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${localStorage.token}`)
  }
  
  getAllLabel(path:string){
    return this.http.get(environment.baseUrl+path,this.header);
  }

  createLabel(path:string,data){
    return this.http.post(environment.baseUrl+path,data,this.header);
  }
}
