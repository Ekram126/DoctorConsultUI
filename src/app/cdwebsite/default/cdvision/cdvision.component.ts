import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditSectionVM } from 'src/app/shared/models/sectionVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cdvision',
  templateUrl: './cdvision.component.html',
  styleUrls: ['./cdvision.component.scss']
})
export class CdvisionComponent {
  currentUser: LoggedUser;
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  
  sectionObj: EditSectionVM;
  safeHtml: SafeHtml;
  constructor(private authenticationService: AuthenticationService,  private sectionService: SectionService, private sanitizer: DomSanitizer) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {

    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);

 
    this.sectionService.GetSectionById(5).subscribe((data) => {
      this.sectionObj = data;
    
      if (this.sectionObj.sectionImg != null && this.sectionObj.sectionImg != "")
        this.sectionObj.sectionImg= `${environment.Domain}UploadedAttachments/SectionImages/` + this.sectionObj.sectionImg;
      else if (this.sectionObj.sectionImg == null)
        this.sectionObj.sectionImg =       "../../../../assets/images/unknownSection.png";
      else if (this.sectionObj.sectionImg == "")
        this.sectionObj.sectionImg =   "../../../../assets/images/unknownSection.png";


      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.lang === 'en' ? this.sectionObj.brief : this.sectionObj.briefAr
      );
    });
  }

}
