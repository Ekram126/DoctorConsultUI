import { Component, OnInit } from '@angular/core';
import { ListDoctorVM, SortAndFilterDoctorVM } from 'src/app/shared/models/doctorVM';
import { Paging } from 'src/app/shared/models/paging';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { AdddoctorComponent } from '../adddoctor/adddoctor.component';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { EditdoctorComponent } from '../editdoctor/editdoctor.component';
import { environment } from 'src/environments/environment';
import { ViewdoctorComponent } from '../viewdoctor/viewdoctor.component';

@Component({
  selector: 'app-listdoctors',
  templateUrl: './listdoctors.component.html',
  styleUrls: ['./listdoctors.component.scss']
})
export class ListdoctorsComponent implements OnInit {
  lang = localStorage.getItem('lang');
  dir: string = "ltr";
  currentUser: LoggedUser;
  lstDoctors: ListDoctorVM[] = [];
  page: Paging;
  sortFilterObjects: SortAndFilterDoctorVM;
  count: number = 0;
  loading: boolean = true;
  isAdmin:boolean= false;
  lstRoleNames: string[] = [];
  sortStatus: string = "ascending";
  layout: string = 'list';
  constructor(private authenticationService: AuthenticationService,private doctorService: DoctorService,
    private reloadService:ReloadPageService,  public dialogService: DialogService) { 
         this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit() {
    this.sortFilterObjects = {
      searchObj: {},
      sortObj: {sortBy:'',sortStatus:''}
    };

    this.page = {
      pagenumber: 1,
      pagesize: 10,
    }
 
   if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
    }

    this.loadDoctors();
  }

  loadDoctors(){
    
    this.doctorService.GetDoctors(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstDoctors = items.results;

      this.lstDoctors.forEach(element => {        
        if (element.doctorImg == null) {
          element.doctorImg = "../../../../assets/images/unknowndoctor.png";
        }
        else if (element.doctorImg == "") {
          element.doctorImg = "../../../../assets/images/unknowndoctor.png";
        }
        else {
          element.doctorImg = `${environment.Domain}UploadedAttachments/DoctorImages/` + element.doctorImg;
        }
      });
      this.count = items.count;
      this.loading = false;
    });
  }


  

  addDoctor() {
    const dialogRef2 = this.dialogService.open(AdddoctorComponent, {
      header: this.lang == "en" ? 'Add Doctor' : "اضف دكتور",
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


  editDoctor(id: number) {
    const ref = this.dialogService.open(EditdoctorComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Doctor' : "تعديل دكتور",
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

  
 viewDoctor(id: number) {
    const ref = this.dialogService.open(ViewdoctorComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'View Doctor' : "بيانات الطبيب",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
  }

  // sort(field) {
  //   if (this.sortStatus == "descending") {
  //     this.sortStatus = "ascending";
  //     this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
  //   }
  //   else {
  //     this.sortStatus = "descending";
  //     this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
  //   }


  //   this.sortFilterObjects.sortObj.sortBy = field.currentTarget.id;
  //   this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
  //   this.doctorService.GetDoctors(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
  //     this.lstDoctors = items.results;
  //     this.lstDoctors.forEach(element => {        
  //       if (element.doctorImg == null) {
  //         element.doctorImg = "../../../../assets/images/unknowndoctor.png";
  //       }
  //       else if (element.doctorImg == "") {
  //         element.doctorImg = "../../../../assets/images/unknowndoctor.png";
  //       }
  //       else {
  //         element.doctorImg = `${environment.Domain}UploadedAttachments/DoctorImages/` + element.doctorImg;
  //       }
  //     });
  //     this.count = items.count;
  //     this.loading = false;
  //   });

  // }

}
