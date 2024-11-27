import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ViewArticleVM } from 'src/app/shared/models/articleVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdarticledetail',
  templateUrl: './cdarticledetail.component.html',
  styleUrls: ['./cdarticledetail.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CdarticledetailComponent implements OnInit {

  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  articleObj: ViewArticleVM;
  articleId: number = 0;
  articleImg: string = "";

  safeHtml: SafeHtml;

  constructor(private articleService: ArticleService, private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);
    
    this.articleObj = {
      articleContent: '', articleContentAr: '', articleImg: '', date: '', id: 0, isActive: false, orderId: 0,
      title: '', titleAr: '', specialityName: '', specialityNameAr: '', articleDesc: '', articleDescAr: ''
    };

    this.articleId = this.activatedRoute.snapshot.params["id"];
    this.articleService.ViewArticleById(this.articleId).subscribe({
      next: (item) => {
        this.articleObj = item;
        this.articleObj.date = this.lang === 'en' ? new Date(item.date).toLocaleDateString('en-Us', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date(item.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });


        this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
          this.lang === 'en' ? this.articleObj.articleDesc : this.articleObj.articleDescAr
        );
       

        if (item.articleImg == null) {
          this.articleImg = "assets/images/unknownArticle.png";
        }
        else if (item.articleImg == "") {
          this.articleImg = "assets/images/unknownArticle.png";
        }
        else {
          this.articleImg = `${environment.Domain}UploadedAttachments/ArticleImages/` + item.articleImg;
        }
      },
      error: (err) => {
        console.log(err);
      }
  });
  }
}
