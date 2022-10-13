import { Component, OnDestroy, OnInit } from '@angular/core';
import { async, filter, map, Observable, Subscription } from 'rxjs';
import { IMeetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-my-meetups',
  templateUrl: './my-meetups.component.html',
  styleUrls: ['./my-meetups.component.scss'],
})
export class MyMeetupsComponent implements OnInit, OnDestroy {

  myMeetups!: Array<IMeetup>;
  sub!: Subscription;
  loading: Boolean = false;

  constructor(
    public meetupsService: MeetupsService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    //this.meetupsService.getMeetups().subscribe((data: IMeetup[]) => this.myMeetups = data);
    this.loading = true;
    setTimeout(() => {
      this.sub = this.meetupsService
      .getMeetups()
      .subscribe((data) => {this.myMeetups = data as Array<IMeetup>; this.loading = false});
    }, 700)
  }

  public get filteredMeetups(): Array<IMeetup> {
    return this.myMeetups?.filter((e) => {return e.createdBy === this.authService.user.id})
  }

  ngOnDestroy(): void {
    this.meetupsService.getMeetups().subscribe(data => {this.myMeetups = data}).unsubscribe()
  }
}
