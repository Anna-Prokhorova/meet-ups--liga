import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { ModalUserComponent } from '../modal-user/modal-user.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  event$ 
  public currentRoute: string = '/';
  public modalHidden:Boolean = true;
  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog) {
    this.event$
      =this.router.events
          .subscribe(
            (event) => {
              if(event instanceof NavigationEnd) {
                this.currentRoute = router.url;
              }
            });
   }

  ngOnInit(): void {
  }

  showModal () {
    this.dialog.open(ModalFormComponent);
  }

  showModalUser () {
    this.dialog.open(ModalUserComponent);
  }

}
