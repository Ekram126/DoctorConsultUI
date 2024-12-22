import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateContactUsVM } from 'src/app/shared/models/contactUsVM';
import { PersonalDataVM } from 'src/app/shared/models/personaldataVM';
import { EditSectionVM } from 'src/app/shared/models/sectionVM';
import { ContactUsService } from 'src/app/shared/services/contactUs.service';
import { PersonalDataService } from 'src/app/shared/services/personaldata.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdcontact',
  templateUrl: './cdcontact.component.html',
  styleUrls: ['./cdcontact.component.scss']
})
export class CdcontactComponent {
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  contactObj: CreateContactUsVM;
  display: boolean = false;
  errorMessage: string;
  errorDisplay: boolean = false;
  personalObj: PersonalDataVM;
  contactSection: EditSectionVM;
  constructor(private ref: DynamicDialogRef,private contactUsService: ContactUsService, private personalDataService: PersonalDataService, private sectionService: SectionService) {
    this.contactObj = { message: '', email: '', fullName: '', phone: '' }


    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);

    this.personalObj = { address: '', addressAr: '', email: '', mobile: '', whatsApp: '' }

    this.personalDataService.GetPersonalData().subscribe({
      next: (item) => {
        this.personalObj = item;
      }
    });



    this.sectionService.GetSectionById(5).subscribe((data) => {
      this.contactSection = data;

      if (this.contactSection.sectionImg != null && this.contactSection.sectionImg != "")
        this.contactSection.sectionImg= `${environment.Domain}UploadedAttachments/SectionImages/` + this.contactSection.sectionImg;
      else if (this.contactSection.sectionImg == null)
        this.contactSection.sectionImg =       "../../../../assets/images/unknownSection.png";
      else if (this.contactSection.sectionImg == "")
        this.contactSection.sectionImg =   "../../../../assets/images/unknownSection.png";
    });
  }

  onSubmit() {
    let hasError = false;

    const phoneValidation = ValidationService.validatePhoneNumber(this.contactObj.phone, this.lang);
    if (!phoneValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = phoneValidation.errorMessage;
      return;
    }

    const emailValidation = ValidationService.validateEmail(this.contactObj.email, this.lang);
    if (!emailValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = emailValidation.errorMessage;
      return;
    }
    if (this.lang == "ar") {
      if (this.contactObj.fullName == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل الاسم';
        hasError = true; // Set error flag
      }
      if (this.contactObj.message == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل الرسالة';
        hasError = true; // Set error flag
      }
      if (!hasError) {
        this.contactUsService.CreateContactUs(this.contactObj).subscribe(saved => {
          this.display = true;
        });
      }
    }
    if (this.lang == "en") {
      if (this.contactObj.fullName == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert name';
        hasError = true; // Set error flag
      }
      if (this.contactObj.message == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert message';
        hasError = true; // Set error flag
      }
      if (!hasError) {
        this.contactUsService.CreateContactUs(this.contactObj).subscribe(saved => {
          this.display = true;
        });
      }
    }
  }

  closeDialogue() {
    this.ref.close();
  }
}
