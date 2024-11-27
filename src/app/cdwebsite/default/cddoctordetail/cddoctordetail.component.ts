import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ViewDoctorVM } from 'src/app/shared/models/doctorVM';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cddoctordetail',
  templateUrl: './cddoctordetail.component.html',
  styleUrls: ['./cddoctordetail.component.scss']
})
export class CddoctordetailComponent implements OnInit {

  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  doctorObj: ViewDoctorVM;
  doctorId: number = 0;
  doctorImg: string = "";

  constructor(private doctorService: DoctorService, private activatedRoute: ActivatedRoute, private config: DynamicDialogConfig) { }


  ngOnInit(): void {
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);

    
    this.doctorObj={code:'',dob:'',doctorImg:'',email:'',gender:'',id:0,mobile:'',name:'',nameAr:'',nationalId:'',specialityName:'',specialityNameAr:'',supervisorDoctor:'',address:'',addressAr:'',genderId:0,gradDate:'',isActive:false,joinDate:'',remarks:''}
    if (this.config.data != null) {
      let id = this.config.data.id;
      this.doctorId = id

      this.doctorService.ViewDoctorById(this.doctorId).subscribe({
        next: (item) => {
          this.doctorObj = item;

          if (item.doctorImg == null) {
            this.doctorImg = "../assets/images/unknownDoctor.png";
          }
          else if (item.doctorImg == "") {
            this.doctorImg = "../assets/images/unknownDoctor.png";
          }
          else {
            this.doctorImg = `${environment.Domain}UploadedAttachments/DoctorImages/` + item.doctorImg;
          }
        },
        error: (err) => {
          console.log(err);
        }

      });
    }
  }
}
