import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Paging } from 'src/app/shared/models/paging';
import { ListPatientVM, SortAndFilterPatientVM } from 'src/app/shared/models/patientVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { EditpatientComponent } from '../editpatient/editpatient.component';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';

@Component({
  selector: 'app-listpatients',
  templateUrl: './listpatients.component.html',
  styleUrls: ['./listpatients.component.scss']
})
export class ListpatientsComponent  implements OnInit {
  lang = localStorage.getItem('lang');
  dir: string = "ltr";
  lstPatients: ListPatientVM[] = [];
  page: Paging;
  sortFilterObjects: SortAndFilterPatientVM;
  count: number = 0;
  loading: boolean = true;
  currentUser: LoggedUser;
  sortStatus: string = "ascending";

  constructor(private authenticationService: AuthenticationService,private patientService: PatientService, public dialogService: DialogService,  private reloadService:ReloadPageService) { this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit() {
    this.sortFilterObjects = {
      searchObj: {userId:''},
      sortObj: {  sortBy: '',    sortStatus:''}
    };

    this.page = {
      pagenumber: 1,
      pagesize: 10,
    }
  }


  clicktbl(event: any) {
    this.page.pagenumber = (event.first + 10) / 10;
    this.page.pagesize = event.rows;
    this.sortFilterObjects.searchObj.userId= this.currentUser.id;
    this.patientService.GetPatients(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstPatients = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }


  editPatient(id: number) {
    const ref = this.dialogService.open(EditpatientComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Patient' : "تعديل مريض",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    ref.onClose.subscribe((res) => {
      this.reloadService.reload();
    });
  }


  sort(field) {
    if (this.sortStatus == "descending") {
      this.sortStatus = "ascending";
      this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
    }
    else {
      this.sortStatus = "descending";
      this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
    }


    this.sortFilterObjects.sortObj.sortBy = field.currentTarget.id;
    this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
    this.sortFilterObjects.searchObj.userId= this.currentUser.id;
    this.patientService.GetPatients(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstPatients = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }

}
