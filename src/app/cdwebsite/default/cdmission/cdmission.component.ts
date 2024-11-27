import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditSectionVM, ListSectionVM } from 'src/app/shared/models/sectionVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdmission',
  templateUrl: './cdmission.component.html',
  styleUrls: ['./cdmission.component.scss']
})
export class CdmissionComponent {
  currentUser: LoggedUser;
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');

  lstSections: ListSectionVM[] = [];
  safeHtml: SafeHtml;
  arabicSafeHtml: SafeHtml;


  constructor(private authenticationService: AuthenticationService, private sectionService: SectionService, private sanitizer: DomSanitizer) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {

    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);



    this.sectionService.SelectSectionsInAbout().subscribe((data) => {
      this.lstSections = data;


      this.lstSections = data.map((element) => {
        if (element.sectionImg != null && element.sectionImg != "")
          element.sectionImg = `${environment.Domain}UploadedAttachments/SectionImages/` + element.sectionImg;
        else if (element.sectionImg == null)
          element.sectionImg = "../../../../assets/images/unknownSection.png";
        else if (element.sectionImg == "")
          element.sectionImg = "../../../../assets/images/unknownSection.png";

        
        // Sanitize HTML for each section item based on language content
        element.safeHtml = this.sanitizer.bypassSecurityTrustHtml(element.sectionDesc);
        element.arabicSafeHtml = this.sanitizer.bypassSecurityTrustHtml(element.sectionDescAr);
        
        return element;
      });



      // this.lstSections.forEach(element => {
      //   if (element.sectionImg != null && element.sectionImg != "")
      //     element.sectionImg = `${environment.Domain}UploadedAttachments/SectionImages/` + element.sectionImg;
      //   else if (element.sectionImg == null)
      //     element.sectionImg = "../../../../assets/images/unknownSection.png";
      //   else if (element.sectionImg == "")
      //     element.sectionImg = "../../../../assets/images/unknownSection.png";


        
      //   this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(element.brief);
      //   this.arabicSafeHtml = this.sanitizer.bypassSecurityTrustHtml(element.briefAr);
      // });

    });










  }
}
