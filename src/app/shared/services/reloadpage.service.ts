
  import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

  
  @Injectable({
    providedIn: 'root'
  })
  
  export class ReloadPageService {
    constructor(private router: Router) { }
  
    reload() {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }  
  }
  