import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRequestDocumentVM, ListRequestDocumentVM } from 'src/app/shared/models/requestDocumentVM';
import { RequestVM } from 'src/app/shared/models/requestVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { RequestDocumentService } from 'src/app/shared/services/requestdocument.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';
import { AssignrequestComponent } from '../assignrequest/assignrequest.component';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { CreateRequestTrackingVM, EditRequestTrackingVM, ListRequestTrackingVM } from 'src/app/shared/models/requestTrackingVM';
import { RequestTrackingService } from 'src/app/shared/services/request-tracking.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-verifyrequest',
  templateUrl: './verifyrequest.component.html',
  styleUrls: ['./verifyrequest.component.scss']
})
export class VerifyrequestComponent implements OnInit{

  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  formData = new FormData();
  reqObj: RequestVM;
  lstTracks :ListRequestTrackingVM[]=[];
  trackObj :CreateRequestTrackingVM;
  lstDocuments:ListRequestDocumentVM[]=[];
  createRequestDocument: CreateRequestDocumentVM;
  lstCreateRequestDocument: CreateRequestDocumentVM[] = [];
  mainRequestId: number = 0;

  isPatient:boolean= false;
  isShowFiles:boolean= false;
  isSupervisor:boolean= false;
  isDoctor:boolean= false;
  isAdmin:boolean= false;
  display: boolean = false;
  errorDisplay: boolean = false;
  errorMessage: string = "";
  lstRoleNames: string[] = [];


  constructor( private ref: DynamicDialogRef,private datePipe:DatePipe,private requestService: RequestService,private requestDocumentService: RequestDocumentService,private requestTrackingService: RequestTrackingService,private config: DynamicDialogConfig, private reloadPage: ReloadPageService, public dialogService: DialogService, private authenticationService: AuthenticationService, private uploadService: UploadFilesService) {

    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {

    this.reqObj = { isRead:false, statusId:0, actionDate: new Date(), strRequestDate: '', createdById: "", requestCode: '', subject: '', complain: '', requestDate: new Date(), id: 0, userName: '', specialityName:'',specialityNameAr:'',specialityId:0,  listDocuments: [] }
    this.trackObj={id:0,assignTo:'',createdById:'',requestId:0,respondDate:new Date,statusId:0,strRespondDate:'',advice:''}
    
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

          this.requestTrackingService.getRequestTrackByRequestId(  this.reqObj .id).subscribe({
            next:(elements)=>{
              this.lstTracks= elements.results;
            }
          })
        },
        error: (err) => {
          console.error("Error fetching data", err);
        },
      });

    }
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
          this.errorMessage ='File does not exist or corrupted  '+ fileName;
        }
      },
      error => {
        this.errorDisplay = true;
        this.errorMessage ='File does not exist or corrupted '+ fileName;
      }
    );
  }

  getDocuments(trackid: number) {
    this.requestDocumentService.GetRequestDocumentsByRequestTrackingId(trackid).subscribe(lstdocs => {
      this.lstDocuments = lstdocs;
    });
    this.isShowFiles = true;
  }

  approveRequest(){
    this.trackObj.requestId = this.reqObj.id;
    this.trackObj.statusId=4;
    this.trackObj.createdById= this.currentUser.id;
    this.trackObj.advice="Request is approved";
    this.trackObj.strRespondDate = this.datePipe.transform(new Date, "yyyy-MM-dd HH:mm");
    this.requestTrackingService.addRequestTrack(this.trackObj).subscribe({
      next:(item)=>{
        this.display = true;
      }
    });
  }
  
  closeDialogue() {
    this.ref.close();
  }
}
