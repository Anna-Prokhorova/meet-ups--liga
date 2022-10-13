import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public darkTheme = new BehaviorSubject<Boolean>(false)
  public value = false
  constructor() { }
  public setDarkTheme() {
    this.value = !this.value;
    this.darkTheme.next(this.value);
  }
  public isDarkOn() {
    return this.darkTheme
  }
}
