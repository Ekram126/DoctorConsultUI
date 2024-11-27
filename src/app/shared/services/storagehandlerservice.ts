// storage-handler.service.ts
import { Injectable, OnDestroy, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageHandlerService implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit() {
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    window.addEventListener('load', this.handleLoad);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
    window.removeEventListener('load', this.handleLoad);
  }

  private handleBeforeUnload = () => {
    sessionStorage.setItem('currentUser', 'true');
  };

  private handleLoad = () => {
    if (sessionStorage.getItem('currentUser')) {
      sessionStorage.removeItem('currentUser'); // Clean up
    }
  };
}
