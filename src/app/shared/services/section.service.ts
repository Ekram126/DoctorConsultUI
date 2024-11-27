import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  CreateSectionVM, EditSectionVM, ListSectionVM} from '../models/sectionVM';



@Injectable({
  providedIn: 'root'
})

export class SectionService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };



  GetSections(): Observable<ListSectionVM[]> {
    return this.httpClient.get<ListSectionVM[]>(`${environment.listSections}`, this.httpHeader);
  }



  SelectSectionsInAbout(): Observable<ListSectionVM[]> {
    return this.httpClient.get<ListSectionVM[]>(`${environment.selectSectionsInAbout}`, this.httpHeader);
  }

  
  GetSectionById(id: number): Observable<EditSectionVM> {
    return this.httpClient.get<EditSectionVM>(`${environment.getSectionById}${id}`, this.httpHeader);
  }

  CreateSection(sectionObj: CreateSectionVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.addSection}`, sectionObj, this.httpHeader);
  }
  UpdateSection(sectionVM: EditSectionVM): Observable<EditSectionVM> {
    return this.httpClient.put<EditSectionVM>(`${environment.editSection}`, sectionVM, this.httpHeader);
  }

  DeleteSection(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.deleteSection}${id}`, this.httpHeader);
  }


  UpdateSectionImageAfterInsert(modelObj: EditSectionVM): Observable<number> {
    return this.httpClient.put<number>(`${environment.updateSectionImageAfterInsert}`, modelObj, this.httpHeader);
  }
  
}
