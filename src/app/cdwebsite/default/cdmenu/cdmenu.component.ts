import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddrequestComponent } from 'src/app/features/requests/addrequest/addrequest.component';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { CdcreatepatientComponent } from '../cdcreatepatient/cdcreatepatient.component';
import { RequestService } from 'src/app/shared/services/request.service';
import { EditRequestVM, ListRequestVM } from 'src/app/shared/models/requestVM';
import { ViewrequestComponent } from 'src/app/features/requests/viewrequest/viewrequest.component';

@Component({
  selector: 'app-cdmenu',
  templateUrl: './cdmenu.component.html',
  styleUrls: ['./cdmenu.component.scss']
})
export class CdmenuComponent {

  currentUser: LoggedUser;
  textDir: string = '';
  lang: any;
  helloUser: string = "";
  lstRoleNames: string[] = [];
  isPatient: boolean = false;
  isGuest: boolean = false;
  isSupervisor: boolean = false;
  isDoctor: boolean = false;
  isAdmin: boolean = false;
  userRole: string = '';
  isLoggedIn: boolean = false;

    unreadNotificationsCount: number=0;
    lstRequests: ListRequestVM[] = [];
    editRequestObj :EditRequestVM;
    showDropdown = false;
    dropdownPosition = { x: 0, y: 0 };
    
  constructor(private requestService: RequestService,private authenticationService: AuthenticationService,  private reloadService: ReloadPageService,private dialogService: DialogService,private route: Router, public translate: TranslateService, private reloadPageService: ReloadPageService) {

    this.currentUser = this.authenticationService.currentUserValue;
    this.editRequestObj={id:0, isRead:false}


    translate.addLangs(['en', 'ar']);
    if (localStorage.getItem("lang") != null || localStorage.getItem("lang") != "") {

      this.lang = localStorage.getItem("lang");
      localStorage.setItem('lang', this.lang);
      localStorage.setItem('dir', this.textDir);
      this.translate.use(this.lang);

      if (this.lang == "en") {
        if (this.currentUser == null)
          this.helloUser = "";
        else
          this.helloUser = "Hello " + this.currentUser.userName;
      }
      if (this.lang == "ar") {
        if (this.currentUser == null)
          this.helloUser = "";
        else
          this.helloUser = "مرحبا" + this.currentUser.userName;
      }



    }
    else {
      this.lang = 'en';
      this.textDir = 'ltr';
      this.translate.setDefaultLang('en');
      localStorage.setItem('lang', 'en');
      localStorage.setItem('dir', 'ltr');


      if (this.lang == "en") {
        if (this.currentUser == null)
          this.helloUser = "Hello Guest";
        else
          this.helloUser = "Hello " + this.currentUser.userName;
      }
    }

          
    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));

      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
      this.isSupervisor = (['SupervisorDoctor'].some(r => this.lstRoleNames.includes(r)));
      this.isDoctor = (['Doctor'].some(r => this.lstRoleNames.includes(r)));


      requestService.getUnreadNotificationsCount(this.currentUser.id, this.currentUser.specialityId).subscribe({
        next: (items) => {
          this.unreadNotificationsCount = items.count;
          this.lstRequests = items.results;
        }
      });
    }


  
  }

  handleRegisterClick(){
    if (this.isPatient) {
      this.createRequest();
    } 
    else {
      this.registerPatient(); // Default action if no conditions are met
    }
  }

  createRequest() {
    const dialogRef2 = this.dialogService.open(AddrequestComponent, {
      header: this.lang == "en" ? 'Please Register for Consultation' :  "سجل هنا للتواصل مع الطبيب المختص",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",

      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.reloadService.reload();
    });
  }
  
  registerPatient() {
    const dialogRef2 = this.dialogService.open(CdcreatepatientComponent, {
      header: this.lang == "en" ? 'Register for Consultation' :  "سجل للتواصل مع الطبيب المختص",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.reloadService.reload();
    });
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
  logout() {
    this.authenticationService.logout();
    this.reloadPageService.reload();
  }
  login() {
    this.route.navigate(["/adminlog"])
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
}
