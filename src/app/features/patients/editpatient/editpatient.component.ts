import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListCountryVM } from 'src/app/shared/models/countryVM';
import { ListGender } from 'src/app/shared/models/genderVM';
import { EditPatientVM } from 'src/app/shared/models/patientVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CountryService } from 'src/app/shared/services/country.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { PatientService } from 'src/app/shared/services/patient.service';

@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.component.html',
  styleUrls: ['./editpatient.component.scss']
})
export class EditpatientComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  patientObj: EditPatientVM;
  userObj: LoggedUser;
  currentUser: LoggedUser;
  lstGenders: ListGender[] = [];
  phoneCode: string = "";
  calendarVisible = false;
  lstCountries: ListCountryVM[] = [];

  constructor(private authenticationService: AuthenticationService, private patientService: PatientService, private datePipe: DatePipe, private config: DynamicDialogConfig, private countryService: CountryService,private ref: DynamicDialogRef) { this.currentUser = this.authenticationService.currentUserValue; }
  ngOnInit(): void {
    this.patientObj = { id: 0, code: "", name: "", nameAr: "", dob: new Date, strdob: '', address: '', addressAr: '', email: '', genderId: 0, mobile: '', nationalId: '' , countryId:0},

    this.lstGenders = [{ id: 1, name: "Male", nameAr: "ذكر" }, { id: 2, name: "Female", nameAr: "أنثى" }];

    this.countryService.GetCountries().subscribe(items => {
      this.lstCountries = items;
    });

    if (this.config.data != null) {
      let id = this.config.data.id;
      this.patientService.GetPatientById(id).subscribe({
        next: (item) => {

          this.patientObj = item;
          if (item.dob == null)
            this.patientObj.dob = new Date();
          else
            this.patientObj.dob = new Date(item.dob);
        },
        error: (err) => {
          console.error("Error fetching data", err.error);
          console.error("Error fetching data2", err);
        },
      });
    }

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
    this.patientObj.strdob ="";
    this.patientService.UpdatePatient(this.patientObj).subscribe({
      next: (v) => {
        this.display = true;
      },
      error: (e) => {
        this.errorDisplay = true;
        return false;
      },
      complete: () => console.info('complete')
    });

  }
  closeDialogue(){
    this.ref.close();
  }
}
