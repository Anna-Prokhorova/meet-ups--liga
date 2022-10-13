import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { IMeetup } from '../entities/meetup';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { deepEqual } from '../shared/deep-equal';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class MeetupsService {

  meetups: Observable<any> = this.http.get<Array<IMeetup>>(`${environment.backendOrigin}/meetup`);
  subject = new BehaviorSubject([]);
  interval: any;

  constructor(private http: HttpClient, private authService: AuthService) { 
    console.log('gigigi')
    this.updateMeetups();
    this.interval = setInterval(() => this.updateMeetups(),30000)
  }

  getMeetups(): Observable<Array<IMeetup>>{
    return this.subject.pipe(distinctUntilChanged((a,b) => {return deepEqual(a,b)}), tap(() => console.log('hehe')))
  }

  updateMeetups() {
    this.meetups.subscribe((data) => {this.subject.next(data); console.log('haha')})
  }

  updateMeetup(meetup: IMeetup) {
    return this.http.put<any>(`${environment.backendOrigin}/meetup`, {idMeetup: meetup.id, idUser: this.authService.user.id})
  }

  deleteUserFromMeetup(meetup: IMeetup) {
    return this.http.delete<any>(`${environment.backendOrigin}/meetup`, {body: {idMeetup: meetup.id, idUser: this.authService.user.id}})
  }

  createMeetup(meetup: any) {
    return this.http.post<any>(`${environment.backendOrigin}/meetup`, meetup)
  }

  editMeetup(meetup: IMeetup, newMeetup: any) {
    return this.http.put<any>(`${environment.backendOrigin}/meetup/${meetup.id}`,newMeetup)
  }

  deleteMeetup(meetup: IMeetup) {
    return this.http.delete<any>(`${environment.backendOrigin}/meetup/${meetup.id}`)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
