import { Component, ElementRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditSectionVM, ListSectionVM } from 'src/app/shared/models/sectionVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editsection',
  templateUrl: './editsection.component.html',
  styleUrls: ['./editsection.component.scss']
})
export class EditsectionComponent {
  currentUser: LoggedUser;
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  sectionObj: EditSectionVM;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  sectionId: number;
  isChecked = false;



  isAdmin: boolean = false;
  lstRoleNames: string[] = [];

  imgURL: string = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  imagePath: any = "";

  editorConfig: AngularEditorConfig = {
    sanitize: false,
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    private authenticationService: AuthenticationService, private sectionService: SectionService, private config: DynamicDialogConfig, private ref: DynamicDialogRef,
    private reloadService: ReloadPageService, private uploadService: UploadFilesService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }



  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });

      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
    }

    this.sectionObj = { title: '', titleAr: '', brief: '', briefAr: '', sectionImg: '', id: 0, sectionDesc: '', sectionDescAr: '',isInAbout:false };




    let id = this.config.data.id;
    this.sectionId = id;
    this.sectionService.GetSectionById(id).subscribe((data) => {
      this.sectionObj = data;

      this.isChecked  = data.isInAbout;

      this.sectionId = this.sectionObj.id;

      if (this.sectionObj.sectionImg == null) {
        this.imgURL = '../assets/images/unknownSection.png';
      }
      else if (this.sectionObj.sectionImg == "") {
        this.imgURL = '../assets/images/unknownSection.png';
      }
      else {
        this.imgURL = `${environment.Domain}UploadedAttachments/SectionImages/` + data["sectionImg"];

      }
    });
  }




  onSubmit() {

    let hasError = false;
    if (this.file) {
      this.sectionObj.sectionImg = this.file.name;
    }
    else {
      this.sectionObj.sectionImg = this.sectionObj.sectionImg;
    }



    if (this.lang == "en") {
      if (this.sectionObj.title == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert title.';
        hasError = true; // Set error flag
      }
      if (this.sectionObj.titleAr == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert arabic title.';
        hasError = true; // Set error flag
      }

      if (!hasError) {
        this.saveArticle();
      }
    }
    if (this.lang == "ar") {
      if (this.sectionObj.title == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل العنوان';
        hasError = true; // Set error flag
      }
      if (this.sectionObj.titleAr == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل العنوان بالعربي';
        hasError = true; // Set error flag
      }

      if (!hasError) {
        this.saveArticle();
      }
    }
  }

  saveArticle() {
    this.sectionService.UpdateSection(this.sectionObj).subscribe(assetObj => {
      if (this.file) {
        this.sectionService.UpdateSectionImageAfterInsert(this.sectionObj).subscribe(master => {
          this.uploadService.uploadSectionImage(this.file, this.file.name).subscribe(
            (event) => {
              this.display = true;
              //  this.ref.close();
            },
            (e) => {
              this.errorDisplay = true;
              if (e.error.status == 'img') {
                if (this.lang == 'en') {
                  this.errorMessage = e.error.message;
                }
                else if (this.lang == 'ar') {
                  this.errorMessage = e.error.messageAr;
                }
              }
              else {
                this.errorMessage = 'Could not upload the file:' + this.file.name;
              }
              return false;
            });
        });
      }
      else {
        this.display = true;
        this.ref.close();
      }


    },
      (error) => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.message;
          }
        }
        if (this.lang == 'ar') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.messageAr;
          }

        }
        return false;
      }
    );
  }

  onFileSelected(event: Event, fileInput: HTMLInputElement) {
    const files = (event.target as HTMLInputElement).files;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
    if (files && files.length > 0)
      this.file = files[0];

    if (this.file && allowedTypes.includes(this.file.type)) {
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        this.imagePath = reader.result;
        this.imgVisible = false;
        this.btnHidden = false;
      }
    }
  }
  resetFile() {
    this.upfile.nativeElement.value = "";
    this.imgVisible = true;
    this.btnHidden = true;
  }


}
