import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { EditSectionVM, ListSectionVM } from 'src/app/shared/models/sectionVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { ReloadPageService } from 'src/app/shared/services/reloadpage.service';
import { environment } from 'src/environments/environment';
import { EditsectionComponent } from '../editsection/editsection.component';
import { SectionService } from 'src/app/shared/services/section.service';
import { AddsectionComponent } from '../addsection/addsection.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-listsections',
  templateUrl: './listsections.component.html',
  styleUrls: ['./listsections.component.scss']
})
export class ListsectionsComponent {
  lang = localStorage.getItem('lang');
  dir: string = "ltr";
  currentUser: LoggedUser;
  lstSetions: ListSectionVM[] = [];
  selectedObj: EditSectionVM;
  count: number = 0;
  loading: boolean = true;
  isAdmin: boolean = false;
  lstRoleNames: string[] = [];
  imagePath: string;
  deleteMessage: string = "";
  sortStatus: string = "ascending";
  errorMessage: string = "";
  errorDisplay: boolean = false;
  isOpen = false;


  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;


  // safeHtml: SafeHtml;
  public safeHtmls: SafeHtml[] = []; 

  constructor(private authenticationService: AuthenticationService, 
    private sectionService: SectionService, private reloadService: ReloadPageService,
  public dialogService: DialogService,  private sanitizer: DomSanitizer) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit() {
    this.count = 0; // Initialize count
    if (this.currentUser) {
      this.currentUser["roleNames"].forEach(element => {
        this.lstRoleNames.push(element["name"]);
      });
      this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
    }
    this.loadSections();


    
    const titleField = this.lang === 'ar' ? 'titleAr' : 'title';

    this.sortOptions = [
      { label: 'Title ASC', value: titleField },
      { label: 'Title DESC', value: `!${titleField}` },
    ];
  }


  sanitizedHtmlForSection(section: any): SafeHtml {
    return this.lang === 'en' ? this.sanitizer.bypassSecurityTrustHtml(section.brief) : this.sanitizer.bypassSecurityTrustHtml(section.briefAr);
  }


  loadSections() {
    this.loading = true; // Start loading
    this.sectionService.GetSections().subscribe(items => {
      this.lstSetions = items;
      this.lstSetions.forEach(element => {
        if (element.sectionImg != null && element.sectionImg != "")
          element.sectionImg = `${environment.Domain}UploadedAttachments/SectionImages/` + element.sectionImg;
        else if (element.sectionImg == null)
          element.sectionImg = "../../../../assets/images/unknownSection.png";
        else if (element.sectionImg == "")
          element.sectionImg = "../../../../assets/images/unknownSection.png";
      });
      this.loading = false;
    });
  }

  
  addSection(id: number) {
    const ref = this.dialogService.open(AddsectionComponent, {
      header: this.lang == "en" ? 'Edit Section' : "تعديل  ",
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
 
  editSection(id: number) {
    const ref = this.dialogService.open(EditsectionComponent, {
      data: {
        id: id,
      },
      header: this.lang == "en" ? 'Edit Section' : "تعديل  ",
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
  // viewSection(id: number) {
  //   const ref = this.dialogService.open(ViewSectionComponent, {
  //     data: {
  //       id: id,
  //     },
  //     header: this.lang == "en" ? 'View Section' : "بيان المقال",
  //     width: '70%',
  //     style: {
  //       'dir': this.lang == "en" ? 'ltr' : "rtl",
  //       "text-align": this.lang == "en" ? 'left' : "right",
  //       "direction": this.lang == "en" ? 'ltr' : "rtl"
  //     }
  //   });
  // }



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

}
