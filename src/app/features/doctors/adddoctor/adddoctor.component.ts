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
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';


@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.scss']
})
export class AdddoctorComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
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
  isDoctor: boolean = false;
  imagePath: any = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  doctorId: number = 0;

  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef, private doctorService: DoctorService, private specialistService: SpecialistService, private datePipe: DatePipe, private uploadService: UploadFilesService) { this.currentUser = this.authenticationService.currentUserValue; }
  ngOnInit(): void {
    this.doctorObj = {
      code: "", name: "", nameAr: "", dob: new Date, joinDate: new Date, gradDate: new Date, strDob: '', strJoinDate: '', strGradDate: '', userRole: '', isActive: false,
      address: '', addressAr: '', remarks: '', email: '', genderId: 0, mobile: '', nationalId: '', specialistId: 0, userName: '', passwordHash: '', parentId: 0, doctorImg: '', id: 0
    }

    this.userObj = { id: '', userName: '', token: '', roleNames: [], message: '', email: '', phoneNumber: '', passwordHash: '', specialityId: 0 };
    this.doctorRole = { roleName: '', specialityId: 0 }
    this.lstGenders = [{ id: 1, name: "Male", nameAr: "ذكر" }, { id: 1, name: "Female", nameAr: "أنثى" }];
    this.lstUserRoles = [{ name: "Doctor" }, { name: "SupervisorDoctor" }]
    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });


    this.doctorService.GenerateDoctorCode().subscribe(data => {
      this.doctorObj.code = data.code;
    });
  }
  getdob($event) {
    this.doctorObj.strDob = this.datePipe.transform($event, "yyyy-MM-dd");
  }
  getjoinDate($event) {
    this.doctorObj.strJoinDate = this.datePipe.transform($event, "yyyy-MM-dd");
  }

  getgradDate($event) {
    this.doctorObj.strGradDate = this.datePipe.transform($event, "yyyy-MM-dd");
  }

  checkRole(roleName: String) {
    if (roleName == "Doctor") {
      this.isDoctor = true;
      this.doctorRole.specialityId = this.doctorObj.specialistId;
      this.doctorRole.roleName = this.doctorObj.userRole;
      this.doctorService.CheckDoctorRole(this.doctorRole).subscribe({
        next: (items) => {
          this.lstUserDoctors = items;
        }
      });
    }
    if (roleName == "SupervisorDoctor") {
      this.isDoctor = false;
      this.doctorObj.parentId = 0;
    }
  }

  isValidRoleNames(roleNames: string[]): boolean {
    return Array.isArray(roleNames) && roleNames.length > 0 && roleNames.some(role => role.trim() !== '');
  }
  onSubmit(): any {
    this.userObj.userName = this.doctorObj.userName;
    this.userObj.passwordHash = this.doctorObj.passwordHash;
    this.userObj.email = this.doctorObj.email;
    this.userObj.phoneNumber = this.doctorObj.mobile;
    this.userObj.roleNames = [this.doctorObj.userRole];




    if (this.isValidRoleNames(this.userObj.roleNames)) {
      this.userObj.roleNames = [this.doctorObj.userRole];
    } else {
      this.errorDisplay = true;
      this.errorMessage = this.lang == "en" ? "Please select user role" : "من فضلك اختر دور الدكتور";
      return false;
    }

    const nameValidation = ValidationService.validateName(this.doctorObj.name, this.lang);
    if (!nameValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = nameValidation.errorMessage;
      return false;
    }
    if (this.doctorObj.specialistId == 0) {
      this.errorDisplay = true;
      this.errorMessage = this.lang == "en" ? "Please select speciality" : "من فضلك اختر تخصص";
      return false;
    }
    const phoneValidation = ValidationService.validatePhoneNumber(this.doctorObj.mobile, this.lang);
    if (!phoneValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = phoneValidation.errorMessage;
      return false;
    }
    if (this.userObj.roleNames.length == 0) {
      this.errorDisplay = true;
      this.errorMessage = this.lang == "en" ? "Please select doctor role" : "من فضلك اختر دور الدكتور";
      return false;
    }
    if (this.userObj.roleNames.includes("Doctor")) {
      if (this.doctorObj.parentId == 0) {
        this.errorDisplay = true;
        this.errorMessage = this.lang == "en" ? "Please select supervisor doctor" : "من فضلك اختر مدير الدكتور";
        return false;
      }
    }
    const usernameValidation = ValidationService.validateUserName(this.userObj.userName, this.lang);
    if (!usernameValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = usernameValidation.errorMessage;
      return false;
    }
    const passwordValidation = ValidationService.validatePassword(this.userObj.passwordHash, this.lang);
    if (!passwordValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = passwordValidation.errorMessage;
      return false;
    }
    const emailValidation = ValidationService.validateEmail(this.userObj.email, this.lang);
    if (!emailValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = emailValidation.errorMessage;
      return false;
    }

    else {
      this.doctorService.CreateDoctorAsUser(this.userObj).pipe(
        mergeMap((userResponse) => {
          // Proceed to create patient if the user creation is successful
          return this.doctorService.CreateDoctor(this.doctorObj).pipe(
            catchError((doctorError) => {
              // If patient creation fails, rollback the user creation
              this.authenticationService.deleteUser(userResponse.id).subscribe({
                next: () => {
                  this.errorDisplay = true;
                  this.errorMessage = this.getErrorMessage(doctorError);
                  return false;
                },
                error: (rollbackError) => {
                  // Handle error on rollback operation (e.g., if delete user fails)
                  console.error('Rollback failed: ', rollbackError);
                  return false;
                }
              });
              this.errorDisplay = true;
              this.errorMessage = this.getErrorMessage(doctorError);
              return of(false); // Return false to terminate further operations
            })
          );
        }),
        catchError((userError) => {
          // Handle user creation failure and prevent proceeding to patient creation
          this.errorDisplay = true;
          this.errorMessage = this.getErrorMessage(userError);
          return of(false); // Return false to stop the flow
        })
      ).subscribe({
        next: (result) => {
          if (result !== false) {
            this.display = true;
            this.ref.close();
          }
        },
        complete: () => console.info('Complete')
      });
    }

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
  resetFile() {
    this.upfile.nativeElement.value = "";
    this.imgVisible = true;
    this.btnHidden = true;
  }
  getErrorMessage(error: any): string {
    if (this.lang === 'en') {
      // English error message handling
      if (error.error && error.error.status === 'email') {
        return error.error.message; // The English message for email error
      }
      if (error.error && error.error.status === 'username') {
        return error.error.message; // The English message for username error
      }
      if (error.error && error.error.status === 'password') {
        return error.error.message; // The English message for password error
      }
      if (error.error && error.error.status === 'Error') {
        return error.error.message; // The English message for password error
      }
      return 'An unexpected error occurred'; // Default error message in English
    } else if (this.lang === 'ar') {
      // Arabic error message handling
      if (error.error && error.error.status === 'email') {
        return error.error.messageAr; // The Arabic message for email error
      }
      if (error.error && error.error.status === 'username') {
        return error.error.messageAr; // The Arabic message for username error
      }
      if (error.error && error.error.status === 'password') {
        return error.error.messageAr; // The Arabic message for password error
      }
      if (error.error && error.error.status === 'Error') {
        return error.error.message; // The English message for password error
      }
      return 'حدث خطأ غير متوقع'; // Default error message in Arabic
    }
    return 'An error occurred'; // Fallback message if no language is matched
  }

  closeDialogue() {
    this.ref.close();
  }
}
