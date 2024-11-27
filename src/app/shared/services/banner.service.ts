import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateBannerVM,  EditBannerVM,  MainClass, SortAndFilterBannerVM, ViewBannerVM } from '../models/bannerVM';
import {  LoggedUser } from '../models/userVM';



@Injectable({
  providedIn: 'root'
})

export class BannerService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };



  GetBanners(data: SortAndFilterBannerVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.listBanners}${pageNumber}/${pageSize}`,data, this.httpHeader);
  }

  GetAllBanners(): Observable<any> {
    return this.httpClient.get(`${environment.listAllBanners}`, this.httpHeader);
  }


 ViewBannerById(id: number): Observable<ViewBannerVM> {
    return this.httpClient.get<ViewBannerVM>(`${environment.getBannerById}${id}`, this.httpHeader);
  }


  GetBannerById(id: number): Observable<EditBannerVM> {
    return this.httpClient.get<EditBannerVM>(`${environment.getBannerById}${id}`, this.httpHeader);
  }


  


  CreateBanner(BannerVM: CreateBannerVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.addBanner}`, BannerVM, this.httpHeader);
  }
  CreateBannerAsUser(userObj: LoggedUser): Observable<any> {
    return this.httpClient.post<any>(`${environment.Register}`, userObj, this.httpHeader);
  }


  UpdateBanner(BannerVM: EditBannerVM): Observable<EditBannerVM> {
    return this.httpClient.put<EditBannerVM>(`${environment.editBanner}`, BannerVM, this.httpHeader);
  }

  DeleteBanner(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.deleteBanner}${id}`, this.httpHeader);
  }






  UpdateBannerImageAfterInsert(modelObj: CreateBannerVM): Observable<number> {
    return this.httpClient.put<number>(`${environment.updateBannerImageAfterInsert}`, modelObj, this.httpHeader);
  }
}
