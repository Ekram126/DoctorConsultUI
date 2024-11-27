import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateVideoVM, EditVideoVM, ListVideoVM, MainClass, SortAndFilterVideoVM, ViewVideoVM } from '../models/videoVM';



@Injectable({
  providedIn: 'root'
})

export class VideoService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };




  GetVideos(): Observable<ListVideoVM[]> {
    return this.httpClient.get<ListVideoVM[]>(`${environment.listAllVideos}`, this.httpHeader);
  }

  listActivatedVideos(): Observable<ListVideoVM[]> {
    return this.httpClient.get<ListVideoVM[]>(`${environment.listActivatedVideos}`, this.httpHeader);
  }


  GetActivatedVideosBySpecialityId(specialityId:number): Observable<ListVideoVM[]> {
    return this.httpClient.get<ListVideoVM[]>(`${environment.GetActivatedVideosBySpecialityId}${specialityId}`, this.httpHeader);
  }

  
  GetAllVideos(data: SortAndFilterVideoVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.listVideos}${pageNumber}/${pageSize}`,data, this.httpHeader);
  }

  GetVideoById(id: number): Observable<EditVideoVM> {
    return this.httpClient.get<EditVideoVM>(`${environment.getVideoById}${id}`, this.httpHeader);
  }

  ViewVideoById(id: number): Observable<ViewVideoVM> {
    return this.httpClient.get<ViewVideoVM>(`${environment.getVideoById}${id}`, this.httpHeader);
  }



  CreateVideo(VideoVM: CreateVideoVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.addVideo}`, VideoVM, this.httpHeader);
  }

  UpdateVideo(VideoVM: EditVideoVM): Observable<EditVideoVM> {
    return this.httpClient.put<EditVideoVM>(`${environment.editVideo}`, VideoVM, this.httpHeader);
  }

  DeleteVideo(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.deleteVideo}${id}`, this.httpHeader);
  }


  UpdateVideoImageAfterInsert(modelObj: CreateVideoVM): Observable<number> {
    return this.httpClient.put<number>(`${environment.updateVideoImageAfterInsert}`, modelObj, this.httpHeader);
  }
}
