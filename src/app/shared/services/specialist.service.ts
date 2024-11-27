import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateSpecialistVM, EditSpecialistVM, ListSpecialistVM, MainClass, SortAndFilterSpecialistVM } from '../models/specialistVM';



@Injectable({
  providedIn: 'root'
})

export class SpecialistService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };

  GetSpecialists(): Observable<ListSpecialistVM[]> {
    return this.httpClient.get<ListSpecialistVM[]>(`${environment.listSpecialists}`, this.httpHeader);
  }

  ListSpecialistsByPages(data: SortAndFilterSpecialistVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.ListSpecialistsByPages}${pageNumber}/${pageSize}`,data, this.httpHeader);
  }

  
  GetSpecialistById(id: number): Observable<EditSpecialistVM> {
    return this.httpClient.get<EditSpecialistVM>(`${environment.getSpecialistById}${id}`, this.httpHeader);
  }
  CreateSpecialist(SpecialistVM: CreateSpecialistVM): Observable<CreateSpecialistVM> {
    return this.httpClient.post<any>(`${environment.addSpecialist}`, SpecialistVM, this.httpHeader);
  }


  UpdateSpecialist(SpecialistVM: EditSpecialistVM): Observable<EditSpecialistVM> {
    return this.httpClient.put<EditSpecialistVM>(`${environment.editSpecialist}`, SpecialistVM, this.httpHeader);
  }

  DeleteSpecialist(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.deleteSpecialist}${id}`, this.httpHeader);
  }

  GenerateSpecialityNumber(): Observable<any> {
    return this.httpClient.get<any>(`${environment.generateSpecialityNumber}`, this.httpHeader);
  }

  AutoCompleteSpecialityName(name:string): Observable<ListSpecialistVM[]> {
    return this.httpClient.get<ListSpecialistVM[]>(`${environment.autoCompleteSpecialityName}${name}`, this.httpHeader);
  }

  
}
