import { DatePipe } from '@angular/common';
import {  Component, ElementRef } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditArticleVM } from 'src/app/shared/models/articleVM';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-editarticle',
  templateUrl: './editarticle.component.html',
  styleUrls: ['./editarticle.component.scss']
})
export class EditarticleComponent {
  currentUser: LoggedUser;
  public lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  articleObj: EditArticleVM;
  lstSpecialists: ListSpecialistVM[] = [];
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  articleId: number;
  articleDate: Date;
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
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    // sanitize: true,
    // toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize']
    // ]
  };
  constructor(
    private authenticationService: AuthenticationService, private articleService: ArticleService, private specialistService: SpecialistService,
    private config: DynamicDialogConfig, private ref: DynamicDialogRef, private datePipe: DatePipe, private reloadService: ReloadPageService,private uploadService: UploadFilesService) {
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

    this.articleObj = {
      articleContent: '', articleContentAr: '', articleImg: '', date: '', id: 0, isActive: false, orderId: 0, specialityId: 0, title: '', titleAr: '',articleDesc:'',articleDescAr:''
    };


    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });

    let id = this.config.data.id;
    this.articleId = id;
    this.articleService.GetArticleById(id).subscribe((data) => {
      this.articleObj = data;
      this.isChecked  = data.isActive;
    


      this.articleDate = new Date(data.date);
      this.articleId = this.articleObj.id;

      if (this.articleObj.articleImg == null) {
        this.imgURL = '../assets/images/unknownArticle.png';
      }
      else if (this.articleObj.articleImg == "") {
        this.imgURL = '../assets/images/unknownArticle.png';
      }
      else {
        this.imgURL = `${environment.Domain}UploadedAttachments/ArticleImages/` + data["articleImg"];
        
      }
    });
  }

  getArticleDate($event) {
    this.articleObj.date = this.datePipe.transform($event, "yyyy-MM-dd");
  }


  onSubmit() {

    let hasError = false;
    if (this.file) {
      this.articleObj.articleImg = this.file.name;
    }
    else {
      this.articleObj.articleImg = this.articleObj.articleImg;
    }

    if (this.articleObj.date == "")
      this.articleObj.date = this.datePipe.transform(new Date, "yyyy-MM-dd");


    if (this.lang =="en") {
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
      
      if (!hasError) {
        this.saveArticle();
      }
    }
    if (this.lang =="ar") {
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

      if (!hasError) {
        this.saveArticle();
      }
    }    
  }

  saveArticle(){
    this.articleService.UpdateArticle(this.articleObj).subscribe(assetObj => {
      if (this.file) {
        this.articleService.UpdateArticleImageAfterInsert(this.articleObj).subscribe(master => {
          this.uploadService.uploadArticleImage(this.file, this.file.name).subscribe(
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
      (e) => {
        this.errorDisplay = true;
        // if (this.lang == 'en') {
        //   if (error.error.status == 'code') {
        //     this.errorMessage = error.error.message;
        //   }
        // }
        // if (this.lang == 'ar') {
        //   if (error.error.status == 'code') {
        //     this.errorMessage = error.error.messageAr;
        //   }
        // }

         
        if (e.error.status == 'art') {
          if (this.lang == 'en') {
            this.errorMessage = e.error.message;
          }
          else if (this.lang == 'ar') {
            this.errorMessage = e.error.messageAr;
          }
        }
        return false;
      }
    );
  }

  onFileSelected(event:Event, fileInput: HTMLInputElement) {
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

  closeDialogue() {
    this.ref.close();
  }
}
