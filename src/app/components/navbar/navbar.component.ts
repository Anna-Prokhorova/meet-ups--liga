import { Component, Input, OnInit} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  event$ 
  public currentRoute: string = '/';
  isDark: Boolean = false;
  constructor(public authService: AuthService, public router: Router, public themeService: ThemeService) {
    this.event$
      =this.router.events
          .subscribe(
            (event) => {
              if(event instanceof NavigationEnd) {
                this.currentRoute = router.url;
              }
            });
   }

  public get isAuth(): string | null {
    return this.authService.token
  }

  public get isAdmin() {
    return this.authService.user?.roles[0].id === 1 && this.authService.user !== null
  }

  ngOnInit(): void {
    console.log(this.router.url);
    this.themeService.isDarkOn().subscribe((data) => this.isDark = data)
  }

  public changeFilter(event: Event) {
    (event.target as HTMLElement).classList.add("_active")
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }
}
