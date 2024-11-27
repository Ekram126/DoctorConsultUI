import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateDoctorVM, DoctorUserRole } from 'src/app/shared/models/doctorVM';
import { ListGender } from 'src/app/shared/models/genderVM';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { ListUserRoleVM, ListUserVM, LoggedUser } from 'src/app/shared/models/userVM';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { ValidationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.scss']
})
export class AdddoctorComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  doctorObj: CreateDoctorVM;
  lstSpecialists: ListSpecialistVM[] = [];
  lstUserRoles: ListUserRoleVM[] = [];
  lstGenders: ListGender[] = [];
  userObj: LoggedUser;
  doctorRole: DoctorUserRole;
  lstUserDoctors: ListUserVM[] = [];
  isDoctor:boolean= false;
  imagePath: any = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  doctorId:number=0;

  constructor(private ref: DynamicDialogRef, private doctorService: DoctorService, private specialistService: SpecialistService, private datePipe: DatePipe,private uploadService: UploadFilesService) { }
  ngOnInit(): void {
    this.doctorObj = {
      code: "", name: "", nameAr: "", dob: new Date, joinDate: new Date, gradDate: new Date, strdob: '', strJoinDate: '', strGradDate: '', userRole: '',isActive:false,
      address: '', addressAr: '', remarks: '', email: '', genderId: 0, mobile: '', nationalId: '', specialistId: 0, userName: '', passwordHash: '',parentId:0, doctorImg: '',id:0
    }

    this.userObj = { id: '', userName: '', token: '', roleNames: [], message: '', email: '', phoneNumber: '', passwordHash: '' ,specialityId:0};
    this.doctorRole={roleName:'',specialityId:0}
    this.lstGenders = [{ id: 1, name: "Male", nameAr: "ذكر" }, { id: 1, name: "Female", nameAr: "أنثى" }];
    this.lstUserRoles = [{ name: "Doctor" }, { name: "SupervisorDoctor" }]
    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });
  }
  getdob($event) {
    this.doctorObj.strdob = this.datePipe.transform($event, "yyyy-MM-dd");
  }
  getjoinDate($event) {
    this.doctorObj.strJoinDate = this.datePipe.transform($event, "yyyy-MM-dd");
  }

  getgradDate($event) {
    this.doctorObj.strGradDate = this.datePipe.transform($event, "yyyy-MM-dd");
  }

  checkRole(roleName: String) {
    if (roleName == "Doctor") {
      this.isDoctor= true;
      this.doctorRole.specialityId = this.doctorObj.specialistId;
      this.doctorRole.roleName = this.doctorObj.userRole;
      this.doctorService.CheckDoctorRole(this.doctorRole).subscribe({
        next: (items) => {
          this.lstUserDoctors = items;
        }
      });
    }
    if (roleName == "SupervisorDoctor") {
      this.isDoctor= false;
      this.doctorObj.parentId=0;
    }
  }
  onSubmit() {
    this.userObj.userName = this.doctorObj.userName;
    this.userObj.passwordHash = this.doctorObj.passwordHash;
    this.userObj.email = this.doctorObj.email;
    this.userObj.phoneNumber = this.doctorObj.mobile;
    this.userObj.roleNames = [this.doctorObj.userRole];



    const phoneValidation = ValidationService.validatePhoneNumber(this.doctorObj.mobile, this.lang);
    if (!phoneValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = phoneValidation.errorMessage;
      return;
    }

    const usernameValidation = ValidationService.validateUserName(this.userObj.userName, this.lang);
    if (!usernameValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = usernameValidation.errorMessage;
      return;
    }
    const passwordValidation = ValidationService.validatePassword(this.userObj.passwordHash, this.lang);
    if (!passwordValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = passwordValidation.errorMessage;
      return;
    }

    const emailValidation = ValidationService.validateEmail(this.userObj.email, this.lang);
    if (!emailValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = emailValidation.errorMessage;
      return;
    }



    this.doctorService.CreateDoctorAsUser(this.userObj).subscribe({
      next: (v) => {
        this.doctorService.CreateDoctor(this.doctorObj).subscribe({
          next:  (doctorObj) => {
            this.doctorId = doctorObj;
            this.doctorObj.id =doctorObj;
            if (this.file) {
              this.doctorObj.doctorImg=this.file.name;
                   this.doctorService.UpdateDoctorImageAfterInsert(this.doctorObj).subscribe(master => {
                this.uploadService.uploadDoctorImage(this.file, this.file.name).subscribe(
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
            }
            else {
              this.display = true;
              this.ref.close();
            }
          },
          error: (e) => {
            this.errorDisplay = true;
            if (this.lang == 'en') {
              if (e.error.status == 'username') {
                this.errorMessage = e.error.message;
              }
              if (e.error.status == 'email') {
                this.errorMessage = e.error.message;
              }
              if (e.error.status == 'phone') {
                this.errorMessage = e.error.message;
              }
            }
            return false;
          },
          complete: () => console.info('complete')
        });
      }
    });
  }
  close() {
    this.ref.close();
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
  resetFile() {
    this.upfile.nativeElement.value = "";
    this.imgVisible = true;
    this.btnHidden = true;
  }
}
