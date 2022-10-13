import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isDark: Boolean = false;
  constructor(public themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.isDarkOn().subscribe((data) => this.isDark = data)
  }

}
