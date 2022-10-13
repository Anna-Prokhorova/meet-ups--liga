import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchValue: string = '';
  public filterValue: string = '';
  constructor( public searchService: SearchService) { }

  ngOnInit(): void {
  }

}
