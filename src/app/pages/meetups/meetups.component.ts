import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { IMeetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';
import { SearchService } from 'src/app/services/search.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss'],
})
export class MeetupsComponent implements OnInit {
  meetups!: Array<IMeetup>;
  sub!: Subscription;
  filter!: string;
  search!: string;
  loading: Boolean = false;

  constructor(
    public meetupsService: MeetupsService,
    private searchService: SearchService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loading = true
    setTimeout(() => {
      this.sub = this.meetupsService
      .getMeetups()
      .subscribe((data) => {this.meetups = data as Array<IMeetup>; this.loading = false; console.log('hoho')});
    }, 700)
    
    this.searchService
      .getfilterValue()
      .subscribe((data) => this.filter = data);
    this.searchService
      .getsearchValue()
      .subscribe((data) => this.search = data);
  }

  public searchMeetups() {
    const meetups = this.meetups?.filter(
      (el) =>
        el.name?.toLowerCase().includes(this.search?.toLowerCase()) ||
        el.description?.toLowerCase().includes(this.search?.toLowerCase()) ||
        el.owner.fio?.toLowerCase().includes(this.search?.toLowerCase())
    );
    if (this.filter === 'popular') {
      return meetups?.sort((el1, el2) => el2.users.length - el1.users.length)
    } else if (this.filter === 'soon') {
      return meetups?.sort((el1, el2) => {let f: Date = new Date(el2.time); let s: Date = new Date(el1.time); return f.getTime() - s.getTime()})
    } else if (this.filter === 'go') {
      console.log(meetups.filter((el) => el.users.map((e) => e.id).includes(this.authService.user.id)));
      return meetups?.filter((el) => el.users.map((e) => e.id).includes(this.authService.user.id))
    }
    return meetups?.sort((el1,el2) => new Date(el2.createdAt).getTime() - new Date(el1.createdAt).getTime())
  }
}
