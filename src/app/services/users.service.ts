import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMeetup } from '../entities/meetup';
import { IUser } from '../entities/user';
import { deepEqual } from '../shared/deep-equal';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: Observable<any> = this.http.get<Array<IUser>>(`${environment.backendOrigin}/user`);
  subject = new BehaviorSubject([]);
  interval: any;

  constructor(private http: HttpClient) {
    console.log('init');
    this.updateUsers();
    this.interval = setInterval(() => this.updateUsers(),30000)
   }

   updateUsers() {
    this.users.subscribe((data) => {
      this.subject.next(data)})
}

  getUsers(){
    return this.subject.pipe(distinctUntilChanged((a,b) => {return deepEqual(a,b)}), tap(() => console.log('haha')))
}

  deleteUser(user: IUser) {
    return this.http.delete<any>(`${environment.backendOrigin}/user/${user.id}`)
  }

  createUser(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/registration`, user)
  }

  updateUser(user: IUser, newUser: any) {
    return this.http.put<any>(`${environment.backendOrigin}/user/${user.id}`, newUser)
  }

  addRole(roles: any) {
    return this.http.post<any>(`${environment.backendOrigin}/user/role`, roles)
  }

  ngOnDestroy() {
    console.log('destroy');
    clearInterval(this.interval);
  }
}
