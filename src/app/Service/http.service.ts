import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http:HttpClient) { }

  public post(data:object,path:string){
    return this.http.post(environment.baseUrl+path,data);
}
}
