import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ListArticleVM } from 'src/app/shared/models/articleVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdarticle',
  templateUrl: './cdarticle.component.html',
  styleUrls: ['./cdarticle.component.scss']
})

export class CdarticleComponent implements OnInit {


  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');


  lstArticles: ListArticleVM[] = [];

  articleOptions: OwlOptions = {
    loop: true,
    rtl: this.lang == "en" ? false : true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    navText: this.lang == "en" ? ["<i class='bi bi-arrow-left'></i>", "<i class='bi bi-arrow-right'></i>"] : ["<i class='bi bi-arrow-right'></i>", "<i class='bi bi-arrow-left'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      576: {
        items: 2 // Show 2 items on small screens
      },
      600: {
        items: 3
      },
      768: {
        items: 4 // Show 3 items on medium screens
      },
      740: {
        items: 4
      },
      940: {
        items:4
      },
      1000: {
        items: 4
      },
      992: {
        items: 4 // Show 3 items on large screens
      }
    },
    nav: true
  }

  constructor(private articleService: ArticleService) {

  }
  ngOnInit(): void {

    this.LoadArticles();
  }

  LoadArticles() {
    this.articleService.listActivatedArticles().subscribe(items => {
      this.lstArticles = items;
      this.lstArticles.forEach(element => {
        element.date = this.lang === 'en' ? new Date(element.date).toLocaleDateString('en-Us', { day: 'numeric', month: 'long', year: 'numeric' }) : new Date(element.date).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });

        if (element.articleImg == null) {
          element.articleImg = "assets/images/unknownArticle.png";
        }
        else if (element.articleImg == "") {
          element.articleImg = "assets/images/unknownArticle.png";
        }
        else {
          element.articleImg= `${environment.Domain}UploadedAttachments/ArticleImages/` + element.articleImg;
        }
      });
    });
  }

}
