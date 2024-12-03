import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layoutservices/layout.service';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUser: LoggedUser;
  helloUser: string;
  items!: MenuItem[];
  textDir: string = '';
  lang: any;
  direction = localStorage.getItem('dir');

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, public translate: TranslateService, 
    private route: Router, private authenticationService: AuthenticationService,private reloadPageService: ReloadPageService) {
    this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser == null)
      this.helloUser = "Hello Guest";
    else
      this.helloUser = "Hello " + this.currentUser.userName;
console.log(this.helloUser )


      
    translate.addLangs(['en', 'ar']);

    if (localStorage.getItem("lang") != null || localStorage.getItem("lang") != "") {

      this.lang = localStorage.getItem("lang");
      localStorage.setItem('lang', this.lang);
      localStorage.setItem('dir', this.textDir);
      this.translate.use(this.lang);
    }
    else {
      this.lang = 'en';
      this.textDir = 'ltr';
      this.translate.setDefaultLang('en');
      localStorage.setItem('lang', 'en');
      localStorage.setItem('dir', 'ltr');
    }
  }

  switchWebLang(lang: string) {
    this.textDir = '';
    if (lang == 'en') {
      this.textDir = 'ltr';
    } if (lang == 'ar') {
      this.textDir = 'rtl';
    }

    localStorage.setItem('lang', lang);
    localStorage.setItem('dir', this.textDir);
    this.translate.use(lang);
    this.reloadPageService.reload();
  }


  switchLang(lang: string) {
    this.textDir = '';
    if (lang == 'en') {
      this.textDir = 'ltr';
    } if (lang == 'ar') {
      this.textDir = 'rtl';
    }

    localStorage.setItem('lang', lang);
    localStorage.setItem('dir', this.textDir);
    this.translate.use(lang);
    this.reloadPageService.reload();
  }
  logout() {
    this.authenticationService.logout();
  }

}
