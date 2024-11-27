import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CdcreatepatientComponent } from 'src/app/cdwebsite/default/cdcreatepatient/cdcreatepatient.component';
import { LoggedUser, User } from 'src/app/shared/models/userVM';

import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loggingUserObj: User;
  userObj: LoggedUser;
  display: boolean = false;
  displayerror: string = '';
  lang = localStorage.getItem('lang') || "en";
  textDir: string = 'ltr';

  constructor(private router: Router, private reloadService: ReloadPageService, private authenticationService: AuthenticationService,private dialogService: DialogService) {}

  ngOnInit(): void {
    this.loggingUserObj = { userName: '', passwordHash: '' };
    this.userObj = {id: '',userName: '',token: '', roleNames: [],message:'',email:'', phoneNumber:'',passwordHash:'',specialityId:0};
  }


  login() {


    this.authenticationService.login(this.loggingUserObj).subscribe(
      data => {
        if(data.message=='success'){
          localStorage.setItem('userToken',data.token);
          this.authenticationService.saveUserData();
          this.userObj = this.authenticationService.currentUserValue;
        }  
        this.lang = "en";
        this.textDir = "ltr";
       // this.router.navigate(['/dash']);
        this.router.navigate(['']);
      },
      error => {
        this.display = true;
        this.displayerror = error.error.message;
      });
   
  }
  addPatient(){
    this.authenticationService.addPatient();
    // this.router.navigate(['/dash/patients/createpatient']);

    const dialogRef2 = this.dialogService.open(CdcreatepatientComponent, {
      header: this.lang == "en" ? 'Register for Consultation ' : "سجل للتواصل مع الطبيب المختص",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.reloadService.reload();
    });
  }
}
