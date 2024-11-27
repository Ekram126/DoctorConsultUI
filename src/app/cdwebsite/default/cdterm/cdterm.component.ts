import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { EditSectionVM } from 'src/app/shared/models/sectionVM';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'app-cdterm',
  templateUrl: './cdterm.component.html',
  styleUrls: ['./cdterm.component.scss']
})
export class CdtermComponent {
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  contactSection: EditSectionVM;
  safeHtml: SafeHtml;

  constructor( private sectionService: SectionService,private sanitizer: DomSanitizer) {
    this.contactSection = { brief: '',briefAr:'',id:0,sectionImg:'', title:'',titleAr:'',sectionDesc:'',sectionDescAr:'',isInAbout:false}


    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);


    this.sectionService.GetSectionById(8).subscribe((data) => {
      this.contactSection = data;
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
        this.lang === 'en' ? this.contactSection.brief : this.contactSection.briefAr
      );
    });
  }

}
