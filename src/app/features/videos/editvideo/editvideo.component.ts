import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { EditVideoVM } from 'src/app/shared/models/videoVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-editvideo',
  templateUrl: './editvideo.component.html',
  styleUrls: ['./editvideo.component.scss']
})
export class EditvideoComponent {
  currentUser: LoggedUser;
  lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  videoObj: EditVideoVM;
  lstSpecialists: ListSpecialistVM[] = [];
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  articleId: number;
  articleDate: Date;
  isChecked = false;


  isAdmin: boolean = false;
  lstRoleNames: string[] = [];

  constructor(
    private authenticationService: AuthenticationService, private videoService: VideoService, private specialistService: SpecialistService,
    private config: DynamicDialogConfig, private ref: DynamicDialogRef, private datePipe: DatePipe, private reloadService: ReloadPageService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }



  ngOnInit(): void {
    if (this.lang == 'en') {
      this.textDir = 'ltr';
    } else if (this.lang == 'ar') {
      this.textDir = 'rtl';
    }
    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });

      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
    }

    this.videoObj = {videoURL:'',videoDate: new Date,  brief: '', briefAr: '', articleImg: '', date: '', id: 0, isActive: false, orderId: 0, specialityId: 0, title: '', titleAr: ''    };


    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });

    let id = this.config.data.id;
    this.articleId = id;
    this.videoService.GetVideoById(id).subscribe((data) => {
      this.videoObj = data;
      this.videoObj.videoDate = new Date(data.date);
      this.isChecked  = data.isActive;
    


      this.articleDate = new Date(data.date);
      this.articleId = this.videoObj.id;
    });
  }

  getVideoDate($event) {
    this.videoObj.date = this.datePipe.transform($event, "yyyy-MM-dd");
  }


  onSubmit() {



    if (this.videoObj.date == "")
      this.videoObj.date = this.datePipe.transform(new Date, "yyyy-MM-dd");


    this.videoService.UpdateVideo(this.videoObj).subscribe(assetObj => {

    
        this.display = true;
        this.ref.close();
  
      this.reloadService.reload();

    },
      (error) => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.message;
          }

        }
        if (this.lang == 'ar') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.messageAr;
          }

        }
        return false;
      }
    );
  }




}
