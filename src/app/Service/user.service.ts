import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService) { }

  registrationAction(data:object,path:string){
    return this.http.post(data,path);
  }

  loginAction(data:object,path:string){
    return this.http.post(data,path);
  }

  forgotPasswordAction(data:object,path:string){
    return this.http.post(data,path);
  }

  resetPasswordAction(data:object,path:string){
    return this.http.post(data,path);
  }

  signOutAction(path:string){
    return this.http.get(path);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

}
