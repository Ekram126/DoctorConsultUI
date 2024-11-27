
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})


export class PageNavigationService {
    constructor(private router: Router) { }
    navigateToMain() {
        this.router.navigate(['/']);
    }
}