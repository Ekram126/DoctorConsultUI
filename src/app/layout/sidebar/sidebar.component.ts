import { Component, ElementRef, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { LayoutService } from 'src/app/shared/services/layoutservices/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  model: any[] = [];
  lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  lstRoleNames: string[] = [];

  isAdmin: boolean = false;
  isSupervisor: boolean = false;
  isDoctor: boolean = false;
  isPatient: boolean = false;
  constructor(public layoutService: LayoutService, public el: ElementRef, private authenticationService: AuthenticationService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {
    if (this.lang == "en") {
      this.model = [
        {
          items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dash'], roles: ['Admin', 'SupervisorDoctor', 'Doctor', 'Patient'] },
            { label: 'Specialists', icon: 'pi pi-fw pi-list', routerLink: ['/dash/specialists'], roles: ['Admin'] },
            { label: 'Articles', icon: 'pi pi-fw pi-clipboard', routerLink: ['/dash/articles'], roles: ['Admin'] },
            { label: 'Videos', icon: 'pi pi-fw pi-video', routerLink: ['/dash/videos'], roles: ['Admin'] },
            { label: 'Banners', icon: 'pi pi-fw pi-video', routerLink: ['/dash/banners'], roles: ['Admin'] },
            { label: 'Doctors', icon: 'pi pi-fw pi-users', routerLink: ['/dash/doctors'], roles: ['Admin', 'SupervisorDoctor'] },
            { label: 'Patients', icon: 'pi pi-fw pi-address-book', routerLink: ['/dash/patients'], roles: ['Admin'] },
            { label: 'Requests', icon: 'pi pi-fw pi-calendar-clock', routerLink: ['/dash/requests'], roles: ['Admin', 'Patient', 'SupervisorDoctor', 'Doctor'] },
            { label: 'Sections', icon: 'pi pi-fw pi-calendar-clock', routerLink: ['/dash/sections'], roles: ['Admin'] }
          ],
        }
      ];
    }
    if (this.lang == "ar") {
      this.model = [
        {
          items: [
            { label: 'الصفحة الرئيسية', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dash'], roles: ['Admin', 'SupervisorDoctor', 'Doctor', 'Patient'] },
            { label: 'التخصصات', icon: 'pi pi-fw pi-list', routerLink: ['/dash/specialists'], roles: ['Admin'] },
            { label: 'المقالات', icon: 'pi pi-fw pi-clipboard', routerLink: ['/dash/articles'], roles: ['Admin'] },
            { label: 'الفيديوهات', icon: 'pi pi-fw pi-video', routerLink: ['/dash/videos'], roles: ['Admin'] },
            { label: 'الإعلانات', icon: 'pi pi-fw pi-video', routerLink: ['/dash/banners'], roles: ['Admin'] },
            { label: 'الأطباء', icon: 'pi pi-fw pi-users', routerLink: ['/dash/doctors'], roles: ['Admin', 'SupervisorDoctor'] },
            { label: 'المرضى', icon: 'pi pi-fw pi-address-book', routerLink: ['/dash/patients'], roles: ['Admin'] },
            { label: 'طلبات النصيحة', icon: 'pi pi-fw pi-calendar-clock', routerLink: ['/dash/requests'], roles: ['Admin', 'Patient', 'SupervisorDoctor', 'Doctor'] },
            { label: 'الأقسام', icon: 'pi pi-fw pi-calendar-clock', routerLink: ['/dash/sections'], roles: ['Admin'] }
          ],
        }
      ];
    }

    if (this.currentUser) {
      this.lstRoleNames = this.currentUser.roleNames.map((element: any) => element.name);
      this.filterMenuItemsByRoles(this.model);
    }


    if (localStorage.getItem("lang") == null) {
      this.lang = 'en';
      this.textDir = "ltr";
    }
    if (localStorage.getItem('lang') == "en") {
      this.textDir = "ltr";
    }
    if (localStorage.getItem('lang') == "ar") {
      this.textDir = "rtl";
      this.lang = 'ar';
    }

  }

  filterMenuItemsByRoles(model: any) {

    this.model = this.model.map(menu => {
      const filteredItems = menu.items.filter(item => {
        const hasRole = item.roles.some(role => this.lstRoleNames.includes(role));
        return hasRole;
      });

      return {
        ...menu,
        items: filteredItems
      };
    }).filter(menu => menu.items.length > 0);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
