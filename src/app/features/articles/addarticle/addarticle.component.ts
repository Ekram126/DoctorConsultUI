import { DatePipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateArticleVM } from 'src/app/shared/models/articleVM';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';

@Component({
  selector: 'app-addarticle',
  templateUrl: './addarticle.component.html',
  styleUrls: ['./addarticle.component.scss']
})
export class AddarticleComponent {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  userObj: LoggedUser;
  currentUser: LoggedUser;

  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  articleObj: CreateArticleVM;
  articleId: number;
  lstSpecialists: ListSpecialistVM[] = [];

  imagePath: any = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  imageUrl: string = "";
  content: string = "";
  editorEnConfig: AngularEditorConfig = {
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
    ],
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [['bold', 'italic'],['fontSize'] ]
  };

  editorArConfig: AngularEditorConfig = {
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
    ],
    // uploadUrl: `${environment.Domain}api/Article/UploadArticleEditorImages`,
    // upload: (file: File) => {
    //  return this.uploadService.uploadImageByAngularEditor(file);
    // },
    //  uploadUrl: `${environment.Domain}api/Article/UploadArticleEditorImages`,
    // upload: (file: File) => {
    //  return this.uploadService.uploadImageByAngularEditor(file);
    // },
    uploadWithCredentials: false,

    toolbarPosition: 'top',
    //toolbarHiddenButtons: [['bold', 'italic'],['fontSize']]
  };



  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef, private articleService: ArticleService, private specialistService: SpecialistService, private datePipe: DatePipe, private uploadService: UploadFilesService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }






  ngOnInit(): void {
    this.articleObj = {
      articleContent: '', articleContentAr: '', articleImg: '', date: '', id: 0, isActive: false, orderId: 0, specialityId: 0, title: '', titleAr: '', artDate: new Date, articleDesc: '', articleDescAr: ''
    }

    this.userObj = { id: '', userName: '', token: '', roleNames: [], message: '', email: '', phoneNumber: '', passwordHash: '', specialityId: 0 };

    this.articleObj.artDate = new Date();

    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });
  }

  getArticleDate($event) {
    this.articleObj.date = this.datePipe.transform($event, "yyyy-MM-dd");
  }

  onSubmit() {

    let hasError = false;



    if (this.articleObj.date == "")
      this.articleObj.date = this.datePipe.transform(new Date, "yyyy-MM-dd");


    if (this.lang == "en") {
      if (this.articleObj.title == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert title.';
        hasError = true; // Set error flag
      }
      if (this.articleObj.titleAr == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert arabic title.';
        hasError = true; // Set error flag
      }
      if (this.articleObj.specialityId == 0) {
        this.errorDisplay = true;
        this.errorMessage = 'select speciality';
        hasError = true; // Set error flag
      }

      if (!hasError) {
        this.saveArticle();
      }
    }
    if (this.lang == "ar") {
      if (this.articleObj.title == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل العنوان';
        hasError = true; // Set error flag
      }
      if (this.articleObj.titleAr == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل العنوان بالعربي';
        hasError = true; // Set error flag
      }
      if (this.articleObj.specialityId == 0) {
        this.errorDisplay = true;
        this.errorMessage = 'اختر التخصص';
        hasError = true; // Set error flag
      }
      if (!hasError) {
        this.saveArticle();
      }
    }
  }

  saveArticle() {
    if (this.file) {
      this.articleObj.articleImg = this.file.name;
    }
    this.articleService.CreateArticle(this.articleObj).subscribe({
      next: (artObj) => {
        this.articleId = artObj.id;
        this.articleObj.id = this.articleId;
        if (this.file) {
          this.articleService.UpdateArticleImageAfterInsert(this.articleObj).subscribe(master => {
            this.uploadService.uploadArticleImage(this.file, this.file.name).subscribe(
              (event) => {
                this.display = true;
                this.ref.close();
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
      error: (e) => {
        this.errorDisplay = true;
        this.errorMessage = e.error.message;
        return false;
      },
      complete: () => console.info('complete')
    });
  }
  onFileSelected(event: Event, fileInput: HTMLInputElement) {
    const files = (event.target as HTMLInputElement).files;
    const allowedTypes = ['image/jpg','image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
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
  close() {
    this.ref.close();
  }
}
