import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRequestDocumentVM } from 'src/app/shared/models/requestDocumentVM';
import { CreateRequestTrackingVM } from 'src/app/shared/models/requestTrackingVM';
import { CreateRequestVM, RequestVM } from 'src/app/shared/models/requestVM';
import { ListUserVM, LoggedUser } from 'src/app/shared/models/userVM';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { RequestTrackingService } from 'src/app/shared/services/request-tracking.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { RequestDocumentService } from 'src/app/shared/services/requestdocument.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-doctorreply',
  templateUrl: './doctorreply.component.html',
  styleUrls: ['./doctorreply.component.scss']
})
export class DoctorreplyComponent {
  reqTrackId: number = 0;
  errorDisplay: boolean = false;
  display: boolean = false;
  errorMessage: string = "";
  isDisabled: boolean = false;
  dateError: boolean = false;
  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  formData = new FormData();
  createRequestObj: CreateRequestVM;
  reqObj: RequestVM;
  trackObj: CreateRequestTrackingVM;
  createRequestDocument: CreateRequestDocumentVM;
  lstCreateRequestDocument: CreateRequestDocumentVM[] = [];
  itmIndex: any[] = [];
  lstDoctors: ListUserVM[] = [];

  isDoctor: boolean = false;
  isSupervisorDoctor: boolean = false;
  lstRoleNames: string[] = [];


  constructor(private requestService: RequestService, private requestTrackingService: RequestTrackingService, private config: DynamicDialogConfig,
    private requestDocumentService: RequestDocumentService, private uploadService: UploadFilesService,
    private doctorService: DoctorService, private userService: UserService,
    private authenticationService: AuthenticationService, private datePipe: DatePipe, private ref: DynamicDialogRef) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {
    this.reqObj = { strRequestDate: '', createdById: "", requestCode: '', subject: '', complain: '', requestDate: new Date(), id: 0, listDocuments: [], userName: '', specialityName: '', specialityNameAr: '', specialityId: 0 }
    this.createRequestDocument = { id: 0, requestTrackingId: 0, fileName: '', title: '', requestFile: File }
    this.trackObj = { advice: '', createdById: '', respondDate: new Date(), strRespondDate: '', requestId: 0, statusId: 0, assignTo: '' }


    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isSupervisorDoctor = (['SupervisorDoctor'].some(r => this.lstRoleNames.includes(r)));
      this.isDoctor = (['Doctor'].some(r => this.lstRoleNames.includes(r)));
    }








    if (this.config.data != null) {
      let requestId = this.config.data.reqId;
      this.requestService.getRequestById(requestId).subscribe({
        next: (reqItem) => {
          this.reqObj = reqItem;



          if (this.isSupervisorDoctor) {
            this.userService.listOfRegisteredDoctorsBySpecialityId(this.reqObj.specialityId).subscribe({
              next: (items) => {
                this.lstDoctors = items;
              },
              error: (e) => { }
            });
          }
        },
        error: (err) => {
          console.error("Error fetching data", err);
        },
      });
    }




    // if (this.isSupervisorDoctor) {
    //   // this.doctorService.getDoctorsBySpecialityId(this.reqObj.specialityId).subscribe({
    //   //   next: (doctors) => { this.lstDoctors = doctors; },
    //   //   error: (e) => { console.log(e); }
    //   // });

    //   this.userService.listOfRegisteredDoctorsBySpecialityId(this.reqObj.specialityId).subscribe({
    //     next: (items) => {
    //       this.lstDoctors = items;
    //     },
    //     error: (e) => { }
    //   });
    // }

  }


  addResponse() {

    this.trackObj.requestId = this.reqObj.id;
    this.trackObj.createdById = this.currentUser.id;
    if (this.trackObj.assignTo == null)
      this.trackObj.assignTo = this.trackObj.assignTo;
    else
      this.trackObj.assignTo = this.currentUser.id;



    this.trackObj.statusId = 3;
    this.requestTrackingService.addRequestTrack(this.trackObj).subscribe({
      next: (trackId) => {
        this.reqTrackId = trackId;
        if (this.lstCreateRequestDocument.length > 0) {
          this.lstCreateRequestDocument.forEach((item, index) => {
            item.requestTrackingId = Number(this.reqTrackId);
            this.requestDocumentService.createRequestDocuments(item).subscribe(fileObj => {
              this.uploadService.uploadRequestFiles(item.requestFile, item.fileName).subscribe(
                (event) => {
                  this.display = true;
                  this.isDisabled = true;
                },
                (err) => {
                  if (this.lang == "en") {
                    this.errorDisplay = true;
                    this.errorMessage = 'Could not upload the file:' + item[index].fileName;
                  }
                  else {
                    this.errorDisplay = true;
                    this.errorMessage = 'لا يمكن رفع ملف ' + item[index].fileName;
                  }
                });
            });
          });
          this.lstCreateRequestDocument = [];
        }
        else {
          this.display = true;
          this.isDisabled = true;
        }
      }
    })
  }


  uploadMultipleFile = (event: any) => {
    const files: FileList = event.target.files;
    if (files.length === 0) {
      return;
    }
    else {
      for (var i = 0; i < files.length; i++) {
        let fileToUpload = <File>files[i];
        var requestDocumentObj = new CreateRequestDocumentVM();
        this.formData.append('file', fileToUpload, fileToUpload.name);
        requestDocumentObj.fileName = fileToUpload.name;
        requestDocumentObj.requestFile = fileToUpload;
        requestDocumentObj.title = fileToUpload.name.split('.')[0];
        this.lstCreateRequestDocument.push(requestDocumentObj);
      }
      this.addMultiFilesToList();
    }
  }
  addMultiFilesToList() {
    this.lstCreateRequestDocument.forEach((element, index) => {
      element.requestTrackingId = Number(this.reqTrackId)
      if (this.itmIndex.length === 0) {
        last_element = 1;
      }
      else if (this.itmIndex.length > 0) {
        var last_element = this.itmIndex[this.itmIndex.length - 1];
        last_element = last_element + 1;
      }
      this.itmIndex.push(last_element);
      let ext = element.fileName.split('.').pop();

      var srCode = this.pad(this.reqObj.requestCode, 10);
      var last = this.itmIndex[this.itmIndex.length - 1];
      let newIndex = this.pad((last).toString(), 2);
      let SRFileName = "SR" + srCode + newIndex;
      element.fileName = SRFileName + "." + ext;
      element = { id: 0, fileName: '', requestTrackingId: 0, title: '', requestFile: File };
    });
  }

  pad(num: string, size: number): string {
    while (num.length < size) num = "0" + num;
    return num;
  }
  closeDialogue() {
    this.ref.close();
  }
}
