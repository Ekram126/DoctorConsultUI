import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layoutservices/layout.service';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { EditRequestVM, ListRequestVM } from 'src/app/shared/models/requestVM';
import { ViewrequestComponent } from 'src/app/features/requests/viewrequest/viewrequest.component';
import { DialogService } from 'primeng/dynamicdialog';

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
  unreadNotificationsCount: number = 0;
  lstRequests: ListRequestVM[] = [];
  editRequestObj: EditRequestVM;
  showDropdown = false;
  dropdownPosition = { x: 0, y: 0 };


  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;





  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



  constructor(public layoutService: LayoutService, public translate: TranslateService, private requestService: RequestService,
    public dialogService: DialogService, private authenticationService: AuthenticationService, private reloadPageService: ReloadPageService) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.editRequestObj = { id: 0, isRead: false }
    if (this.currentUser == null)
      this.helloUser = "Hello Guest";
    else
      this.helloUser = "Hello " + this.currentUser.userName;

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

    requestService.getUnreadNotificationsCount(this.currentUser.id, this.currentUser.specialityId).subscribe({
      next: (items) => {
        this.unreadNotificationsCount = items.count;
        this.lstRequests = items.results;
      }
    });

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



  showNotifications(event: MouseEvent): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      this.dropdownPosition = { x: rect.left, y: rect.bottom };
    }
  }
  viewRequest(requestId: number) {
    this.editRequestObj.id = requestId;
    this.editRequestObj.isRead = true;
    this.requestService.updateIsReadRequest(this.editRequestObj).subscribe({
      next: (reqObj) => {

      }
    });
    const dialogRef2 = this.dialogService.open(ViewrequestComponent, {
      header: this.lang == "en" ? 'View Ticket' : "بيان السؤال",
      width: '70%',
      data: {
        reqId: requestId
      },
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 20
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.reloadPageService.reload();
    });



  }
}
