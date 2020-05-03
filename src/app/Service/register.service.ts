import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
public registration(data:object){
    return this.http.post('https://localhost:44334/api/account/AddUser',data);
}
  constructor(private http:HttpClient) { }
}
