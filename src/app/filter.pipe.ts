import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './Models/note';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(notes: Note[], searchText: string): Note[] {
    searchText = searchText.toLowerCase();
    if (!notes || !searchText) {
      return null;
    }
    else {
      return notes.filter(note => note.description!=null? note.description.toLowerCase().indexOf(searchText)!==-1:null || note.title!=null? note.title.toLowerCase().indexOf(searchText) !== -1:null)
    }
  }
}
    // if (!notes || !searchText){
    //   return [];
    // }
    //   return notes.filter(note => {
    //     if(note['title']!=null){
    //    note.title.toLowerCase().includes(searchText)
    //     }
    //     else if(note['description']!=null){
    //         note.description.toLowerCase().includes(searchText)
    //         // return notes['title']!=null? note.title.toLowerCase().includes(searchText.toLowerCase()) : null || notes['description']!=null? :null;
    //     }
    //   });