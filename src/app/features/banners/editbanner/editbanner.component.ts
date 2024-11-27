import { Component, ElementRef } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditBannerVM } from 'src/app/shared/models/bannerVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { BannerService } from 'src/app/shared/services/banner.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editbanner',
  templateUrl: './editbanner.component.html',
  styleUrls: ['./editbanner.component.scss']
})
export class EditbannerComponent {
  lang = localStorage.getItem("lang");
  textDir= localStorage.getItem("dir");
  currentUser: LoggedUser;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  bannerObj: EditBannerVM;
  
  imgURL: string = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  imagePath: any = "";
  isChecked = false;
  
  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef, private bannerService: BannerService,
    private config: DynamicDialogConfig,  private uploadService: UploadFilesService) { this.currentUser = this.authenticationService.currentUserValue; }
  ngOnInit(): void {
    this.bannerObj = {
      code: "", name: "", nameAr: "",isActive:false, strBannerDate:'',bannerDate:new Date,
      brief: '', briefAr: '', specialistId: 0, bannerImg: '',id:0,orderId:0
    }

    if (this.config.data != null) {
      let id = this.config.data.id;
      this.bannerService.GetBannerById(id).subscribe({
        next: (item) => {
          this.bannerObj = item;
          this.isChecked  = item.isActive;



          if (this.bannerObj.bannerImg == null) {
            this.bannerObj.bannerImg = "../assets/images/unknownBanner.jpg";
          }
          else if (this.bannerObj.bannerImg == "") {
            this.bannerObj.bannerImg =  "../assets/images/unknownBanner.jpg";
          }
          else {
            this.bannerObj.bannerImg = `${environment.Domain}UploadedAttachments/BannerImages/` + this.bannerObj.bannerImg;
            
          }
        },
        error: (err) => {
          console.error("Error fetching data", err);
        },
      });
    }
  }


  onSubmit() {

    
    if (this.file) {
      this.bannerObj.bannerImg = this.file.name;
    }
    else {
      this.bannerObj.bannerImg = this.bannerObj.bannerImg;
    }
    this.bannerService.UpdateBanner(this.bannerObj).subscribe({
      next: (v) => {
        this.bannerService.UpdateBannerImageAfterInsert(this.bannerObj).subscribe(master => {
          this.uploadService.uploadBannerImage(this.file, this.file.name).subscribe(
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
        this.display = true;
        this.ref.close();
      },
      error: (e) => {
        this.errorDisplay = true;
        return false;
      },
      complete: () => console.info('complete')
    });
  }
  close() {
    this.ref.close();
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
  // onFileSelected(event) {
  //   this.file = event.target.files[0];
  //   if (this.file) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(this.file);
  //     reader.onload = (_event) => {
  //       this.imagePath = reader.result;
  //       this.imgVisible = false;
  //       this.btnHidden = false;
  //     }
  //   }
  // }
  resetFile() {
    this.upfile.nativeElement.value = "";
    this.imgVisible = true;
    this.btnHidden = true;
  }

}
