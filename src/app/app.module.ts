import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetupCardComponent } from './components/meetup-card/meetup-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { MeetupsComponent } from './pages/meetups/meetups.component';
import { UsersComponent } from './pages/users/users.component';
import { AboutComponent } from './pages/about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { UsersGuard } from './guards/users.guard';
import { MeetupsGuard } from './guards/meetups.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MyMeetupsComponent } from './pages/my-meetups/my-meetups.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverlayRef } from '@angular/cdk/overlay';
import { SearchComponent } from './components/search/search.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';


const appRoutes: Routes =[
  { path: '', component: AuthComponent, canActivate: [AuthGuard]},
  { path: 'meetups', component: MeetupsComponent, canActivate: [MeetupsGuard]},
  { path: 'my-meetups', component: MyMeetupsComponent, canActivate: [MeetupsGuard]},
  { path: 'users', component: UsersComponent, canActivate: [UsersGuard] },
  { path: 'about', component: AboutComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    MeetupCardComponent,
    NavbarComponent,
    AuthComponent,
    MeetupsComponent,
    UsersComponent,
    AboutComponent,
    UserCardComponent,
    MyMeetupsComponent,
    FooterComponent,
    ModalFormComponent,
    ModalUserComponent,
    SearchComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },{ 
    provide: MatDialogRef,
    useValue: []
    }, 
    { 
    provide: MAT_DIALOG_DATA, 
    useValue: [] 
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
