import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UploadResponse } from '@kolkov/angular-editor';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {


  constructor(private http: HttpClient) { }

  uploadRequestFiles(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const req = new HttpRequest('POST', `${environment.Domain}api/RequestDocument/UploadRequestFiles`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadArticleImage(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const req = new HttpRequest('POST', `${environment.Domain}api/Article/UploadArticleImage`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  uploadSpecialityImage(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const req = new HttpRequest('POST', `${environment.Domain}api/Specialist/UploadSpecialityFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  
  uploadDoctorImage(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const req = new HttpRequest('POST', `${environment.Domain}api/Doctor/UploadDoctorImage`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  uploadBannerImage(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const req = new HttpRequest('POST', `${environment.Domain}api/Banner/UploadBannerImage`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  uploadSectionImage(file: File, fileName: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, fileName);
    const req = new HttpRequest('POST', `${environment.Domain}api/Section/UploadSectionImage`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  downloadRequestTrackFile(fileName): any {
    return this.http.get(`${environment.Domain}UploadedAttachments/RequestDocuments/${fileName}`,
      { responseType: 'blob' });
  }


}