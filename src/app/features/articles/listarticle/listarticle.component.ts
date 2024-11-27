import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EditArticleVM, ListArticleVM, SortAndFilterArticleVM } from 'src/app/shared/models/articleVM';
import { Paging } from 'src/app/shared/models/paging';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { AddarticleComponent } from '../addarticle/addarticle.component';
import { EditarticleComponent } from '../editarticle/editarticle.component';
import { ViewarticleComponent } from '../viewarticle/viewarticle.component';
import { environment } from 'src/environments/environment';
import { ConfirmationService, ConfirmEventType, MessageService, SelectItem } from 'primeng/api';
import { ListSpecialistVM } from 'src/app/shared/models/specialistVM';
import { SpecialistService } from 'src/app/shared/services/specialist.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listarticle',
  templateUrl: './listarticle.component.html',
  styleUrls: ['./listarticle.component.scss']
})
export class ListarticleComponent implements OnInit {
  lang = localStorage.getItem('lang');
  dir: string = "ltr";
  currentUser: LoggedUser;
  lstArticles: ListArticleVM[] = [];
  lstSpecialists: ListSpecialistVM[] = [];
  selectedObj: EditArticleVM;
  page: Paging;
  sortFilterObjects: SortAndFilterArticleVM;
  count: number = 0;
  loading: boolean = true;
  isAdmin: boolean = false;
  lstRoleNames: string[] = [];
  imagePath: string;
  deleteMessage: string = "";
  sortStatus: string = "ascending";
  sortOptions!: SelectItem[];
  errorMessage: string = "";
  errorDisplay: boolean = false;
  isOpen = false;





  sortOrder!: number;
  sortField!: string;


  constructor(private authenticationService: AuthenticationService, private articleService: ArticleService, private reloadService: ReloadPageService,
    private datePipe: DatePipe, public dialogService: DialogService, private specialistService: SpecialistService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit() {
    this.sortFilterObjects = {
      searchObj: { title: '', titleAr: '', specialityId: 0, isActive: true, end: '', start: '', endDate: null, startDate: null },
      sortObj: { sortBy: '', sortStatus: '' }
    };

    this.page = {
      pagenumber: 1, // Start on the first page
      pagesize: 5
    };
    this.count = 0; // Initialize count
    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
    }

    this.loadArticles();

    this.specialistService.GetSpecialists().subscribe(items => {
      this.lstSpecialists = items;
    });



    this.sortOptions = [
      { label: 'Title Desc', value: '!title' },
      { label: 'Title Asc', value: 'title' },
      { label: 'SpecialityName Asc', value: 'specialityName' },
      { label: 'SpecialityName Desc', value: '!specialityName' },
    ];
  }
  loadArticles() {
    this.loading = true; // Start loading
    this.articleService.GetAllArticles(this.sortFilterObjects, 0, 0).subscribe(items => {
      this.lstArticles = items.results;
      this.lstArticles.forEach(element => {
        if (element.articleImg != null && element.articleImg != "")
          element.articleImg = `${environment.Domain}UploadedAttachments/ArticleImages/` + element.articleImg;
        else if (element.articleImg == null)
          element.articleImg = "../../../../assets/images/unknownArticle.png";
        else if (element.articleImg == "")
          element.articleImg = "../../../../assets/images/unknownArticle.png";
      });
      this.count = items.count;
      this.loading = false;
    });
  }

  addArticle() {
    const dialogRef2 = this.dialogService.open(AddarticleComponent, {
      header: this.lang == "en" ? 'Add Article' : "اضف مقال",
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
  deleteArticle(id: number) {

    this.articleService.GetArticleById(id).subscribe(item => {
      this.selectedObj = item;
      this.deleteMessage = this.lang == "en" ? `Are you sure you want to delete ${this.selectedObj.title}?` : `Are you sure you want to delete ${this.selectedObj.titleAr}?`
      this.confirmationService.confirm({
        message: this.deleteMessage,

        accept: () => {
          this.articleService.DeleteArticle(this.selectedObj.id).subscribe(item => {
            this.reloadService.reload();
          });
        },
        reject: (type: ConfirmEventType) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
          }
        }
      });
    });

  }
  editArticle(id: number) {
    const ref = this.dialogService.open(EditarticleComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Article' : "تعديل في المقال",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
    ref.onClose.subscribe(() => {
      this.reloadService.reload();
    });
  }
  viewArticle(id: number) {
    const ref = this.dialogService.open(ViewarticleComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'View Article' : "بيان المقال",
      style: {
        'dir': this.lang == "en" ? 'ltr' : "rtl",
        "text-align": this.lang == "en" ? 'left' : "right",
        "direction": this.lang == "en" ? 'ltr' : "rtl"
      }
    });
  }

  toggleCollapse() {
    this.isOpen = !this.isOpen;
  }

  getStartDate($event) {
    this.sortFilterObjects.searchObj.start = this.datePipe.transform($event, "MM-dd-yyyy");
  }
  getEndDate($event) {
    this.sortFilterObjects.searchObj.end = this.datePipe.transform($event, "MM-dd-yyyy");
  }

  reset() {
    this.reloadService.reload();
  }
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onSearch() {

    this.loading = true; // Start loading
    this.articleService.GetAllArticles(this.sortFilterObjects, 0, 0).subscribe(items => {
      this.lstArticles = items.results;
      this.lstArticles.forEach(element => {
        if (element.articleImg != null && element.articleImg != "")
          element.articleImg = `${environment.Domain}UploadedAttachments/ArticleImages/` + element.articleImg;
        else if (element.articleImg == null)
          element.articleImg = "../../../../assets/images/unknownArticle.png";
        else if (element.articleImg == "")
          element.articleImg = "../../../../assets/images/unknownArticle.png";
      });
      this.count = items.count;
      this.loading = false;
    });



  }
}
