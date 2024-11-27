import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { CdcreatepatientComponent } from '../cdcreatepatient/cdcreatepatient.component';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AddrequestComponent } from 'src/app/features/requests/addrequest/addrequest.component';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { EditSectionVM, ViewSectionVM } from 'src/app/shared/models/sectionVM';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: LoggedUser;
  currentUser1: any;
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  lstRoleNames: string[] = [];


  isPatient: boolean = false;
  isSupervisor: boolean = false;
  isDoctor: boolean = false;
  isAdmin: boolean = false;
  userRole: string = '';
  isLoggedIn: boolean = false;

  topSection: EditSectionVM;
  topSectionImage: string = "";
  safeHtml: SafeHtml;


  aboutSection: EditSectionVM;
  aboutSectionImage: string = "";
  aboutbriefsafeHtml: SafeHtml;
  aboutdescsafeHtml: SafeHtml;






  constructor(private authenticationService: AuthenticationService, private dialogService: DialogService,
    private sectionService: SectionService, private sanitizer: DomSanitizer, private route: Router,
    private reloadService: ReloadPageService, public themeService: ThemeService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {

    this.aboutSection = { brief: '', briefAr: '', id: 0, sectionImg: '', title: '', titleAr: '', sectionDesc: '', sectionDescAr: '', isInAbout: false }
    this.topSection = { brief: '', briefAr: '', id: 0, sectionImg: '', title: '', titleAr: '', sectionDesc: '', sectionDescAr: '', isInAbout: false }


    const currentPage = window.location.pathname;
    if (currentPage.includes('frontend')) {
      const frontendStyles = document.createElement('link');
      frontendStyles.rel = 'stylesheet';
      frontendStyles.href = './assets/css/theme.css';
      document.head.appendChild(frontendStyles);
    }

    else if (currentPage.includes('dash')) {
      // Load backend styles
      const backendStyles = document.createElement('link');
      backendStyles.rel = 'stylesheet';
      backendStyles.href = './src/assets/styles/layout/layout.scss';
      document.head.appendChild(backendStyles);
    }


      if (this.currentUser) {
        this.currentUser["roleNames"].forEach(element => {
          this.lstRoleNames.push(element["name"]);
        });
        this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
        this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));
        this.isSupervisor = (['SupervisorDoctor'].some(r => this.lstRoleNames.includes(r)));
        this.isDoctor = (['Doctor'].some(r => this.lstRoleNames.includes(r)));
      }
    

    if (this.lang == undefined) {
      this.lang = "en";
      this.textDir = "ltr";
      localStorage.setItem('lang', this.lang);
      localStorage.setItem('dir', this.textDir);
    }




    this.sectionService.GetSectionById(1).subscribe((data) => {
      this.topSection = data;


      if (this.topSection.sectionImg != null && this.topSection.sectionImg != "")
        this.topSection.sectionImg = `${environment.Domain}UploadedAttachments/SectionImages/` + this.topSection.sectionImg;
      else if (this.topSection.sectionImg == null)
        this.topSection.sectionImg = "../../../../assets/images/unknownSection.png";
      else if (this.topSection.sectionImg == "")
        this.topSection.sectionImg = "../../../../assets/images/unknownSection.png";



      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.lang === 'en' ? this.topSection.brief : this.topSection.briefAr
      );
    });


    this.sectionService.GetSectionById(2).subscribe((data) => {
      this.aboutSection = data;


      this.aboutbriefsafeHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.lang === 'en' ? this.aboutSection.brief : this.aboutSection.briefAr
      );

      this.aboutdescsafeHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.lang === 'en' ? this.aboutSection.sectionDesc : this.aboutSection.sectionDescAr
      );

      if (this.aboutSection.sectionImg != null && this.aboutSection.sectionImg != "")
        this.aboutSection.sectionImg = `${environment.Domain}UploadedAttachments/SectionImages/` + this.aboutSection.sectionImg;
      else if (this.aboutSection.sectionImg == null)
        this.aboutSection.sectionImg = "../../../../assets/images/unknownSection.png";
      else if (this.aboutSection.sectionImg == "")
        this.aboutSection.sectionImg = "../../../../assets/images/unknownSection.png";
    });


  }

  registerPatient() {
    const dialogRef2 = this.dialogService.open(CdcreatepatientComponent, {
      header: this.lang == "en" ? 'Register for Consultation ' : "سجل للتواصل مع الطبيب المختص",
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


  createRequest() {
    const dialogRef2 = this.dialogService.open(AddrequestComponent, {
      header: this.lang == "en" ? 'Please Register for Consultation' : "سجل هنا للتواصل مع الطبيب المختص",
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



  handleRegisterClick() {
    if (this.isPatient) {
      this.createRequest();
    }
    else {
      this.registerPatient();
    }
  }

  aboutPage() {
    this.route.navigate(['mission']);
  }

  loadUserData() {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem('currentUser');

    if (userData) {
      this.currentUser = JSON.parse(userData);  // Parse the stored user object
    }
  }



}
