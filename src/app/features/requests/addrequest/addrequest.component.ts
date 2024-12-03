import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRequestDocumentVM } from 'src/app/shared/models/requestDocumentVM';
import { CreateRequestTrackingVM } from 'src/app/shared/models/requestTrackingVM';
import { CreateRequestVM } from 'src/app/shared/models/requestVM';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { RequestTrackingService } from 'src/app/shared/services/request-tracking.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { RequestDocumentService } from 'src/app/shared/services/requestdocument.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';

@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.component.html',
  styleUrls: ['./addrequest.component.scss']
})
export class AddrequestComponent implements OnInit {

  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  formData = new FormData();
  reqObj: CreateRequestVM;
  trackObj: CreateRequestTrackingVM;
  errorDisplay: boolean = false;
  display: boolean = false;
  errorMessage: string = "";
  createRequestDocument: CreateRequestDocumentVM;
  lstCreateRequestDocument: CreateRequestDocumentVM[] = [];
  lstSpecialists: ListSpecialistVM[] = [];
  reqId: number = 0;
  reqTrackId: number = 0;
  itmIndex: any[] = [];
  isDisabled: boolean = false;

  constructor(private requestService: RequestService, private requestTrackingService: RequestTrackingService, private config: DynamicDialogConfig,
    private requestDocumentService: RequestDocumentService, private uploadService: UploadFilesService, private specialistService: SpecialistService,
    private authenticationService: AuthenticationService, private datePipe: DatePipe, private ref: DynamicDialogRef) {

    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {

    this.reqObj = { strRequestDate: '', createdById: "", requestCode: '', subject: '', complain: '', requestDate: new Date(), id: 0, specialityId: 0 }
    this.createRequestDocument = { id: 0, requestTrackingId: 0, fileName: '', title: '', requestFile: File }
    this.trackObj = { advice: '', createdById: '', respondDate: new Date(), strRespondDate: '', requestId: 0, statusId: 0, assignTo: '' }

    this.requestService.GenerateRequestNumber().subscribe(num => {
      this.reqObj.requestCode = num.requestCode;
    });
    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });

    if (this.currentUser == null) {
      this.errorDisplay = true;
      this.errorMessage = this.lang=="en"? "Please Login first":"الرجاء تسجيل الدخول أولا";
    }

    
    if (this.config.data != null) {
      let specialityId = this.config.data.id;
      this.reqObj.specialityId = specialityId;
    }



  }


  addRequest(): any {
    if (this.reqObj.subject == "") {
      this.errorDisplay = true;
      if (this.lang == "en") {
        this.errorMessage = "Please add subject";
      }
      else {
        this.errorMessage = "من فضلك اكتب عنوان لبلاغ العطل";
      }
      return false;
    }
    if (this.currentUser == null) {
      this.errorDisplay = true;
      this.errorMessage = this.lang=="en"? "Please Login first":"الرجاء تسجيل الدخول أولا";
      return false;
    }

    this.reqObj.createdById = this.currentUser.id;
    this.reqObj.strRequestDate = this.datePipe.transform(new Date, "yyyy-MM-dd HH:mm");
    this.requestService.addRequest(this.reqObj).subscribe({
      next: (itemId) => {
        this.reqId = itemId;
        this.trackObj.requestId = Number(this.reqId)
        this.trackObj.statusId = 1;
        this.trackObj.advice = this.reqObj.complain;
        this.trackObj.createdById = this.currentUser.id;
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
        })
      },
      error: (e) => {
        this.errorDisplay = true;

        if (this.lang == 'en') {
          if (e.error.status == 'code') {
            this.errorMessage = e.error.message;
          }
        }
        return false;
      },
      complete: () => console.info('complete')
    });
  }

  uploadMultipleFile = (event: any) => {

    const files: FileList = event.target.files;
    if (files.length === 0) {
      return;
    } else {
      const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpg','image/jpeg', 'image/png', 'image/webp', 'image/jfif'];
      
      for (let i = 0; i < files.length; i++) {
        let fileToUpload = <File>files[i];
        
        // Validate file type
        if (!validFileTypes.includes(fileToUpload.type)) {
          alert(`Invalid file type: ${fileToUpload.name}. Only PDF, DOC, JPEG, JPG, PNG, WEBP, JFIF, GIF and DOCX are allowed.`);
          continue;
        }
    
        const requestDocumentObj = new CreateRequestDocumentVM();
        this.formData.append('file', fileToUpload, fileToUpload.name);
        requestDocumentObj.fileName = fileToUpload.name;
        requestDocumentObj.requestFile = fileToUpload;
        requestDocumentObj.title = fileToUpload.name.split('.')[0];
        this.lstCreateRequestDocument.push(requestDocumentObj);
      }
      
      this.addMultiFilesToList();
    }
    

    // const files: FileList = event.target.files;
    // if (files.length === 0) {
    //   return;
    // }
    // else {
    //   for (var i = 0; i < files.length; i++) {
    //     let fileToUpload = <File>files[i];
    //     var requestDocumentObj = new CreateRequestDocumentVM();
    //     this.formData.append('file', fileToUpload, fileToUpload.name);
    //     requestDocumentObj.fileName = fileToUpload.name;
    //     requestDocumentObj.requestFile = fileToUpload;
    //     requestDocumentObj.title = fileToUpload.name.split('.')[0];
    //     this.lstCreateRequestDocument.push(requestDocumentObj);
    //   }
    //   this.addMultiFilesToList();
    // }
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
        // else if (this.itmIndex.length > 0 && this.lstCreateRequestDocument.length > 0) {
        //   const incrementedIndex = index + 1;
        //   newIndex = this.pad((incrementedIndex).toString(), 2);
        // }
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
