import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ViewVideoVM } from 'src/app/shared/models/videoVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-viewvideo',
  templateUrl: './viewvideo.component.html',
  styleUrls: ['./viewvideo.component.scss']
})
export class ViewvideoComponent implements OnInit{
  currentUser: LoggedUser;
  lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  videoObj: ViewVideoVM;
  isChecked = false;


  isAdmin: boolean = false;
  lstRoleNames: string[] = [];

  constructor(
    private authenticationService: AuthenticationService, private videoService: VideoService,    private config: DynamicDialogConfig) {
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

    this.videoObj = {videoURL:'',  brief: '', briefAr: '', articleImg: '', date: '', id: 0, isActive: false, orderId: 0, 
       title: '', titleAr: '',specialityName:'',specialityNameAr:''    };




    let id = this.config.data.id;
    this.videoService.ViewVideoById(id).subscribe((data) => {
      this.videoObj = data;
      this.isChecked  = data.isActive;
    });
  }






}
