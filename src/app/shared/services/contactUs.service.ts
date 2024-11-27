import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateContactUsVM } from '../models/contactUsVM';

@Injectable({
    providedIn: 'root'
})

export class ContactUsService {
    constructor(private httpClient: HttpClient) { }

    httpHeader = {
        headers: new HttpHeaders({
            'content-type': 'application/json',
            'Accept': '*/*'

        })
    };

    CreateContactUs(contactObj: CreateContactUsVM): Observable<any> {
        return this.httpClient.post<any>(`${environment.CreateContactUs}`, contactObj, this.httpHeader);
    }
}