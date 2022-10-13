import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.user) {
      if (this.authService.user?.roles.map((e: { id: any; }) => e.id).includes(1)) {return true}
      else {
        alert('Ты должен быть админом чтобы войти сюда')
        this.router.navigate(['meetups']);
        return false;
      }
    }
    else {
      alert('Ты должен быть админом чтобы войти сюда')
      this.router.navigate(['']);
      return false;
    }
  }
  
}
