import { Component, ElementRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateSectionVM } from 'src/app/shared/models/sectionVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SectionService } from 'src/app/shared/services/section.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';

@Component({
  selector: 'app-addsection',
  templateUrl: './addsection.component.html',
  styleUrls: ['./addsection.component.scss']
})
export class AddsectionComponent {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;

  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  sectionObj: CreateSectionVM;
  sectionId: number;


  imagePath: any = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  imageUrl: string = "";
  content: string = "";
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
    toolbarPosition: 'top'
  };




  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef,
    private sectionService: SectionService, private uploadService: UploadFilesService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }






  ngOnInit(): void {
    this.sectionObj = { title: '', titleAr: '', brief: '', briefAr: '', sectionImg: '', id: 0, sectionDesc: '', sectionDescAr: '',isInAbout:false };
  }

  onSubmit() {

    let hasError = false;
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
        this.saveSection();
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
        this.saveSection();
      }
    }
  }

  saveSection() {
    if (this.file) {
      this.sectionObj.sectionImg = this.file.name;
    }

    this.sectionService.CreateSection(this.sectionObj).subscribe({
      next: (artObj) => {
        this.sectionId = artObj;
        this.sectionObj.id =   this.sectionId;
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
    const allowedTypes = ['image/jpg', 'image/gif', 'image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
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
