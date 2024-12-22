import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ViewSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
@Component({
  selector: 'app-viewspecial',
  templateUrl: './viewspecial.component.html',
  styleUrls: ['./viewspecial.component.scss']
})
export class ViewspecialComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  specialObj: ViewSpecialistVM;

  constructor(private authenticationService: AuthenticationService,private ref: DynamicDialogRef, private specialistService: SpecialistService,private config: DynamicDialogConfig) {   this.currentUser = this.authenticationService.currentUserValue;}
  ngOnInit(): void { 
    this.specialObj = { id:0,code: 0, name: "", nameAr: "" ,pngIcon:'', isActive:false}


    
    if (this.config.data != null) {
      let id = this.config.data.id;
      this.specialistService.GetSpecialistById(id).subscribe({
        next: (item) => {
          this.specialObj = item;
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
