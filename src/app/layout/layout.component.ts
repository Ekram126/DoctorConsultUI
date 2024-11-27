import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, Subscription } from 'rxjs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppConfig, LayoutService } from '../shared/services/layoutservices/layout.service';

import { LayoutState } from '../shared/services/layoutservices/layout.service';
import { AuthenticationService } from '../shared/services/guards/authentication.service';
import { LoggedUser } from '../shared/models/userVM';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {
    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;
    profileMenuOutsideClickListener: any;
    config: AppConfig;
    state: LayoutState;
    lang = localStorage.getItem('lang');
    textDir: string = 'ltr';
    currentUser: LoggedUser;
    lstRoleNames: string[] = [];

    private overlayOpen = new Subject<any>();

    @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

    @ViewChild(NavbarComponent) appTopbar!: NavbarComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router,private authenticationService: AuthenticationService) {


        // const frontendStyles = document.createElement('link');
        // frontendStyles.rel = 'stylesheet';
        // frontendStyles.href = './assets/styles/layout/layout.scss';
        // document.head.appendChild(frontendStyles);



        this.config = this.layoutService._config;
        this.state = this.layoutService.state;

        this.currentUser = this.authenticationService.currentUserValue;
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                        || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
    }
    ngOnInit(): void {
        if (localStorage.getItem("lang") == null) {
            this.lang == 'en';
            this.textDir = "ltr";
        }

        if (localStorage.getItem('lang') == "en") {
            this.textDir = "ltr";
        }
        if (localStorage.getItem('lang') == "ar") {
            this.textDir = "rtl";
        }
       
     
        if(this.currentUser == null)
        {
           // this.layoutService.config().menuMode !== 'overlay';
            this.layoutService.config().menuMode = 'hidden';
            this.layoutService.state.overlayMenuActive = false;
            this.layoutService.state.staticMenuMobileActive = false;
            this.layoutService.state.menuHoverActive = false;
        }
    }
    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config().colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
            'layout-overlay': this.layoutService.config().menuMode === 'overlay',
            'layout-static': this.layoutService.config().menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config().menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config().inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config().ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }


    
  isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated();
  }
}
