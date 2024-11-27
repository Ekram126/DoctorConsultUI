import { Component, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';

@Component({
  selector: 'app-dashpage',
  templateUrl: './dashpage.component.html',
  styleUrls: ['./dashpage.component.scss']
})
export class DashpageComponent implements OnInit  {
  lang = localStorage.getItem('lang');
  currentUser: LoggedUser;
  textDir: string = 'rtl';


  constructor(private authenticationService: AuthenticationService) {

    this.currentUser = this.authenticationService.currentUserValue;

    if (localStorage.getItem('lang') == null) {
      this.lang == 'en'
      this.textDir = 'ltr';
      localStorage.setItem('lang', this.lang);
      this.lang = localStorage.getItem('lang');
    }
    else {
      this.lang = localStorage.getItem('lang');
    }
  }

  ngOnInit(): void {
    if (this.lang == null) {
      this.lang == 'en'
      this.textDir = 'ltr';
    }
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }

  }
}
