import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import * as moment from 'moment';
import { IMeetup } from 'src/app/entities/meetup';
import { MeetupsService } from 'src/app/services/meetups.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
  meetupForm : FormGroup;
  constructor(public dialogRef: MatDialogRef<ModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {meetupItem: IMeetup} | null, private meetupsService: MeetupsService) { 
      this.meetupForm = new FormGroup({
        "name": new FormControl(`${data ? data.meetupItem.name : ''}`,[Validators.required]),
        "description": new FormControl(`${data ? data.meetupItem.description : ''}`,[Validators.required]),
        "date": new FormControl(`${data ? moment.utc(data.meetupItem.time).format('YYYY-MM-DD') : ''}`,[Validators.required]),
        "time": new FormControl(`${data ? moment.utc(data.meetupItem.time).format('HH:mm'): ''}`,[Validators.required]),
        "location": new FormControl(`${data ? data.meetupItem.location : ''}`,[Validators.required]),
        "target_audience": new FormControl(`${data ? data.meetupItem.target_audience : ''}`,[Validators.required]),
        "need_to_know": new FormControl(`${data ? data.meetupItem.need_to_know : ''}`,[Validators.required]),
        "will_happen": new FormControl(`${data ? data.meetupItem.will_happen : ''}`,[Validators.required]),
        "reason_to_come": new FormControl(`${data ? data.meetupItem.reason_to_come : ''}`,[Validators.required])
    });
    }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  saveMeetup() {
    if (this.data) {
      this.meetupsService.editMeetup(this.data.meetupItem, {name: this.meetupForm.controls['name'].value,
      description: this.meetupForm.controls['description'].value,
      time: new Date(this.meetupForm.controls['date'].value +' '+ this.meetupForm.controls['time'].value).toISOString(),
      duration: 0,
      location: this.meetupForm.controls['location'].value,
      target_audience: this.meetupForm.controls['target_audience'].value,
      need_to_know: this.meetupForm.controls['need_to_know'].value,
      will_happen: this.meetupForm.controls['will_happen'].value,
      reason_to_come: this.meetupForm.controls['reason_to_come'].value
    }).subscribe((data) => {this.meetupsService.updateMeetups(); this.dialogRef.close()})
    }
    else{
      this.meetupsService.createMeetup({name: this.meetupForm.controls['name'].value,
      description: this.meetupForm.controls['description'].value,
      time: new Date(this.meetupForm.controls['date'].value +' '+ this.meetupForm.controls['time'].value).toISOString(),
      duration: 0,
      location: this.meetupForm.controls['location'].value,
      target_audience: this.meetupForm.controls['target_audience'].value,
      need_to_know: this.meetupForm.controls['need_to_know'].value,
      will_happen: this.meetupForm.controls['will_happen'].value,
      reason_to_come: this.meetupForm.controls['reason_to_come'].value
    }).subscribe((data) => {this.meetupsService.updateMeetups(); this.dialogRef.close()});
    }
  }

  deleteMeetup() {
    if (this.data) {
      this.meetupsService.deleteMeetup(this.data.meetupItem).subscribe(() => {this.meetupsService.updateMeetups(); this.dialogRef.close()})
    }
    this.dialogRef.close();
  }
}



