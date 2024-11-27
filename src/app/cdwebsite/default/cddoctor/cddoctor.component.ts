import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ListDoctorVM } from 'src/app/shared/models/doctorVM';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { environment } from 'src/environments/environment';
import { CddoctordetailComponent } from '../cddoctordetail/cddoctordetail.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cddoctor',
  templateUrl: './cddoctor.component.html',
  styleUrls: ['./cddoctor.component.scss']
})
export class CddoctorComponent implements OnInit {
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  lstDoctors: ListDoctorVM[] = [];

  doctorOptions: OwlOptions = {
    loop: true,
    rtl: this.lang == "en" ? false : true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 5,
   // navText: ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"],
    navText: this.lang == "en" ? ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"]:["<i class='bi bi-arrow-right'></i>", "<i class='bi bi-arrow-left'></i>"],
  
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      600: {
        items:2
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
        items: 4 // Number of items to show on larger screens
    },
      1000: {
        items:4
      }
    },
    nav: true
  }

  constructor(private doctorService: DoctorService,public dialogService: DialogService) {  }
  ngOnInit(): void {

    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);
    
    this.LoadDoctors();
  }
  LoadDoctors() {
    this.doctorService.GetAllDoctors().subscribe(items => {
      this.lstDoctors = items;      
      this.lstDoctors.forEach(element => {
        if (element.doctorImg == null) {
          element.doctorImg = "assets/images/unknowndoctor.png";
        }
        else if (element.doctorImg == "") {
          element.doctorImg = "assets/images/unknowndoctor.png";
        }
        else {
          element.doctorImg = `${environment.Domain}UploadedAttachments/DoctorImages/` + element.doctorImg;
        }
      });
    });
  }

  doctorDetail(doctorId:number){
    const ref = this.dialogService.open(CddoctordetailComponent, {
      header: this.lang == "en" ? 'Doctor Profile' : " بيانات الطبيب",
      closable: false,
      data: {
        id: doctorId
      },
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
  }
}
