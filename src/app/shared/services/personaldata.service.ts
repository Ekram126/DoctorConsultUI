import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonalDataVM } from '../models/personaldataVM';

@Injectable({
    providedIn: 'root'
})

export class PersonalDataService {
    constructor(private httpClient: HttpClient) { }

    httpHeader = {
        headers: new HttpHeaders({
            'content-type': 'application/json',
            'Accept': '*/*'

        })
    };

    GetPersonalData(): Observable<PersonalDataVM> {
        return this.httpClient.get<PersonalDataVM>(`${environment.getPersonalData}`,  this.httpHeader);
    }
}