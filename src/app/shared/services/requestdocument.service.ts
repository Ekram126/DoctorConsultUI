import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRequestDocumentVM, ListRequestDocumentVM } from '../models/requestDocumentVM';

@Injectable({
  providedIn: 'root'
})
export class RequestDocumentService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };


  createRequestDocuments(attachObj: CreateRequestDocumentVM): Observable<number> {
    return this.httpClient.post<number>(`${environment.createRequestDocuments}`, attachObj, this.httpHeader);
  }

  GetRequestDocumentsByRequestTrackingId(trackId: Number): Observable<ListRequestDocumentVM[]> {
    return this.httpClient.get<ListRequestDocumentVM[]>(`${environment.getRequestDocumentsByRequestTrackingId}${trackId}`, this.httpHeader);
  }
}
