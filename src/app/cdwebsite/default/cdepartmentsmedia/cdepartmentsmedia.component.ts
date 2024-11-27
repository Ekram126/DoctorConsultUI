import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListArticleVM } from 'src/app/shared/models/articleVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ListVideoVM } from 'src/app/shared/models/videoVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { VideoService } from 'src/app/shared/services/video.service';
import { CdcreatepatientComponent } from '../cdcreatepatient/cdcreatepatient.component';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { AddrequestComponent } from 'src/app/features/requests/addrequest/addrequest.component';

@Component({
  selector: 'app-cdepartmentsmedia',
  templateUrl: './cdepartmentsmedia.component.html',
  styleUrls: ['./cdepartmentsmedia.component.scss']
})
export class CdepartmentsmediaComponent implements OnInit {


  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  currentUser: LoggedUser;
  lstSpecialityArticles: ListArticleVM[] = [];
  lstSpecialityVideos: ListVideoVM[] = [];
  specialityId: number = 0;
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;

  lstRoleNames: string[] = [];


  isPatient: boolean = false;
  isSupervisor: boolean = false;
  isDoctor: boolean = false;
  isAdmin: boolean = false;
  userRole: string = '';
  isLoggedIn: boolean = false;


  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef, private dialogService: DialogService, private reloadService: ReloadPageService,
    private articleService: ArticleService, private videoService: VideoService, private config: DynamicDialogConfig,
    private route: Router, private activeRoute: ActivatedRoute) { this.currentUser = this.authenticationService.currentUserValue; }
  ngOnInit(): void {



    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
      this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));
      this.isSupervisor = (['SupervisorDoctor'].some(r => this.lstRoleNames.includes(r)));
      this.isDoctor = (['Doctor'].some(r => this.lstRoleNames.includes(r)));
    }



    if (this.activeRoute.snapshot.params != null) {
      let id = this.activeRoute.snapshot.params['id'];
      this.specialityId = id;
    }



    if (this.config.data != null) {
      let specialityId = this.config.data.specialityId;
      this.specialityId = specialityId;
    }
  }

  getArticles(specialId: number) {
    specialId = this.specialityId;
    this.articleService.GetActivatedArticlesBySpecialityId(specialId).subscribe({
      next: (items) => {
        this.lstSpecialityArticles = items;
        this.ref.close();
        this.route.navigate(['articlemediadetail', this.specialityId]);
      }
    });
  }

  getVideos(specialId: number) {
    specialId = this.specialityId;

    this.videoService.GetActivatedVideosBySpecialityId(specialId).subscribe({
      next: (items) => {
        this.lstSpecialityVideos = items;
        this.ref.close();
        this.route.navigate(['videomediadetail', this.specialityId]);
      }
    });
  }



  registerPatient() {
    const dialogRef2 = this.dialogService.open(CdcreatepatientComponent, {
      header: this.lang == "en" ? 'Please Register for Consultation ' : "سجل هنا للتواصل مع الطبيب المختص",
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


  createRequest(specialityId: number) {
    const dialogRef2 = this.dialogService.open(AddrequestComponent, {
      header: this.lang == "en" ? 'Please Register for Consultation' : "سجل هنا للتواصل مع الطبيب المختص",
      data: { id: specialityId},
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl",
      }
    });
    dialogRef2.onClose.subscribe((res) => {
      this.reloadService.reload();
    });
  }



  handleRegisterClick(specialId?: number) {
    if (this.isPatient) {
      this.createRequest(specialId);
    }
    else {
      this.registerPatient();
    }
  }

}
