import { Component, ElementRef, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateSpecialistVM } from 'src/app/shared/models/specialistVM';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';

@Component({
  selector: 'app-addspecial',
  templateUrl: './addspecial.component.html',
  styleUrls: ['./addspecial.component.scss']
})
export class AddspecialComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  specialObj: CreateSpecialistVM;


  imagePath: any = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  imageUrl: string = "";


  constructor(private ref: DynamicDialogRef, private specialistService: SpecialistService, private uploadService: UploadFilesService) { }
  ngOnInit(): void {
    this.specialObj = { code: 0, name: "", nameAr: "", pngIcon: '', isActive: false }


    this.specialistService.GenerateSpecialityNumber().subscribe(num => {
      this.specialObj.code = num.sprcialityCode;
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
  onSubmit() {

    if (this.file) {
      this.specialObj.pngIcon = this.file.name;
    }



    this.specialistService.CreateSpecialist(this.specialObj).subscribe({
      next: (v) => {
        if (this.file) {
          this.uploadService.uploadSpecialityImage(this.file, this.file.name).subscribe(
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

        }
        else {
          this.display = true;
          this.ref.close();
        }
      },
      error: (e) => {
        this.errorDisplay = true;

        // if (this.lang == 'en') {
        //   if (e.error.status == 'code') {
        //     this.errorMessage = e.error.message;
        //   }
        // }

        if (e.error.status == 'special') {
          if (this.lang == 'en') {
            this.errorMessage = e.error.message;
          }
          else if (this.lang == 'ar') {
            this.errorMessage = e.error.messageAr;
          }
        }
        return false;
      },
      complete: () => console.info('complete')
    });
  }
  closeDialogue() {
    this.ref.close();
  }

}
