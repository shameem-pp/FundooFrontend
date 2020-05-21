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
  width: any;
  margin: any;
  
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.shareNote.subscribe(x=>this.result=x);
    this.dataService.shareSearch.subscribe(x=>this.searchText=x);
    this.dataService.share.subscribe(x=> this.width=x);
    this.dataService.shareMargin.subscribe(x=>this.margin=x);
  }

}
