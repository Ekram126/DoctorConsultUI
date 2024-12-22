import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRequestVM, EditRequestVM, GeneratedRequestNumberVM, MainClass, RequestVM, SortAndFilterRequestVM } from '../models/requestVM';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };


  ListRequests(data: SortAndFilterRequestVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.listRequests}${pageNumber}/${pageSize}`, data, this.httpHeader)
  }

  GenerateRequestNumber(): Observable<GeneratedRequestNumberVM> {
    return this.httpClient.get<GeneratedRequestNumberVM>(`${environment.generateRequestNumber}`, this.httpHeader);
  }
  addRequest(reqObj: CreateRequestVM): Observable<number> {
    return this.httpClient.post<number>(`${environment.addRequest}`, reqObj, this.httpHeader);
  }
  getRequestById(requestId: number): Observable<RequestVM> {
    return this.httpClient.get<RequestVM>(`${environment.getRequestById}${requestId}`, this.httpHeader);
  }

  getUnreadNotificationsCount(userId: String, specialityId: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.getUnreadNotificationsCount}${userId}/${specialityId}`, this.httpHeader);
  }


  updateIsReadRequest(reqObj: EditRequestVM): Observable<any> {
    return this.httpClient.put<any>(`${environment.updateIsReadRequest}`, reqObj, this.httpHeader);
  }

}
