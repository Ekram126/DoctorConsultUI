import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Paging } from 'src/app/shared/models/paging';
import { ListRequestVM, SortAndFilterRequestVM } from 'src/app/shared/models/requestVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { AddrequestComponent } from '../addrequest/addrequest.component';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { AssignrequestComponent } from '../assignrequest/assignrequest.component';
import { ViewrequestComponent } from '../viewrequest/viewrequest.component';
import { RequestStatusService } from 'src/app/shared/services/request-status.service';
import { IndexRequestStatus } from 'src/app/shared/models/requestStatusVM';
import { DoctorreplyComponent } from '../doctorreply/doctorreply.component';
import { CreateRequestTrackingVM } from 'src/app/shared/models/requestTrackingVM';
import { RequestTrackingService } from 'src/app/shared/services/request-tracking.service';
import { DatePipe } from '@angular/common';
import { EditrequestComponent } from '../editrequest/editrequest.component';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { VerifyrequestComponent } from '../verifyrequest/verifyrequest.component';


@Component({
  selector: 'app-listrequests',
  templateUrl: './listrequests.component.html',
  styleUrls: ['./listrequests.component.scss']
})
export class ListrequestsComponent {
  lang = localStorage.getItem('lang');
  currentUser: LoggedUser;

  page: Paging;
  count: number = 0;
  statusId: number = 0;
  loading: boolean = true;
  display: boolean = false;
  lstRequests: ListRequestVM[] = [];
  sortFilterObjects: SortAndFilterRequestVM;
  lstStatuses: IndexRequestStatus[] = [];
  countOpen: number = 0;
  countClosed: number = 0;
  countInProgress: number = 0;
  countSolved: number = 0;
  countVerified: number = 0;
  
  countAll: number = 0;
  countApproved: number = 0;
  isPatient: boolean = false;
  isSupervisor: boolean = false;
  isDoctor: boolean = false;
  isAdmin: boolean = false;
  lstRoleNames: string[] = [];
  trackObj: CreateRequestTrackingVM;
  sortStatus: string = "ascending";


  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;


  constructor(private authenticationService: AuthenticationService, private requestTrackingService: RequestTrackingService,
    private reloadPage: ReloadPageService, private requestStatusService: RequestStatusService, private datePipe: DatePipe,
    private ref: DynamicDialogRef, private confirmationService: ConfirmationService,
    private requestService: RequestService, public dialogService: DialogService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {

    this.trackObj = { advice: '', createdById: '', respondDate: new Date(), strRespondDate: '', requestId: 0, statusId: 0, assignTo: '' }

    this.sortFilterObjects = {
      searchObj: { userId: '', statusId: 0, specialityId: 0 },
      sortObj: { sortBy: '', sortStatus: '' }
    };

    this.page = {
      pagenumber: 1,
      pagesize: 10,
    }

    this.requestStatusService.GetRequestStatusByUserIdAndSpecialityId(this.currentUser.id, this.currentUser.specialityId).subscribe(statusObj => {
      this.lstStatuses = statusObj.listStatus;
      this.countOpen = statusObj.countOpen;
      this.countApproved = statusObj.countApproved;
      this.countClosed = statusObj.countClosed;
      this.countInProgress = statusObj.countInProgress;
      this.countSolved = statusObj.countSolved;
      this.countAll = statusObj.countAll;
    });

    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
      this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));
      this.isSupervisor = (['SupervisorDoctor'].some(r => this.lstRoleNames.includes(r)));
      this.isDoctor = (['Doctor'].some(r => this.lstRoleNames.includes(r)));
    }

    this.loadRequests();



    this.sortOptions = [
      { label: 'Request Desc', value: '!requestDate' },
      { label: 'Request Asc', value: 'requestDate' },
      { label: 'Last Action Asc', value: 'actionDate' },
      { label: 'Last Action DESC', value: '!actionDate' },
    ];

  }

  loadRequests() {

    this.sortFilterObjects.searchObj.userId = this.currentUser.id;
    this.sortFilterObjects.searchObj.statusId = this.statusId;
    this.sortFilterObjects.searchObj.specialityId = this.currentUser.specialityId;
    this.requestService.ListRequests(this.sortFilterObjects, 0, 0).subscribe(items => {
      this.lstRequests = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }

  getRequestsByStatusId(id: number) {
    this.statusId = id;
    this.page.pagenumber = 1;

    this.requestStatusService.GetRequestStatusByUserIdAndSpecialityId(this.currentUser.id, this.currentUser.specialityId).subscribe(statusObj => {
      this.lstStatuses = statusObj.listStatus;
      this.countOpen = statusObj.countOpen;
      this.countApproved = statusObj.countApproved;
      this.countClosed = statusObj.countClosed;
      this.countInProgress = statusObj.countInProgress;
      this.countSolved = statusObj.countSolved;
      this.countAll = statusObj.countAll;
    });

    this.sortFilterObjects.searchObj.statusId = id;
    this.sortFilterObjects.searchObj.userId = this.currentUser.id;
    this.sortFilterObjects.searchObj.specialityId = this.currentUser.specialityId;

    this.requestService.ListRequests(this.sortFilterObjects, 0, 0).subscribe(items => {
      this.lstRequests = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }
  addRequest() {
    const dialogRef2 = this.dialogService.open(AddrequestComponent, {
      header: this.lang == "en" ? 'Add Patient Ticket' : "إضافة سؤال",
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
  assignRequest(requestId: number) {
    const dialogRef2 = this.dialogService.open(AssignrequestComponent, {
      header: this.lang == "en" ? 'Assign Ticket' : "تعيين السؤال",
      data: {
        reqId: requestId
      },
      width: "60%",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 30
      }
    });

    dialogRef2.onClose.subscribe((res) => {
      this.reloadPage.reload();
    });
  }

  viewRequest(requestId: number) {
    const dialogRef2 = this.dialogService.open(ViewrequestComponent, {
      header: this.lang == "en" ? 'View Ticket' : "بيان السؤال",
      width: '70%',
      data: {
        reqId: requestId
      },
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 20
      }
    });

    dialogRef2.onClose.subscribe((res) => {
      this.reloadPage.reload();
    });
  }

  verifyRequest(requestId: number){
    const dialogRef2 = this.dialogService.open(VerifyrequestComponent, {
      header: this.lang == "en" ? 'Verify Ticket' : "التحقق من الطلب",
      width: '70%',
      data: {
        reqId: requestId
      },
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 20
      }
    });

    dialogRef2.onClose.subscribe((res) => {
      this.reloadPage.reload();
    });
  }


  doctorReply(requestId: number) {
    const dialogRef2 = this.dialogService.open(DoctorreplyComponent, {
      header: this.lang == "en" ? 'Doctor Answer' : "إجابة الطبيب",
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
  editRequest(id: number) {
    const ref = this.dialogService.open(EditrequestComponent, {
      header: this.lang == "en" ? "Edit Ticket" : "تعديل بيان",

      data: {
        reqId: id
      },
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
        "font-family": "sans-serif",
        "font-size": 40

      }

    });
    ref.onClose.subscribe((statusId: number) => {



    });
  }
  closeRequest(requestId: number) {
    this.confirmationService.confirm({
      //target: event.target as EventTarget,
      message: 'Do you sure you want to close this request?',
       header: 'Close request',
      // icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Yes',

      accept: () => {
        this.trackObj.requestId = requestId;
        this.trackObj.statusId = 5;
        this.trackObj.advice = this.lang == "en" ? "Closed" : "تم الحل";
        this.trackObj.createdById = this.currentUser.id;
        this.trackObj.strRespondDate = this.datePipe.transform(new Date, "yyyy-MM-dd HH:mm:ss");
        this.requestTrackingService.addRequestTrack(this.trackObj).subscribe({
          next: (trackId) => {
            this.display = true;
            this.reloadPage.reload();
          }
        });
      },
      reject: () => {
      },
  });

  }



  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  closeDialogue() {
    this.ref.close();
  }
}
