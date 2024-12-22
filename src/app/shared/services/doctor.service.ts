import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateDoctorVM, DoctorUserRole, EditDoctorVM, GeneratedDoctorCodeVM, ListDoctorVM, MainClass, SortAndFilterDoctorVM, ViewDoctorVM } from '../models/doctorVM';
import { ListUserVM, LoggedUser } from '../models/userVM';



@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };



  GetDoctors(data: SortAndFilterDoctorVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.listDoctors}${pageNumber}/${pageSize}`,data, this.httpHeader);
  }

  GetAllDoctors(): Observable<any> {
    return this.httpClient.get(`${environment.listAllDoctors}`, this.httpHeader);
  }


 ViewDoctorById(id: number): Observable<ViewDoctorVM> {
    return this.httpClient.get<ViewDoctorVM>(`${environment.getDoctorById}${id}`, this.httpHeader);
  }


  GetDoctorById(id: number): Observable<EditDoctorVM> {
    return this.httpClient.get<EditDoctorVM>(`${environment.getDoctorById}${id}`, this.httpHeader);
  }

  GenerateDoctorCode(): Observable<GeneratedDoctorCodeVM> {
    return this.httpClient.get<GeneratedDoctorCodeVM>(`${environment.generateDoctorCode}`, this.httpHeader);
  }
  


  CreateDoctor(doctorVM: CreateDoctorVM): Observable<any> {
    return this.httpClient.post<any>(`${environment.addDoctor}`, doctorVM, this.httpHeader);
  }
  CreateDoctorAsUser(userObj: LoggedUser): Observable<any> {
    return this.httpClient.post<any>(`${environment.Register}`, userObj, this.httpHeader);
  }


  UpdateDoctor(DoctorVM: EditDoctorVM): Observable<EditDoctorVM> {
    return this.httpClient.put<EditDoctorVM>(`${environment.editDoctor}`, DoctorVM, this.httpHeader);
  }

  DeleteDoctor(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.deleteDoctor}${id}`, this.httpHeader);
  }

  //CheckDoctorRole
  CheckDoctorRole(doctorVM: DoctorUserRole): Observable<ListUserVM[]> {
    return this.httpClient.post<ListUserVM[]>(`${environment.checkDoctorRole}`, doctorVM, this.httpHeader);
  }


  getDoctorsBySpecialityId(specialityId: number): Observable<ListUserVM[]> {
    return this.httpClient.get<ListUserVM[]>(`${environment.GetDoctorsBySpecialityId}${specialityId}`, this.httpHeader);
  }



  UpdateDoctorImageAfterInsert(modelObj: CreateDoctorVM): Observable<number> {
    return this.httpClient.put<number>(`${environment.updateDoctorImageAfterInsert}`, modelObj, this.httpHeader);
  }
}
