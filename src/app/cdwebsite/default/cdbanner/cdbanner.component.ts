import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DialogService } from 'primeng/dynamicdialog';
import { ListBannerVM } from 'src/app/shared/models/bannerVM';
import { BannerService } from 'src/app/shared/services/banner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdbanner',
  templateUrl: './cdbanner.component.html',
  styleUrls: ['./cdbanner.component.scss']
})
export class CdbannerComponent {
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  lstBanners: ListBannerVM[] = [];
  bannerObj: ListBannerVM;
  bannerOptions: OwlOptions = {
    loop: true,
    rtl: this.lang == "en" ? false : true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 5,
    navText: this.lang == "en" ? ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"] : ["<i class='bi bi-arrow-right'></i>", "<i class='bi bi-arrow-left'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      600: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      },
      576: {
        items: 2 // Number of items to show on small screens
      },
      768: {
        items: 3 // Number of items to show on medium screens
      },
      992: {
        items: 4// Number of items to show on larger screens
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private bannerService: BannerService, public dialogService: DialogService) { }
  ngOnInit(): void {

    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);

    this.LoadBanners();
    
  }
  // LoadListBanners() {
  //   this.bannerService.GetAllBanners().subscribe(items => {
  //     this.lstBanners = items;
  //     this.lstBanners.forEach(element => {
  //       if (element.bannerImg == null) {
  //         element.bannerImg = "assets/images/unknownBanner.jpg";
  //       }
  //       else if (element.bannerImg == "") {
  //         element.bannerImg = "assets/images/unknownBanner.jpg";
  //       }
  //       else {
  //         element.bannerImg = `${environment.Domain}UploadedAttachments/BannerImages/` + element.bannerImg;
  //       }
  //     });
  //   });
  // }


  LoadBanners() {
    this.bannerService.GetAllBanners().subscribe(items => {
      this.bannerObj = items[0];

      if (this.bannerObj.bannerImg == null) {
        this.bannerObj.bannerImg = "assets/images/unknownBanner.jpg";
      }
      else if (this.bannerObj.bannerImg == "") {
        this.bannerObj.bannerImg = "assets/images/unknownBanner.jpg";
      }
      else {
        this.bannerObj.bannerImg = `${environment.Domain}UploadedAttachments/BannerImages/` + this.bannerObj.bannerImg;
      }
    });
  }
}
