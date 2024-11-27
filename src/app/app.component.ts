import { Component, OnInit } from '@angular/core';
import { StorageHandlerService } from './shared/services/storagehandlerservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DoctorMasry';

  lang =  localStorage.getItem("lang")
  direction=  localStorage.getItem("dir")


  constructor(private storageHandler: StorageHandlerService) {
    this.storageHandler.ngOnInit(); // Ensure the service initializes
  }

  
  ngOnInit(): void {
    if (this.lang == undefined) {
      localStorage.setItem('lang', "en");
      localStorage.setItem('dir', "ltr");
    }
    else
    {
      localStorage.setItem('lang', this.lang);
      localStorage.setItem('dir', this.direction);
    }
  }


  
}
