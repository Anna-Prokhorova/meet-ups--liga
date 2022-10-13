import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IMeetup } from 'src/app/entities/meetup';
import { AuthService } from 'src/app/services/auth.service';
import { MeetupsService } from 'src/app/services/meetups.service';
import { OpenedCardsService } from 'src/app/services/opened-cards.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ModalFormComponent } from '../modal-form/modal-form.component';


@Component({
  selector: 'app-meetup-card',
  templateUrl: './meetup-card.component.html',
  styleUrls: ['./meetup-card.component.scss']
})
export class MeetupCardComponent implements OnInit {

  public show: Boolean = false;
  public outdated!: Boolean;
  isDark: Boolean = false;

  @Input()
    meetup!: IMeetup;

  constructor(public authService: AuthService, public meetupsService: MeetupsService, public dialog: MatDialog, public openedCardsService: OpenedCardsService, public themeService: ThemeService) { }

  ngOnInit(): void {
    this.outdated = Date.now() > new Date(this.meetup.time).getTime();
    this.themeService.isDarkOn().subscribe((data) => this.isDark = data)
  }

  public showMore(meetup: IMeetup) {
    this.openedCardsService.addOpenedCard(meetup)
  }

  public showLess(meetup: IMeetup) {
    this.openedCardsService.removeOpenedCard(meetup)
  }

  public addFollower(meetup: IMeetup) {
    this.meetupsService.updateMeetup(meetup).subscribe(data => this.meetupsService.updateMeetups())
  }

  public deleteFollower(meetup: IMeetup) {
    this.meetupsService.deleteUserFromMeetup(meetup).subscribe(data => this.meetupsService.updateMeetups())
  }

  public check():Boolean {
    return (this.meetup.users.map((e) => e.id).includes(this.authService.user.id))
  }

  showModal (meetup: IMeetup) {
    this.dialog.open(ModalFormComponent, {data: {meetupItem: meetup}});
  }

  public deleteMeetup(meetup: IMeetup) {
    this.meetupsService.deleteMeetup(meetup).subscribe((data) => this.meetupsService.updateMeetups())
  }
}
