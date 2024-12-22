import { Component,  ElementRef,  OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editspecial',
  templateUrl: './editspecial.component.html',
  styleUrls: ['./editspecial.component.scss']
})
export class EditspecialComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  specialObj: EditSpecialistVM;
  imgURL: string = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  imagePath: any = "";
  isChecked = false;
  
  constructor(private authenticationService: AuthenticationService,private ref: DynamicDialogRef, private uploadService: UploadFilesService,
    private specialistService: SpecialistService,private config: DynamicDialogConfig) {   this.currentUser = this.authenticationService.currentUserValue;}
  ngOnInit(): void { 
    this.specialObj = { id:0,code: 0, name: "", nameAr: "" ,pngIcon:'', isActive:false}


    
    if (this.config.data != null) {
      let id = this.config.data.id;
      this.specialistService.GetSpecialistById(id).subscribe({
        next: (item) => {
          this.specialObj = item;
          this.isChecked  = item.isActive;
          

          if (item.pngIcon != null && item.pngIcon != "")
            this.imgURL = `${environment.Domain}UploadedAttachments/SprcialityFiles/` + item.pngIcon;
          else if (item.pngIcon == null)
            this.imgURL  =       '../../../../assets/img/icons/unknowndepartment.png' ;
          else if (item.pngIcon == "")
            this.imgURL  =   '../../../../assets/img/icons/unknowndepartment.png' ;
        },
        error: (err) => {
          console.error("Error fetching data", err);
        },
      });

    }
}
  onSubmit() {


    if (this.file) {
      this.specialObj.pngIcon = this.file.name;
    }
    else {
      this.specialObj.pngIcon = this.specialObj.pngIcon;
    }


    this.specialistService.UpdateSpecialist(this.specialObj).subscribe({
      next: (v) => { 
        if (this.file) {
            this.uploadService.uploadSpecialityImage(this.file, this.file.name).subscribe(
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


}
