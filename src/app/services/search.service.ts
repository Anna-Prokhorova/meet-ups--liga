import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  changeSeach = new BehaviorSubject<string>('');
  changeFilter = new BehaviorSubject<string>('');
  constructor() { }

  public setfilterValue(val: string){
    this.changeFilter.next(val)
  }

  public setsearchValue(val: string){
    this.changeSeach.next(val)
  }

  public getfilterValue() {
    return this.changeFilter.pipe(distinctUntilChanged())
  }

  public getsearchValue() {
    return this.changeSeach.pipe(debounceTime(500),distinctUntilChanged())
  }
}
