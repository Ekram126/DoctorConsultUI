import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  CreateRequestTrackingVM, EditRequestTrackingVM, ListRequestTrackingVM, MainClass } from '../models/requestTrackingVM';
@Injectable({
  providedIn: 'root'
})
export class RequestTrackingService {

  constructor(private httpClient: HttpClient) { }
  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'
    })
  };


  addRequestTrack(trackObj:CreateRequestTrackingVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.addRequestTracking}`, trackObj, this.httpHeader);
  }

 updateRequestTrack(trackObj:EditRequestTrackingVM): Observable<any> {
    return this.httpClient.put<any>(`${environment.updateRequestTracking}`, trackObj, this.httpHeader);
  }



  getRequestTrackByRequestId(reqId:number): Observable<MainClass> {
    return this.httpClient.get<MainClass>(`${environment.getAllTrackingsByRequestId}${reqId}`, this.httpHeader);
  }

  getRequestTrackById(trackId:number): Observable<EditRequestTrackingVM> {
    return this.httpClient.get<EditRequestTrackingVM>(`${environment.getRequestTrackingById}${trackId}`, this.httpHeader);
  }


  sendEMailToPateint(trackObj:CreateRequestTrackingVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.sendMailToPatient}`, trackObj, this.httpHeader);
  }
}
