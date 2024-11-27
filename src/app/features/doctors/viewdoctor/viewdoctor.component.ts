import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditDoctorVM, ViewDoctorVM } from 'src/app/shared/models/doctorVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewdoctor',
  templateUrl: './viewdoctor.component.html',
  styleUrls: ['./viewdoctor.component.scss']
})
export class ViewdoctorComponent {
  lang = localStorage.getItem("lang");
  textDir = localStorage.getItem("dir");
  currentUser: LoggedUser;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  doctorObj: ViewDoctorVM;

  isChecked = false;

  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef,
    private doctorService: DoctorService, private config: DynamicDialogConfig) { this.currentUser = this.authenticationService.currentUserValue; }
  ngOnInit(): void {
    this.doctorObj = {
      code: "", name: "", nameAr: "", dob: '', joinDate: '', gradDate: '', isActive: false, genderId: 0,
      address: '', addressAr: '', remarks: '', email: '', mobile: '', nationalId: '', id: 0, doctorImg: '', gender: '', specialityName: '', specialityNameAr: '', supervisorDoctor: ''
    }

    if (this.config.data != null) {
      let id = this.config.data.id;
      this.doctorService.ViewDoctorById(id).subscribe({
        next: (item) => {
          this.doctorObj = item;
          if (this.lang == "en") {
            if (this.doctorObj.genderId == 1)
              this.doctorObj.gender = "Male";
            if (this.doctorObj.genderId == 2)
              this.doctorObj.gender = "Female";
          }
          if (this.lang == "ar") {
            if (this.doctorObj.genderId == 1)
              this.doctorObj.gender = "ذكر";
            if (this.doctorObj.genderId == 2)
              this.doctorObj.gender = "أنثى";
          }

          this.isChecked = item.isActive;

          if (this.doctorObj.doctorImg == null) {
            this.doctorObj.doctorImg =  "../assets/images/unknowndoctor.png";
          }
          else if (this.doctorObj.doctorImg == "") {
            this.doctorObj.doctorImg =  "../assets/images/unknowndoctor.png";
          }
          else {
            this.doctorObj.doctorImg = `${environment.Domain}UploadedAttachments/DoctorImages/` + this.doctorObj["doctorImg"];
          }
        },
        error: (err) => {
          console.error("Error fetching data", err);
        },
      });
    }
  }

  close() {
    this.ref.close();
  }



}
