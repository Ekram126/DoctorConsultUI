import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Paging } from 'src/app/shared/models/paging';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ListVideoVM, SortAndFilterVideoVM } from 'src/app/shared/models/videoVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { AddvideoComponent } from '../addvideo/addvideo.component';
import { EditvideoComponent } from '../editvideo/editvideo.component';
import { ViewvideoComponent } from '../viewvideo/viewvideo.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-listvideos',
  templateUrl: './listvideos.component.html',
  styleUrls: ['./listvideos.component.scss']
})
export class ListvideosComponent  implements OnInit {
  lang = localStorage.getItem('lang');
  dir: string = "ltr";
  currentUser: LoggedUser;
  lstVideos: ListVideoVM[] = [];
  page: Paging;
  sortFilterObjects: SortAndFilterVideoVM;
  count: number = 0;
  loading: boolean = true;
  isAdmin:boolean= false;
  lstRoleNames: string[] = [];
  safeUrl: SafeResourceUrl;
  sortStatus: string = "ascending";
videoId:string="";

  constructor(private authenticationService: AuthenticationService,private videoService: VideoService,
    private reloadService:ReloadPageService,  public dialogService: DialogService,private sanitizer: DomSanitizer) { 
      
         this.currentUser = this.authenticationService.currentUserValue;}

  ngOnInit() {
    this.sortFilterObjects = {
      searchObj: {},
      sortObj: {sortBy:'', sortStatus:""}
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


    this.videoService.GetAllVideos(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstVideos = items.results;
      this.count = items.count;
      this.loading = false;
    });
  }

  addVideo() {
    const dialogRef2 = this.dialogService.open(AddvideoComponent, {
      header: this.lang == "en" ? 'Add Video' : "اضف فيديو",
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

    editVideo(id: number) {
    const ref = this.dialogService.open(EditvideoComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Video' : "تعديل فيديو",
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

  viewVideo(id: number) {
    const ref = this.dialogService.open(ViewvideoComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'View Video' : "بيانات فيديو",
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


    

    this.videoService.GetAllVideos(this.sortFilterObjects, this.page.pagenumber, this.page.pagesize).subscribe(items => {
      this.lstVideos = items.results;
      this.lstVideos .forEach(element => {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(element.videoURL);
      });
      this.count = items.count;
      this.loading = false;
    });

  }
}
