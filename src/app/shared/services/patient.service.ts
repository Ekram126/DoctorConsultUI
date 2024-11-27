import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePatientVM, EditPatientVM, GeneratedPatientNumberVM, ListPatientVM, MainClass, SortAndFilterPatientVM } from '../models/patientVM';
import { LoggedUser } from '../models/userVM';



@Injectable({
  providedIn: 'root'
})

export class PatientService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };
  GetPatients(data: SortAndFilterPatientVM, pageNumber: number, pageSize: number): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.listPatients}${pageNumber}/${pageSize}`,data, this.httpHeader);
  }

  ListAllPatients(data: SortAndFilterPatientVM): Observable<MainClass> {
    return this.httpClient.post<MainClass>(`${environment.listAllPatients}`,data, this.httpHeader);
  }



  GetPatientById(id: number): Observable<EditPatientVM> {
    return this.httpClient.get<EditPatientVM>(`${environment.getPatientById}${id}`, this.httpHeader);
  }



  CreatePatient(patientVM: CreatePatientVM): Observable<CreatePatientVM> {
    return this.httpClient.post<any>(`${environment.addPatient}`, patientVM, this.httpHeader);
  }

  CreatePatientAsUser(userObj: LoggedUser): Observable<any> {
    return this.httpClient.post<any>(`${environment.Register}`, userObj, this.httpHeader);
  }






  UpdatePatient(PatientVM: EditPatientVM): Observable<EditPatientVM> {
    return this.httpClient.put<EditPatientVM>(`${environment.editPatient}`, PatientVM, this.httpHeader);
  }

  DeletePatient(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.deletePatient}${id}`, this.httpHeader);
  }

  GenerateRequestNumber(): Observable<GeneratedPatientNumberVM> {
    return this.httpClient.get<GeneratedPatientNumberVM>(`${environment.generatePatientNumber}`, this.httpHeader);
  }
}
