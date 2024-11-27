import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateRequestDocumentVM } from 'src/app/shared/models/requestDocumentVM';
import { RequestVM } from 'src/app/shared/models/requestVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { RequestDocumentService } from 'src/app/shared/services/requestdocument.service';
import { UploadFilesService } from 'src/app/shared/services/uploadfilesservice';
import { environment } from 'src/environments/environment';
import { AssignrequestComponent } from '../assignrequest/assignrequest.component';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { ListRequestTrackingVM } from 'src/app/shared/models/requestTrackingVM';
import { RequestTrackingService } from 'src/app/shared/services/request-tracking.service';

@Component({
  selector: 'app-viewrequest',
  templateUrl: './viewrequest.component.html',
  styleUrls: ['./viewrequest.component.scss']
})
export class ViewrequestComponent implements OnInit {

  lang = localStorage.getItem("lang");
  currentUser: LoggedUser;
  formData = new FormData();
  reqObj: RequestVM;
  lstTracks :ListRequestTrackingVM[]=[];
  createRequestDocument: CreateRequestDocumentVM;
  lstCreateRequestDocument: CreateRequestDocumentVM[] = [];
  mainRequestId: number = 0;

  isPatient:boolean= false;
  isSupervisor:boolean= false;
  isDoctor:boolean= false;
  isAdmin:boolean= false;
  lstRoleNames: string[] = [];

  constructor(private requestService: RequestService, private requestTrackingService: RequestTrackingService,private config: DynamicDialogConfig, private reloadPage: ReloadPageService, public dialogService: DialogService, private authenticationService: AuthenticationService, private uploadService: UploadFilesService) {

    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit(): void {

    this.reqObj = { strRequestDate: '', createdById: "", requestCode: '', subject: '', complain: '', requestDate: new Date(), id: 0, userName: '', specialityName:'',specialityNameAr:'',specialityId:0,  listDocuments: [] }

    
    
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
          console.error('Filename does not exist or corrupted:', fileName);
        }
      },
      error => {
        console.error('Filename does not exist or corrupted:', fileName);
      }
    );
  }

  assignRequest(requestId: number) {
    const dialogRef2 = this.dialogService.open(AssignrequestComponent, {
      header: this.lang == "en" ? 'Assign Ticket' : "تعيين السؤال",
      data: {
        reqId: requestId
      },
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 40
      }
    });

    dialogRef2.onClose.subscribe((res) => {
      this.reloadPage.reload();
    });
  }
}
