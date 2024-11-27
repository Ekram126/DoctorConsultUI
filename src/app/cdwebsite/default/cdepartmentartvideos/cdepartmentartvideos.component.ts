import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component ,OnInit} from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AddrequestComponent } from 'src/app/features/requests/addrequest/addrequest.component';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ListVideoVM, ViewVideoVM } from 'src/app/shared/models/videoVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { PageNavigationService } from 'src/app/shared/services/pagenavigation.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { VideoService } from 'src/app/shared/services/video.service';

@Component({
  selector: 'app-cdepartmentartvideos',
  templateUrl: './cdepartmentartvideos.component.html',
  styleUrls: ['./cdepartmentartvideos.component.scss']
})
export class CdepartmentartvideosComponent implements OnInit{
  gridCols: number = 4;
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  currentUser: LoggedUser;
  lstSpecialityVideos: ListVideoVM[] = [];
  videoObj :ViewVideoVM;
  articleImg: string = "";
  safeUrl: SafeResourceUrl;
  specialId: number = 0;
  selectedVideo:boolean= false;
  
  lstRoleNames: string[] = [];
  isPatient: boolean = false;

  specialName: string = "";
  constructor(private breakpointObserver: BreakpointObserver,private authenticationService: AuthenticationService, private videoService: VideoService,private sanitizer: DomSanitizer,
    private route: Router, private activeRoute: ActivatedRoute,private pageNavigationService:PageNavigationService,
    public dialogService: DialogService, private specialityService: SpecialistService,private reloadPage: ReloadPageService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);
    

    
    this.breakpointObserver.observe([
      Breakpoints.Handset // Small screens
    ]).subscribe(result => {
      if (result.matches) {
        this.gridCols = 1; // One column on small screens
      } else {
        this.gridCols = 4; // Four columns on larger screens
      }
    });



    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));
    }


    this.videoObj={articleImg:'',brief:'',briefAr:'',date:'',id:0,isActive:false,orderId:0,specialityName:'',specialityNameAr:'',title:'',titleAr:'',videoURL:''}
    let specialityId = this.activeRoute.snapshot.params['specialityId'];
    this.specialId = specialityId;
    this.specialityService.GetSpecialistById(this.specialId).subscribe({
      next: (item) => {
        this.specialName = this.lang == "en" ? item.name : item.nameAr;
      }
    });
    this.videoService.GetActivatedVideosBySpecialityId(specialityId).subscribe({
      next: (items) => {
        this.lstSpecialityVideos = items;

        this.lstSpecialityVideos .forEach(element => {
        element.date= this.lang === 'en' ? new Date(element.date).toLocaleDateString('en-Us', { day: 'numeric', month: 'long', year: 'numeric' }): new Date(element.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
       });
      }
    });

  }

  
  openVideoPopup(videoId:number){
    this.selectedVideo= true;
   this.videoService.ViewVideoById(videoId).subscribe(vd=>{
    this.videoObj =vd;
    this.videoObj.videoURL= this.videoObj.videoURL; 
   })
  }
  goBack()
  {
    this.pageNavigationService.navigateToMain();
  }


  needConsult() {
    const ref = this.dialogService.open(AddrequestComponent, {
      data: {
        id: this.specialId,
      },
      header: this.lang == "en" ? 'Register for Consultation' :  "سجل هنا للتواصل مع الطبيب المختص",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    ref.onClose.subscribe((res) => {
      this.reloadPage.reload();
    });
  }
}
