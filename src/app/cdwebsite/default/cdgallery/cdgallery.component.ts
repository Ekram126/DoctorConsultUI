import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Galleria } from 'primeng/galleria';
import { ListBannerVM } from 'src/app/shared/models/bannerVM';
import { BannerService } from 'src/app/shared/services/banner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cdgallery',
  templateUrl: './cdgallery.component.html',
  styleUrls: ['./cdgallery.component.scss']
})
export class CdgalleryComponent {
  lang = localStorage.getItem('lang');
  textDir = localStorage.getItem('dir');
  lstBanners: ListBannerVM[] = [];
  showThumbnails: boolean | undefined;

  constructor(private bannerService: BannerService, public dialogService: DialogService,@Inject(PLATFORM_ID) private platformId: any,  private cd: ChangeDetectorRef) { }
  ngOnInit(): void {

    const currentPage = window.location.pathname;
    const frontendStyles = document.createElement('link');
    frontendStyles.rel = 'stylesheet';
    frontendStyles.href = './assets/css/theme.css';
    document.head.appendChild(frontendStyles);

    this.LoadBanners();
    this.bindDocumentListeners();
    
  }
  LoadBanners() {
    this.bannerService.GetAllBanners().subscribe(items => {
      this.lstBanners = items;
      this.lstBanners.forEach(element => {
        if (element.bannerImg == null) {
          element.bannerImg = "assets/images/unknownBanner.jpg";
        }
        else if (element.bannerImg == "") {
          element.bannerImg = "assets/images/unknownBanner.jpg";
        }
        else {
          element.bannerImg = `${environment.Domain}UploadedAttachments/BannerImages/` + element.bannerImg;
        }
      });
    });
  }

  fullscreen: boolean = false;

  activeIndex: number = 0;

  onFullScreenListener: any;

  @ViewChild('galleria') galleria: Galleria | undefined;

  responsiveOptions: any[] = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  


  onThumbnailButtonClick() {
      this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
      if (this.fullscreen) {
          this.closePreviewFullScreen();
      } else {
          this.openPreviewFullScreen();
      }

      this.cd.detach();
  }

  openPreviewFullScreen() {
      let elem = this.galleria?.element.nativeElement.querySelector('.p-galleria');
      if (elem.requestFullscreen) {
          elem.requestFullscreen();
      } else if (elem['mozRequestFullScreen']) {
          /* Firefox */
          elem['mozRequestFullScreen']();
      } else if (elem['webkitRequestFullscreen']) {
          /* Chrome, Safari & Opera */
          elem['webkitRequestFullscreen']();
      } else if (elem['msRequestFullscreen']) {
          /* IE/Edge */
          elem['msRequestFullscreen']();
      }
  }

  onFullScreenChange() {
      this.fullscreen = !this.fullscreen;
      this.cd.detectChanges();
      this.cd.reattach();
  }

  closePreviewFullScreen() {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document['mozCancelFullScreen']) {
          document['mozCancelFullScreen']();
      } else if (document['webkitExitFullscreen']) {
          document['webkitExitFullscreen']();
      } else if (document['msExitFullscreen']) {
          document['msExitFullscreen']();
      }
  }

  bindDocumentListeners() {
      this.onFullScreenListener = this.onFullScreenChange.bind(this);
      document.addEventListener('fullscreenchange', this.onFullScreenListener);
      document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
      document.addEventListener('webkitfullscreenchange', this.onFullScreenListener);
      document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
      document.removeEventListener('fullscreenchange', this.onFullScreenListener);
      document.removeEventListener('mozfullscreenchange', this.onFullScreenListener);
      document.removeEventListener('webkitfullscreenchange', this.onFullScreenListener);
      document.removeEventListener('msfullscreenchange', this.onFullScreenListener);
      this.onFullScreenListener = null;
  }

  ngOnDestroy() {
      this.unbindDocumentListeners();
  }

  galleriaClass() {
      return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
      return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }
}
