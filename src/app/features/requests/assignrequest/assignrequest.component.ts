import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, tap } from 'rxjs';
import { CreateRequestDocumentVM } from 'src/app/shared/models/requestDocumentVM';
import { CreateRequestTrackingVM } from 'src/app/shared/models/requestTrackingVM';
import { RequestVM } from 'src/app/shared/models/requestVM';
import { ListUserRoleVM, ListUserVM, LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { RequestTrackingService } from 'src/app/shared/services/request-tracking.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { RequestDocumentService } from 'src/app/shared/services/requestdocument.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-assignrequest',
  templateUrl: './assignrequest.component.html',
  styleUrls: ['./assignrequest.component.scss']
})
export class AssignrequestComponent implements OnInit {

  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  formData = new FormData();
  itmIndex: any[] = [];
  isDisabled: boolean = false;
  errorDisplay: boolean = false;
  display: boolean = false;
  errorMessage: string = "";
  reqObj: RequestVM;
  trackObj: CreateRequestTrackingVM;
  reqTrackId: number = 0;
  createRequestDocument: CreateRequestDocumentVM;
  lstCreateRequestDocument: CreateRequestDocumentVM[] = [];
  lstUserDoctors: ListUserVM[] = [];
  // lstUserSuperDoctors: ListUserVM[] = [];
  lstUserRoles: ListUserRoleVM[] = [];
  selectedRole: string;
  mainRequestId: number = 0;

  lstRoleNames: string[] = [];
  isSuper: boolean = false;
  isDoctor: boolean = false;
  isAdmin: boolean = false;
  isPatient: boolean = false;
  hidden: boolean = false;

  specialityId: number = 0;


  constructor(private requestService: RequestService, private requestTrackingService: RequestTrackingService, private requestDocumentService: RequestDocumentService, private uploadService: UploadFilesService,
    private authenticationService: AuthenticationService, private userService: UserService,
    private datePipe: DatePipe, private ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {

    this.reqObj = { strRequestDate: '', createdById: "", requestCode: '', subject: '', complain: '', requestDate: new Date(), id: 0, userName: '', specialityName: '', specialityNameAr: '', specialityId: 0, listDocuments: [] }
    this.trackObj = { advice: '', createdById: '', respondDate: new Date(), strRespondDate: '', requestId: 0, statusId: 0, assignTo: '' }

    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isSuper = (['SupervisorDoctor'].some(r => this.lstRoleNames.includes(r)));
      this.isDoctor = (['Doctor'].some(r => this.lstRoleNames.includes(r)));
      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
      this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));
    }

    if (this.config.data != null) {
      let requestId = this.config.data.reqId;

      this.mainRequestId = requestId;
      this.requestService.getRequestById(this.mainRequestId).pipe(
        tap((response) => this.reqObj = response)
      ).subscribe({
        next: (reqItem) => {
          this.reqObj = reqItem;
          this.specialityId = this.reqObj.specialityId;
          if (this.isAdmin) {
            this.lstUserRoles = [{ name: "Doctor" }, { name: "SupervisorDoctor" }];
            this.selectedRole = "Doctor";
            this.hidden = true;
            if ( this.selectedRole  == "Doctor") {
              this.lstUserDoctors = [];
              this.userService.listOfRegisteredDoctorsBySpecialityId(this.specialityId).subscribe({
                next: (items) => {
                  this.lstUserDoctors = items;
                },
                error: (e) => { }
              });
            }
            //   next: (items) => {
            //     this.lstUserDoctors = items;
            //   },
            //   error: (e) => { }
            // });
          }

          if (this.isSuper) {
            this.lstUserRoles = [{ name: "Doctor" }];
            this.selectedRole = "Doctor";
            this.hidden = true;

            this.userService.listOfRegisteredDoctorsBySpecialityId(this.specialityId).subscribe({
              next: (items) => {
                this.lstUserDoctors = items;
              },
              error: (e) => { }
            });

          }
          if (this.isDoctor) {
            this.hidden = false;
          }

        },
        error: (err) => {
          console.error("Error fetching data", err);
        },
      });
    }

  }

  onRoleChange($event) {

    if ($event.value == "Doctor") {
      this.lstUserDoctors = [];
      this.userService.listOfRegisteredDoctorsBySpecialityId(this.specialityId).subscribe({
        next: (items) => {
          this.lstUserDoctors = items;
        },
        error: (e) => { }
      });
    }
    if ($event.value == "SupervisorDoctor") {

      this.lstUserDoctors = [];
      this.userService.listOfRegisteredSupervisorDoctorsBySpecialityId(this.specialityId).subscribe({
        next: (items) => {
          this.lstUserDoctors = items;
        },
        error: (e) => { }
      });



    }
  }
  addRequestTracking(): any {
    this.trackObj.createdById = this.currentUser.id;
    this.trackObj.requestId = Number(this.mainRequestId)
    this.trackObj.statusId = 2;
    this.trackObj.assignTo = this.trackObj.assignTo;
    this.trackObj.strRespondDate = this.datePipe.transform(new Date, "yyyy-MM-dd HH:mm");

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
    });

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
      element.fileName = element.fileName;
      element = { id: 0, fileName: '', requestTrackingId: 0, title: '', requestFile: File };
    });
  }
  removeFileFromObjectArray(rowIndex) {

    if (rowIndex >= 0 && rowIndex < this.lstCreateRequestDocument.length) {
      this.lstCreateRequestDocument.splice(rowIndex, 1);

      this.lstCreateRequestDocument.forEach((element, index) => {
        element.requestTrackingId = Number(this.reqTrackId)
        if (this.itmIndex.length === 0) {
          last_element = 1;
        }
        else if (this.itmIndex.length > 0 && this.lstCreateRequestDocument.length == 0) {
          var last_element = this.itmIndex[this.itmIndex.length - 1];
          last_element = last_element + 1;
        }
        this.itmIndex.push(last_element);
        element.fileName = element.fileName;
        element = { id: 0, fileName: '', requestTrackingId: 0, title: '', requestFile: File };
      });

    }
  }
  closeDialogue() {
    this.ref.close();
  }
}
