import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { AddrequestComponent } from 'src/app/features/requests/addrequest/addrequest.component';
import { ListArticleVM } from 'src/app/shared/models/articleVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { PageNavigationService } from 'src/app/shared/services/pagenavigation.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cdepartmentarticles',
  templateUrl: './cdepartmentarticles.component.html',
  styleUrls: ['./cdepartmentarticles.component.scss']
})
export class CdepartmentarticlesComponent implements OnInit {

  gridCols: number = 7;
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  currentUser: LoggedUser;
  lstSpecialityArticles: ListArticleVM[] = [];
  articleImg: string = "";

  specialId: number = 0;

  specialName: string = "";
  lstRoleNames: string[] = [];
  isPatient: boolean = false;
  constructor(private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService, private articleService: ArticleService, private pageNavigationService: PageNavigationService,
    private route: Router, private specialityService: SpecialistService, private activeRoute: ActivatedRoute, public dialogService: DialogService, private reloadPage: ReloadPageService) { this.currentUser = this.authenticationService.currentUserValue; }

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
        this.gridCols = 6; // Four columns on larger screens
      }
    });


    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isPatient = (['Patient'].some(r => this.lstRoleNames.includes(r)));
    }


    let specialityId = this.activeRoute.snapshot.params['specialityId'];
    this.specialId = specialityId;
    this.specialityService.GetSpecialistById(this.specialId).subscribe({
      next: (item) => {
        this.specialName = this.lang == "en" ? item.name : item.nameAr;
      }
    });

    
    this.articleService.GetActivatedArticlesBySpecialityId(specialityId).subscribe({
      next: (items) => {
        this.lstSpecialityArticles = items;
        this.lstSpecialityArticles.forEach(element => {
          element.date = this.lang === 'en' ? new Date(element.date).toLocaleDateString('en-Us', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date(element.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
          if (element.articleImg == null) {
            element.articleImg = "assets/images/unknownArticle.png";
          }
          else if (element.articleImg == "") {
            element.articleImg = "assets/images/unknownArticle.png";
          }
          else {
            element.articleImg = `${environment.Domain}UploadedAttachments/ArticleImages/` + element.articleImg;
          }
        });
      }
    });



  }
  artDetails(artId: number) {
    this.route.navigate(['articledetail', artId]);
  }
  goBack() {
    this.pageNavigationService.navigateToMain();
  }
  needConsult() {
    const ref = this.dialogService.open(AddrequestComponent, {
      data: {
        id: this.specialId,
      },
      header: this.lang == "en" ? 'Register for Consultation' : "سجل هنا للتواصل مع الطبيب المختص",
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
