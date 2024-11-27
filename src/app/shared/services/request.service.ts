import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRequestVM, GeneratedRequestNumberVM, MainClass, RequestVM, SortAndFilterRequestVM } from '../models/requestVM';

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

 
  // updateRequest(editRequestVM: EditRequest): Observable<EditRequest> {
  //   return this.httpClient.put<EditRequest>(`${environment.UpdateRequest}`, editRequestVM, this.httpHeader);
  // }
  // DeleteRequest(id: Number): Observable<any> {
  //   return this.httpClient.delete<any>(`${environment.DeleteRequest}${id}`, this.httpHeader);
  // }


  // DeleteRequestDocument(id: Number): Observable<any> {
  //   return this.httpClient.delete<any>(`${environment.DeleteRequestDocument}${id}`, this.httpHeader);
  // }
 
 

}
