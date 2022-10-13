import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'meet-ups--liga';
  constructor(public themeService: ThemeService){}

  changeTheme() {
    this.themeService.setDarkTheme()
    document.body.classList.toggle('_dark');
  }
}
