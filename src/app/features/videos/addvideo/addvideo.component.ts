import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { CreateVideoVM } from 'src/app/shared/models/videoVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.scss']
})
export class AddvideoComponent implements OnInit {
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  currentUser: LoggedUser;
  errorMessage: string="";
  errorDisplay: boolean = false;
  display: boolean = false;
  videoObj: CreateVideoVM;
  articleId: number;
  lstSpecialists: ListSpecialistVM[] = [];


  constructor(private authenticationService: AuthenticationService, private ref: DynamicDialogRef, private videoService: VideoService, private specialistService: SpecialistService, private datePipe: DatePipe) { this.currentUser = this.authenticationService.currentUserValue; }
  ngOnInit(): void {
    this.videoObj = {
      videoURL: '',
      date: '', id: 0, isActive: false, orderId: 0, specialityId: 0, title: '', titleAr: '', artDate: new Date, brief: '', briefAr: ''
    }


    this.videoObj.artDate = new Date();

    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });
  }
  getVideoDate($event) {
    this.videoObj.date = this.datePipe.transform($event, "yyyy-MM-dd");
  }



  onSubmit() {
    if (this.videoObj.date == "")
      this.videoObj.date = this.datePipe.transform(new Date, "yyyy-MM-dd");



    this.videoService.CreateVideo(this.videoObj).subscribe({
      next: (artObj) => {
        this.articleId = artObj.id;
        this.videoObj.id = this.articleId;
        this.display = true;
        this.ref.close();
      },
      error: (e) => {
        this.errorDisplay = true;
        if (this.lang === 'en') {
          if (e.error.status === 'video') {
            this.errorMessage = e.error.message;
          }
        }
        if (this.lang === 'ar') {
          if (e.error.status === 'video') {
            this.errorMessage = e.error.messageAr;
          }
        }
        return false;
      },
      complete: () => console.info('complete')
    });

  }

  closeDialogue() {
    this.ref.close();
  }

}
