import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddrequestComponent } from 'src/app/features/requests/addrequest/addrequest.component';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { CdcreatepatientComponent } from '../cdcreatepatient/cdcreatepatient.component';

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

  constructor(private authenticationService: AuthenticationService,  private reloadService: ReloadPageService,private dialogService: DialogService,private route: Router, public translate: TranslateService, private reloadPageService: ReloadPageService) {

    this.currentUser = this.authenticationService.currentUserValue;



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
