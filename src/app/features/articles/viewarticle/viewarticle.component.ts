import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {  ViewArticleVM } from 'src/app/shared/models/articleVM';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-viewarticle',
  templateUrl: './viewarticle.component.html',
  styleUrls: ['./viewarticle.component.scss']
})
export class ViewarticleComponent {
  currentUser: LoggedUser;
  public lang = localStorage.getItem('lang');
  textDir: string = 'ltr';
  articleObj: ViewArticleVM;
  lstSpecialists: ListSpecialistVM[] = [];
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  articleId: number;
  imgURL: string = "";
 file: File;


  isAdmin: boolean = false;
  lstRoleNames: string[] = [];
  constructor(
    private authenticationService: AuthenticationService, private articleService: ArticleService,private specialistService: SpecialistService,
    private config: DynamicDialogConfig, private ref: DynamicDialogRef) {
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

    this.articleObj = {
      articleContent: '', articleContentAr: '', articleImg: '', date: '', id: 0, isActive: false, orderId: 0, 
       title: '', titleAr: '',specialityName:'',specialityNameAr:'',articleDesc:'',articleDescAr:''
    };


    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });
    
    let id = this.config.data.id;
    this.articleId = id;
    this.articleService.ViewArticleById(id).subscribe((data) => {
      this.articleObj = data;
      this.articleId = this.articleObj.id;

      if (this.articleObj.articleImg == null) {
        this.imgURL = '../assets/images/unknownArticle.png';
      }
      else if (this.articleObj.articleImg == "") {
        this.imgURL = '../assets/images/unknownArticle.png';
      }
      else {
        this.imgURL = `${environment.Domain}UploadedAttachments/ArticleImages/` + data["articleImg"];
      }
    });
  }
}
