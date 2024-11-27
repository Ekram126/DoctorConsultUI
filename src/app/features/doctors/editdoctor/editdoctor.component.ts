import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditDoctorVM } from 'src/app/shared/models/doctorVM';
import { ListGender } from 'src/app/shared/models/genderVM';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editdoctor',
  templateUrl: './editdoctor.component.html',
  styleUrls: ['./editdoctor.component.scss']
})
export class EditdoctorComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  doctorObj: EditDoctorVM;
  lstGenders: ListGender[] = [];
  lstSpecialists: ListSpecialistVM[] = [];





  
  imgURL: string = "";
  upfile: ElementRef;
  file: File;
  imgVisible: boolean = false;
  btnHidden: boolean = true;
  fileToUpload: File;
  imagePath: any = "";
  isChecked = false;
  
  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef, private doctorService: DoctorService,
    private config: DynamicDialogConfig, private datePipe: DatePipe, private specialistService: SpecialistService,private uploadService: UploadFilesService) { this.currentUser = this.authenticationService.currentUserValue; }
  ngOnInit(): void {
    this.doctorObj = {
      code: "", name: "", nameAr: "", dob: new Date, joinDate: new Date, gradDate: new Date, strdob: '', strJoinDate: '', strGradDate: '', isActive: false,
      address: '', addressAr: '', remarks: '', email: '', genderId: 0, mobile: '', nationalId: '', specialistId: 0, id: 0, doctorImg: '',parentId:0,passwordHash:'',userName:'',userRole:''
    }

    this.lstGenders = [{ id: 1, name: "Male", nameAr: "ذكر" }, { id: 1, name: "Female", nameAr: "أنثى" }];

    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });


    if (this.config.data != null) {
      let id = this.config.data.id;
      this.doctorService.GetDoctorById(id).subscribe({
        next: (item) => {
          this.doctorObj = item;
          this.isChecked  = item.isActive;



          if (this.doctorObj.doctorImg == null) {
            this.doctorObj.doctorImg = "../assets/images/unknowndoctor.png";
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


  getdob($event) {
    this.doctorObj.strdob = this.datePipe.transform($event, "yyyy-MM-dd");
  }
  getjoinDate($event) {
    this.doctorObj.strJoinDate = this.datePipe.transform($event, "yyyy-MM-dd");
  }

  getgradDate($event) {
    this.doctorObj.strGradDate = this.datePipe.transform($event, "yyyy-MM-dd");
  }
  onSubmit() {

    
    if (this.file) {
      this.doctorObj.doctorImg = this.file.name;
    }
    else {
      this.doctorObj.doctorImg = this.doctorObj.doctorImg;
    }
    this.doctorService.UpdateDoctor(this.doctorObj).subscribe({
      next: (v) => {
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
        this.display = true;
        this.ref.close();
      },
      error: (e) => {
        this.errorDisplay = true;
        return false;
      },
      complete: () => console.info('complete')
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
