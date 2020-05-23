import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { map } from  'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpService,private httpServivice:HttpClient) { }

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

  uploadProfilePic(path:string,data){
    return this.httpServivice.post(environment.baseUrl+path,data,{
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }

}
