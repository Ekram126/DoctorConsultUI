import { Component, OnInit } from '@angular/core';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { CdepartmentsmediaComponent } from '../cdepartmentsmedia/cdepartmentsmedia.component';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';

@Component({
  selector: 'app-cdfooter',
  templateUrl: './cdfooter.component.html',
  styleUrls: ['./cdfooter.component.scss']
})
export class CdfooterComponent implements OnInit {
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');


  lstSpeciality: ListSpecialistVM[] = [];



  constructor( private specialityService: SpecialistService,public dialogService: DialogService,private reloadService: ReloadPageService) {

  }
  ngOnInit(): void {
    this.LoadSpeciality();
  }

  LoadSpeciality() {
    this.specialityService.GetSpecialists().subscribe(items => {
      this.lstSpeciality = items;
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



  selectSpecialMedia($event) {
    const dialogRef2 = this.dialogService.open(CdepartmentsmediaComponent, {
      responsive: true, // Enable responsiveness
      width: 'auto', // Allow automatic width adjustment
      data: {
        specialityId: $event.target.value
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
