import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isDark: Boolean = false;
  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.isDarkOn().subscribe((data) => this.isDark = data)
  }
}
