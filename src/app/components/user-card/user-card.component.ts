import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { IRole } from 'src/app/entities/role';
import { IUser } from 'src/app/entities/user';
import { ThemeService } from 'src/app/services/theme.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  public disable: boolean = true;
  public isDark: Boolean = false;

  @Input()
  user!: IUser;

  @Input()
  users!: IUser[] | null | undefined;
  userForm!: FormGroup;
  constructor(private usersService: UsersService, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(`${this.user.email}`, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(`${this.user.password}`, [
        Validators.required,
      ]),
      role: new FormControl(
        `${
          this.user.roles.map((e) => e.id).includes(1)
            ? 'ADMIN'
            : this.user.roles.map((e) => e.id).includes(2)
            ? 'USER'
            : ''
        }`,
        [Validators.required]
      ),
    });

    this.userForm.controls['email'].disable();
    this.userForm.controls['password'].disable();
    this.userForm.controls['role'].disable();

    this.themeService.isDarkOn().subscribe((data) => this.isDark = data)
  }

  public edit() {
    this.disable = !this.disable;
    if (this.disable) {
      this.userForm.controls['email'].disable();
      this.userForm.controls['password'].disable();
      this.userForm.controls['role'].disable();
    } else {
      this.userForm.controls['email'].enable();
      this.userForm.controls['password'].enable();
      this.userForm.controls['role'].enable();
    }
  }

  public cancel() {
    this.edit();
    this.userForm.controls['email'].setValue(`${this.user.email}`);
    this.userForm.controls['password'].setValue(`${this.user.password}`);
    this.userForm.controls['role'].setValue(`${
      this.user.roles.map((e) => e.id).includes(1)
        ? 'ADMIN'
        : this.user.roles.map((e) => e.id).includes(2)
        ? 'USER'
        : ''
    }`);
  }

  public deleteUser(user: IUser) {
    this.usersService
      .deleteUser(user)
      .subscribe(() => this.usersService.updateUsers());
  }

  public editUser(user: IUser) {
    const roles =
      this.userForm.controls['role'].value === 'ADMIN'
        ? ['ADMIN', 'USER']
        : this.userForm.controls['role'].value === 'USER'
        ? ['USER']
        : [];
    if ( //если все новое
      (user.email !== this.userForm.controls['email'].value ||
        user.password !== this.userForm.controls['password'].value) &&
      `${
        this.user.roles.map((e) => e.id).includes(1)
          ? 'ADMIN'
          : 'USER'
      }` !== this.userForm.controls['role'].value
    ) {
      forkJoin({
        updateUsers: this.usersService.updateUser(user, {
          email: this.userForm.controls['email'].value,
          password: user.password !== this.userForm.controls['password'].value ? this.userForm.controls['password'].value : '',
          fio: user.fio,
        }),
        updateRoles: this.usersService.addRole({
          names: roles,
          userId: user.id,
        }),
      }).subscribe((data) => this.usersService.updateUsers());
    } else if ( //если пароль и почта новые
      user.email !== this.userForm.controls['email'].value ||
      user.password !== this.userForm.controls['password'].value
    ) {
      this.usersService
        .updateUser(user, {
          email: this.userForm.controls['email'].value,
          password: user.password !== this.userForm.controls['password'].value ? this.userForm.controls['password'].value : '',
          fio: user.fio,
        })
        .subscribe((data) => this.usersService.updateUsers());
    } else if ( // если роль новая
      `${
        this.user.roles.map((e) => e.id).includes(1)
          ? 'ADMIN'
          : this.user.roles.map((e) => e.id).includes(2)
          ? 'USER'
          : ''
      }` !== this.userForm.controls['role'].value
    ) {
      this.usersService
        .addRole({
          names: roles,
          userId: user.id,
        })
        .subscribe((data) => this.usersService.updateUsers());
    }
  }
}
