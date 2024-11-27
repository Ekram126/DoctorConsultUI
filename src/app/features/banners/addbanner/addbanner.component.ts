import { DatePipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateBannerVM } from 'src/app/shared/models/bannerVM';
import { BannerService } from 'src/app/shared/services/banner.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
@Component({
  selector: 'app-addbanner',
  templateUrl: './addbanner.component.html',
  styleUrls: ['./addbanner.component.scss']
})
export class AddbannerComponent {
  lang = localStorage.getItem("lang");
  textDir = localStorage.getItem("dir");
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  bannerObj: CreateBannerVM;

  isBanner: boolean = false;
  imagePath: any = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  BannerId: number = 0;

  constructor(private ref: DynamicDialogRef, private bannerService: BannerService, private datePipe: DatePipe, private uploadService: UploadFilesService) { }
  ngOnInit(): void {
    this.bannerObj = {
      code: "", name: "", nameAr: "", isActive: false, strBannerDate: '', bannerDate: new Date,
      brief: '', briefAr: '', specialistId: 0, bannerImg: '', id: 0, orderId: 0
    }
  }
  getdob($event) {
    this.bannerObj.strBannerDate = this.datePipe.transform($event, "yyyy-MM-dd");
  }


  onSubmit() {
    let hasError = false;

    if (this.lang == "en") {
      if (this.bannerObj.name == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert name.';
        hasError = true; // Set error flag
      }
      if (this.bannerObj.nameAr == "") {
        this.errorDisplay = true;
        this.errorMessage = 'Please insert arabic name.';
        hasError = true; // Set error flag
      }
      // if (this.bannerObj.specialistId == 0) {
      //   this.errorDisplay = true;
      //   this.errorMessage = 'select speciality';
      //   hasError = true; // Set error flag
      // }

      if (!hasError) {
        this.saveBanner();
      }
    }
    if (this.lang == "ar") {
      if (this.bannerObj.name == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل العنوان';
        hasError = true; // Set error flag
      }
      if (this.bannerObj.nameAr == "") {
        this.errorDisplay = true;
        this.errorMessage = 'أدخل العنوان بالعربي';
        hasError = true; // Set error flag
      }
      // if (this.bannerObj.specialistId == 0) {
      //   this.errorDisplay = true;
      //   this.errorMessage = 'اختر تخصص';
      //   hasError = true; // Set error flag
      // }
      if (!hasError) {
        this.saveBanner();
      }
    }
  }

  saveBanner() {
    this.bannerService.CreateBanner(this.bannerObj).subscribe({
      next: (BannerObj) => {
        this.BannerId = BannerObj;
        this.bannerObj.id = BannerObj;
        if (this.file) {
          this.bannerObj.bannerImg = this.file.name;
          this.bannerService.UpdateBannerImageAfterInsert(this.bannerObj).subscribe(master => {
            this.uploadService.uploadBannerImage(this.file, this.file.name).subscribe(
              (event) => {
                this.display = true;
                this.ref.close();
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

    // const fileExtension = this.file.name.split('.').pop()?.toLowerCase();
    // if (fileExtension === 'webp') {
    //   this.errorDisplay = true;
    //   this.errorMessage = 'WebP files are not allowed.';
    //   fileInput.value = '';
    // }


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
