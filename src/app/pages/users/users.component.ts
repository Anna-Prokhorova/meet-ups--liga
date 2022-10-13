import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/entities/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: Array<IUser>;
  sub!: Subscription;
  loading: Boolean = false;

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.sub = this.usersService.getUsers().subscribe((data) => {
        console.log(data);
        this.users = data as Array<IUser>;
        this.loading = false;
      });
    }, 700);
  }
}
