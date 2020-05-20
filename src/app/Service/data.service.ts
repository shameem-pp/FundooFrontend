import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
private content=new BehaviorSubject<any>('20%');
private contentMargin=new BehaviorSubject<any>('2% 20%');
public shareMargin=this.contentMargin.asObservable();
public share=this.content.asObservable();
  constructor() { }
  updateData(text){
    this.content.next(text);
  }
  
  updateMargin(text){
    this.contentMargin.next(text);
  }
}
