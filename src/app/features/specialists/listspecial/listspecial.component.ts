import { Component, OnInit, ViewChild } from '@angular/core';
import { ListSpecialistVM, SortAndFilterSpecialistVM, ViewSpecialistVM } from 'src/app/shared/models/specialistVM';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { AddspecialComponent } from '../addspecial/addspecial.component';
import { EditspecialComponent } from '../editspecial/editspecial.component';
import { DialogService } from 'primeng/dynamicdialog';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ViewspecialComponent } from '../viewspecial/viewspecial.component';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Paging } from 'src/app/shared/models/paging';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-listspecial',
  templateUrl: './listspecial.component.html',
  styleUrls: ['./listspecial.component.scss']
})
export class ListspecialComponent implements OnInit {

  lang = localStorage.getItem('lang');
  dir: string = "ltr";
  currentUser: LoggedUser;
  lstSpecialists: ListSpecialistVM[] = [];
  selectedObj: ViewSpecialistVM;
  deleteMessage: string = "";
  page: Paging;
  count: number;
  sortFilterObjects: SortAndFilterSpecialistVM;
  sortStatus: string = "ascending";
  loading: boolean = true;
  lstAutoCompleteSearch: ListSpecialistVM[] = [];
  isCollapsed = true;
  selectedSpeciality:any;
  constructor(private authenticationService: AuthenticationService,
    private specialistService: SpecialistService, private reloadService: ReloadPageService,
    public dialogService: DialogService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.page = {
      pagenumber: 1,
      pagesize: 10,
    }
    this.sortFilterObjects = {
      searchObj: { id:0, code: 0, name: '', nameAr: '' },
      sortObj: { code: 0, name: '', nameAr: '', sortBy: '', sortStatus: '' }
    };
  }

  loadSpecialities(event) {

    this.page.pagenumber = (event.first + 10) / 10;
    this.page.pagesize = event.rows;

    this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
    this.specialistService.ListSpecialistsByPages(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstSpecialists = items.results;

      this.lstSpecialists.forEach(element => {
        if (element.pngIcon != null && element.pngIcon != "")
          element.pngIcon = `${environment.Domain}UploadedAttachments/SprcialityFiles/` + element.pngIcon;
        else if (element.pngIcon == null)
          element.pngIcon =       '../../../../assets/img/icons/unknowndepartment.png' ;
        else if (element.pngIcon == "")
          element.pngIcon =   '../../../../assets/img/icons/unknowndepartment.png' ;
      });


      this.count = items.count;
      this.loading = false;
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
    this.specialistService.ListSpecialistsByPages(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstSpecialists = items.results;
      this.count = items.count;
      this.loading = false;
    });

  }

  onSearch() {
    this.specialistService.ListSpecialistsByPages(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstSpecialists = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }
  clearSearch() {
    this.lstAutoCompleteSearch = [];
    this.sortFilterObjects.sortObj.sortStatus = this.sortStatus;
    this.sortFilterObjects.searchObj.id=0;
    this.specialistService.ListSpecialistsByPages(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstSpecialists = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }
  toggleContent(): void {
    this.isCollapsed = !this.isCollapsed;
  }


  onSelectionChanged(event) {
    this.specialistService.AutoCompleteSpecialityName(event.query).subscribe(items => {
      this.lstAutoCompleteSearch = items;
      if (this.lang == "en") {

        this.lstAutoCompleteSearch.forEach(item => item.name = item.name);
      }
      else {
        this.lstAutoCompleteSearch.forEach(item => item.name = item.nameAr);
      }
    });
  }


  getItemName(event) {


    this.sortFilterObjects.searchObj.id= event.value["id"] 

    this.specialistService.ListSpecialistsByPages(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstSpecialists = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }
  addSpecial() {
    const dialogRef2 = this.dialogService.open(AddspecialComponent, {
      header: this.lang == "en" ? 'Add Special' : "اضف تخصص",
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
  deleteSpecial(id: number) {

    this.specialistService.GetSpecialistById(id).subscribe(item => {
      this.selectedObj = item;
      this.deleteMessage = this.lang == "en" ? `Are you sure you want to delete ${this.selectedObj.name}?` : `Are you sure you want to delete ${this.selectedObj.nameAr}?`
      this.confirmationService.confirm({
        message: this.deleteMessage,

        accept: () => {
          this.specialistService.DeleteSpecialist(this.selectedObj.id).subscribe(item => {
            this.reloadService.reload();
          });
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
          }
        }
      });
    })



  }
  editSpecial(id: number) {
    const ref = this.dialogService.open(EditspecialComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Special' : "تعديل تخصص",
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
  viewSpecial(id: number) {
    const ref = this.dialogService.open(ViewspecialComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'View Special' : "بيانات تخصص",
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
}
