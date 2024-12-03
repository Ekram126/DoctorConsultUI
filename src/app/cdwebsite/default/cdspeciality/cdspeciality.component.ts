import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { CdepartmentsmediaComponent } from '../cdepartmentsmedia/cdepartmentsmedia.component';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdspeciality',
  templateUrl: './cdspeciality.component.html',
  styleUrls: ['./cdspeciality.component.scss']
})
export class CdspecialityComponent implements OnInit {


  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');

  items: MenuItem[] = [];

  doctorImg: string = "";
  svgIcon: string = '';
  pngIcon: string = '';
  lstSpeciality: ListSpecialistVM[] = [];


  // specialityOptions: OwlOptions = {
  //   loop: true,
  //   rtl: this.lang == "en" ? false : true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  // //  navText: ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"],
  //   navText: this.lang == "en" ? ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"]:["<i class='bi bi-arrow-right'></i>", "<i class='bi bi-arrow-left'></i>"],
  
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     600: {
  //       items: 2
  //     },
  //     740: {
  //       items: 4
  //     },
  //     940: {
  //       items: 6
  //     },
  //     1000: {
  //       items: 6
  //     }
  //   },
  //   nav: true
  // }

  constructor(private specialityService: SpecialistService, public dialogService: DialogService, private reloadService: ReloadPageService) {

  }
  ngOnInit(): void {
    this.LoadSpeciality();
    this.LoadContextMenu();;
  }

  LoadContextMenu() {
    this.items = [{ label: 'Articles', icon: '' }, { label: 'Videos', icon: '' }]
  }


  LoadSpeciality() {
    this.specialityService.GetSpecialists().subscribe(items => {
      this.lstSpeciality = items;

      this.lstSpeciality.forEach(element => {
        if (element.pngIcon != null && element.pngIcon != "")
          element.pngIcon = `${environment.Domain}UploadedAttachments/SprcialityFiles/` + element.pngIcon;
        else if (element.pngIcon == null)
          element.pngIcon =       '../../../../assets/img/icons/unknowndepartment.png' ;
        else if (element.pngIcon == "")
          element.pngIcon =   '../../../../assets/img/icons/unknowndepartment.png' ;
      });

      // this.lstSpeciality.forEach(element => {
      //   if (element.pngIcon == null) {
      //     element.pngIcon =  'assets/img/icons/unknowndepartment.png';
      //   }
      //   else if (element.pngIcon == "") {
      //     element.pngIcon = 'assets/img/icons/unknowndepartment.png' ;
      //   }
      //   else {
      //     element.pngIcon = 'assets/img/icons/' + element.pngIcon;
      //   }


      //   if (element.svgIcon == null) {
      //     element.svgIcon = 'assets/img/icons/unknowndepartment.svg' ;
      //   }
      //   else if (element.svgIcon == "") {
      //     element.svgIcon ='assets/img/icons/unknowndepartment.svg' ;
      //   }
      //   else {
      //     element.svgIcon = 'assets/img/icons/' + element.svgIcon;
      //   }


      // });
    });
  }

  selectMedia(specialId: number) {
    const dialogRef2 = this.dialogService.open(CdepartmentsmediaComponent, {
      responsive: true, // Enable responsiveness
      data: {
        specialityId: specialId
      },
     // styleClass: "my-dialog",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    }as DynamicDialogConfig<any>);
    dialogRef2.onClose.subscribe((res) => {
      this.reloadService.reload();
    });
  }
}
