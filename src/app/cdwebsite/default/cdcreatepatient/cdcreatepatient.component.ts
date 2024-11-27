import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ListCountryVM } from 'src/app/shared/models/countryVM';
import { ListGender } from 'src/app/shared/models/genderVM';
import { CreatePatientVM } from 'src/app/shared/models/patientVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CountryService } from 'src/app/shared/services/country.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { ValidationService } from 'src/app/shared/services/validation.service';
import { of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-cdcreatepatient',
  templateUrl: './cdcreatepatient.component.html',
  styleUrls: ['./cdcreatepatient.component.scss']
})
export class CdcreatepatientComponent {
  //lang = "en";

  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');

  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  patientObj: CreatePatientVM;
  userObj: LoggedUser;
  currentUser: LoggedUser;
  lstGenders: ListGender[] = [];
  calendarVisible = false;
  lstCountries: ListCountryVM[] = [];
  phoneCode: string = "";


  constructor(
    private authenticationService: AuthenticationService,
    private patientService: PatientService,
    private route:Router,private ref: DynamicDialogRef,
    private countryService: CountryService,
    private datePipe: DatePipe) { }



  ngOnInit(): void {

    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);

    this.currentUser = null;
    this.patientObj = { passwordHash: '', userName: '', code: "", name: "", nameAr: "", dob: new Date, strdob: '', address: '', addressAr: '', email: '', genderId: 0, mobile: '', nationalId: '', countryId: 0 }
    this.userObj = { id: '', userName: '', token: '', roleNames: [], message: '', email: '', phoneNumber: '', passwordHash: '', specialityId: 0 };
    this.lstGenders = [{ id: 1, name: "Male", nameAr: "ذكر" }, { id: 2, name: "Female", nameAr: "أنثى" }];


    this.countryService.GetCountries().subscribe(items => {
      this.lstCountries = items;
    });




    this.patientService.GenerateRequestNumber().subscribe(num => {
      this.patientObj.code = num.patientCode;
    });
  }
  getdob($event) {
    this.patientObj.strdob = this.datePipe.transform($event, "yyyy-MM-dd");
  }

  getGenderId(genderId: number) {
    this.patientObj.genderId = genderId;
  }

  getCountryPhoneCode(countryId: number) {
    this.countryService.GetPhoneCodeByCountryId(countryId).subscribe({
      next: (code) => {
        this.phoneCode = code;
      }
    });
  }

  onSubmit() {

    this.userObj.userName = this.patientObj.userName;
    this.userObj.passwordHash = this.patientObj.passwordHash;
    this.userObj.email = this.patientObj.email;
    this.userObj.phoneNumber = this.patientObj.mobile;
    this.userObj.roleNames = ["Patient"];


    const nameValidation = ValidationService.validateName(this.patientObj.name, this.lang);
    if (!nameValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = nameValidation.errorMessage;
      return;
    }


    const genderValidation = ValidationService.validateGender(this.patientObj.genderId, this.lang);
    if (!genderValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = genderValidation.errorMessage;
      return;
    }


    const countryValidation = ValidationService.validateCountry(this.patientObj.genderId, this.lang);
    if (!countryValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = countryValidation.errorMessage;
      return;
    }

    

    const usernameValidation = ValidationService.validateUserName(this.userObj.userName, this.lang);
    if (!usernameValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = usernameValidation.errorMessage;
      return;
    }

    const emailValidation = ValidationService.validateEmail(this.userObj.email, this.lang);
    if (!emailValidation.isValid) {
      this.errorDisplay = true;
      this.errorMessage = emailValidation.errorMessage;
      return;
    }

    this.patientObj.strdob = "";//this.patientObj.dob.toString();
    this.patientObj.mobile = this.phoneCode + this.patientObj.mobile;
   
    this.userObj.roleNames = ["Patient"];

    // this.patientService.CreatePatientAsUser(this.userObj).subscribe({
    //   next: (v) => {
    //     this.patientService.CreatePatient(this.patientObj).subscribe({
    //       next: (v) => {
    //         this.display = true;
    //         this.route.navigate(['']);
    //       },
    //       error: (e) => {
    //         this.errorDisplay = true;
    //         if (this.lang == 'en') {
    //           if (e.error.status == 'email') {
    //             this.errorMessage = e.error.message;
    //           }
    //         }
    //         if (this.lang == 'ar') {
    //           if (e.error.status == 'email') {
    //             this.errorMessage = e.error.messageAr;
    //           }
    //         }
    //         return false;
    //       },
    //       complete: () => console.info('complete')
    //     });
    //   },
    //   error: (e) => {
    //     this.errorDisplay = true;
    //     if (this.lang == 'en') {
    //       if (e.error.status == 'username') {
    //         this.errorMessage = e.error.message;
    //       }
    //       if (e.error.status == 'email') {
    //         this.errorMessage = e.error.message;
    //       }
    //       if (e.error.status == 'password') {
    //         this.errorMessage = e.error.message;
    //       }
    //     }
    //     if (this.lang == 'ar') {
    //       if (e.error.status == 'username') {
    //         this.errorMessage = e.error.messageAr;
    //       }
    //       if (e.error.status == 'email') {
    //         this.errorMessage = e.error.messageAr;
    //       }
    //       if (e.error.status == 'password') {
    //         this.errorMessage = e.error.message;
    //       }
    //     }
    //     return false;
    //   },
    //   complete: () => console.info('complete')
    // });

    this.patientService.CreatePatientAsUser(this.userObj).pipe(
      mergeMap((userResponse) => {
        // Proceed to create patient if the user creation is successful
        return this.patientService.CreatePatient(this.patientObj).pipe(
          catchError((patientError) => {
            // If patient creation fails, rollback the user creation
            this.authenticationService.deleteUser(userResponse.id).subscribe({
              next: () => {
                this.errorDisplay = true;
                this.errorMessage = this.getErrorMessage(patientError);
                return false;
              },
              error: (rollbackError) => {
                // Handle error on rollback operation (e.g., if delete user fails)
                console.error('Rollback failed: ', rollbackError);
                return false;
              }
            });
            this.errorDisplay = true;
            this.errorMessage = this.getErrorMessage(patientError);
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
          //this.authenticationService.login(this.userObj);
          this.route.navigate(['/']);
        }
      },
      complete: () => console.info('Complete')
    });

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

  closeDialogue(){
    this.ref.close();
  }
}
