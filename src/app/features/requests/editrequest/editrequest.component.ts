import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRequestDocumentVM, ListRequestDocumentVM } from 'src/app/shared/models/requestDocumentVM';
import { RequestVM } from 'src/app/shared/models/requestVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { RequestDocumentService } from 'src/app/shared/services/requestdocument.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { EditRequestTrackingVM, ListRequestTrackingVM } from 'src/app/shared/models/requestTrackingVM';
import { RequestTrackingService } from 'src/app/shared/services/request-tracking.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-editrequest',
  templateUrl: './editrequest.component.html',
  styleUrls: ['./editrequest.component.scss']
})
export class EditrequestComponent implements OnInit {

  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  formData = new FormData();
  reqObj: RequestVM;
  lstTracks: ListRequestTrackingVM[] = [];
  lstDocuments: ListRequestDocumentVM[] = [];
  createRequestDocument: CreateRequestDocumentVM;
  lstCreateRequestDocument: CreateRequestDocumentVM[] = [];
  editRequestTrackObj: EditRequestTrackingVM;

  mainRequestId: number = 0;
  isPatient: boolean = false;
  isShowFiles: boolean = false;
  isSupervisor: boolean = false;
  isDoctor: boolean = false;
  isAdmin: boolean = false;
  display: boolean = false;

  displayRequestObj: boolean = false;
  lstRoleNames: string[] = [];

  errorDisplay: boolean = false;
  errorMessage: string = "";

  constructor(private requestService: RequestService, private requestDocumentService: RequestDocumentService, private datePipe: DatePipe,
    private ref: DynamicDialogRef,
    private requestTrackingService: RequestTrackingService, private config: DynamicDialogConfig, private reloadPage: ReloadPageService, 
    public dialogService: DialogService, private authenticationService: AuthenticationService, private uploadService: UploadFilesService) {

    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {

    this.reqObj = {isRead:false,  statusId: 0, actionDate: new Date(), strRequestDate: '', createdById: "", requestCode: '', subject: '', complain: '', requestDate: new Date(), id: 0, userName: '', specialityName: '', specialityNameAr: '', specialityId: 0, listDocuments: [] }
    this.editRequestTrackObj = { advice: '', id: 0, responseDate: new Date, strResponseDate: '' }


    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
      this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));
      this.isSupervisor = (['SupervisorDoctor'].some(r => this.lstRoleNames.includes(r)));
      this.isDoctor = (['Doctor'].some(r => this.lstRoleNames.includes(r)));
    }
    if (this.config.data != null) {
      let requestId = this.config.data.reqId;
      this.mainRequestId = requestId;
      this.requestService.getRequestById(this.mainRequestId).subscribe({
        next: (reqItem) => {
          this.reqObj = reqItem;

          this.requestTrackingService.getRequestTrackByRequestId(this.reqObj.id).subscribe({
            next: (elements) => {
              this.lstTracks = elements.results;
            }
          })
        },
        error: (err) => {
          console.error("Error fetching data", err);
        },
      });

    }
  }

  editRequestTrack(trackId: number) {
    this.displayRequestObj = true;
    this.requestTrackingService.getRequestTrackById(trackId).subscribe({
      next: (element) => {
        this.editRequestTrackObj = element;
      }
    })
  }
  editRequest() {
    this.editRequestTrackObj.strResponseDate = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss");
    this.requestTrackingService.updateRequestTrack(this.editRequestTrackObj).subscribe({
      next: (item) => {
        this.display= true;
      }
    });
  }

  downloadFile(fileName) {

    var filePath = `${environment.Domain}UploadedAttachments/`;
    this.uploadService.downloadRequestTrackFile(fileName).subscribe(
      file => {
        var dwnldFile = filePath + 'RequestDocuments/' + fileName;
        if (fileName && fileName !== "") {
          window.open(dwnldFile);
        } else {

          this.errorDisplay = true;
          this.errorMessage = 'File does not exist or corrupted  ' + fileName;

        }
      },
      error => {
        this.errorDisplay = true;
        this.errorMessage = 'File does not exist or corrupted ' + fileName;
      }
    );
  }

  getDocuments(trackid: number) {
    this.requestDocumentService.GetRequestDocumentsByRequestTrackingId(trackid).subscribe(lstdocs => {
      this.lstDocuments = lstdocs;
    });
    this.isShowFiles = true;
  }


  closeDialogue() {
    this.ref.close();
  }

}
