import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText:string;
  result: any;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.shareNote.subscribe(x=>this.result=x);
    this.dataService.shareSearch.subscribe(x=>this.searchText=x);
  }

}
