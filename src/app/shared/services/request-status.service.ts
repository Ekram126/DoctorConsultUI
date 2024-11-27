import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {MainClass } from '../../shared/models/requestStatusVM';
@Injectable({
  providedIn: 'root'
})
export class RequestStatusService {


  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };



  GetRequestStatusByUserId(userId: string): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.getRequestStatusByUserId}${userId}`, this.httpHeader);
  }


  GetRequestStatusByUserIdAndSpecialityId(userId: string,specialityId:number): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.getRequestStatusByUserIdAndSpecialityId}${userId}/${specialityId}`, this.httpHeader);
  }

}
