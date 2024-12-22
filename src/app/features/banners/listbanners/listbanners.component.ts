import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EditbannerComponent } from '../editbanner/editbanner.component';
import { AddbannerComponent } from '../addbanner/addbanner.component';
import { ListBannerVM, SortAndFilterBannerVM } from 'src/app/shared/models/bannerVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { Paging } from 'src/app/shared/models/paging';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { BannerService } from 'src/app/shared/services/banner.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-listbanners',
  templateUrl: './listbanners.component.html',
  styleUrls: ['./listbanners.component.scss']
})
export class ListbannersComponent {
  lang = localStorage.getItem('lang');
  dir= localStorage.getItem('dir');
  currentUser: LoggedUser;
  lstBanners: ListBannerVM[] = [];
  page: Paging;
  sortFilterObjects: SortAndFilterBannerVM;
  count: number = 0;
  loading: boolean = true;
  isAdmin:boolean= false;
  lstRoleNames: string[] = [];
  sortStatus: string = "ascending";

  
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;
  
  constructor(private authenticationService: AuthenticationService,private bannerService: BannerService,
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


    this.bannerService.GetBanners(this.sortFilterObjects, 0, 0).subscribe(items => {
      this.lstBanners = items.results;
      this.lstBanners.forEach(element => {        
        if (element.bannerImg == null) {
          element.bannerImg = "../../../../assets/images/unknownBanner.png";
        }
        else if (element.bannerImg == "") {
          element.bannerImg = "../../../../assets/images/unknownBanner.png";
        }
        else {
          element.bannerImg = `${environment.Domain}UploadedAttachments/BannerImages/` + element.bannerImg;
        }
      });
      this.count = items.count;
      this.loading = false;
    });


    const nameField = this.lang === 'ar' ? 'nameAr' : 'name';

    this.sortOptions = [
      //  { label: this.translate.instant('SORT.NAME_DESC'), value: '!name' },
      { label: 'Banner Date Desc', value: '!bannerDate' },
      { label: 'Banner Date Asc', value: 'bannerDate' },
      { label: 'Name ASC', value: nameField },
      { label: 'Name DESC', value: `!${nameField}` },
    ];
  }


 

  addBanner() {
    const dialogRef2 = this.dialogService.open(AddbannerComponent, {
      header: this.lang == "en" ? 'Add Banner' : "اضف إعلان",
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


  editBanner(id: number) {
    const ref = this.dialogService.open(EditbannerComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Banner' : "تعديل دكتور",
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

}
