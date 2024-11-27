import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class ThemeService {
  private theme = 'theme';
  private fronttheme = 'layout';


  getBackTheme() {
    return this.theme;
  }
 
  getFrontTheme() {
    return this.fronttheme;
  }
  setBackTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
  }

  setFrontTheme(fronttheme: string) {
    this.fronttheme = fronttheme;
    localStorage.setItem('layout', fronttheme);
  }



//   toggleTheme() {
//     this.theme = this.theme === 'dark-theme' ? 'light-theme' : 'dark-theme';
//     localStorage.setItem('theme', this.theme);
//   }
}