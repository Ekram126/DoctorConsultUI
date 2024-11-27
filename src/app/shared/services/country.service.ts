import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListCountryVM } from '../models/countryVM';



@Injectable({
  providedIn: 'root'
})

export class CountryService {
  constructor(private httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };

  private httpHeader2 = new HttpHeaders({ 'Content-Type': 'application/json' });

  GetCountries(): Observable<ListCountryVM[]> {
    return this.httpClient.get<ListCountryVM[]>(`${environment.listAllCountries}`, this.httpHeader);
  }
  
  // GetPhoneCodeByCountryId(countryId:number): Observable<any> {
  //   return this.httpClient.get<any>(`${environment.GetPhoneCodeByCountryId}${countryId}`, this.httpHeader);
  // }


  
  GetPhoneCodeByCountryId(countryId: number): Observable<string> {
    return this.httpClient.get(`${environment.GetPhoneCodeByCountryId}${countryId}`, {
      responseType: 'text' // Expecting a plain text response
    }) as Observable<string>; // Casting to Observable<string>
  }

  
}
