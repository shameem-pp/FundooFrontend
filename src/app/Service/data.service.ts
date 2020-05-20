import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../Models/note';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private contentSearch=new BehaviorSubject<string>('');
  public shareSearch=this.contentSearch.asObservable();
  private noteModel: Note;
  private contentNote=new BehaviorSubject<Note>(this.noteModel);
  public shareNote=this.contentNote.asObservable();
  private content = new BehaviorSubject<any>('20%');
  private contentMargin = new BehaviorSubject<any>('2% 20%');
  public shareMargin = this.contentMargin.asObservable();
  public share = this.content.asObservable();
  constructor() { }
  updateData(text) {
    this.content.next(text);
  }

  updateMargin(text) {
    this.contentMargin.next(text);
  }

  updateNote(note:Note){
    this.contentNote.next(note);
  }

  updateSearch(text:string){
    this.contentSearch.next(text);
  }
}
