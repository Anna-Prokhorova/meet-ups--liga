import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public login!: string;
  public password!: string;
  public authForm: FormGroup;
  public isDark: Boolean = false;
  constructor(public auth: AuthService,public themeService: ThemeService) { 
    this.authForm = new FormGroup({
      "login": new FormControl('',[Validators.required, Validators.email]),
      "password": new FormControl('',[Validators.required])
  })
   }

  ngOnInit(): void {
    this.themeService.isDarkOn().subscribe((data) => this.isDark = data)
  }

  loginAuth() {
    this.auth.login(this.authForm.controls["login"].value, this.authForm.controls["password"].value).subscribe((data) => console.log(data));
  }
}
