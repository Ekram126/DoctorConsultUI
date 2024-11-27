import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListUserVM, LoggedUser, User } from '../models/userVM';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpHeader = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'Accept': '*/*'

    })
  };

  private currentUserSubject: BehaviorSubject<LoggedUser>;
  public currentUser: Observable<LoggedUser>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoggedUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }



  public get currentUserValue(): LoggedUser {
    return this.currentUserSubject.value;
  }


  login(loggedUserObj: User): Observable<LoggedUser> {
    return this.httpClient.post<LoggedUser>(`${environment.Login}`, loggedUserObj, this.httpHeader)
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }



  
  listOfRegisteredDoctors(): Observable<ListUserVM[]> {
    return this.httpClient.get<ListUserVM[]>(`${environment.listOfRegisteredDoctors}`, this.httpHeader);
  }

    
  listOfRegisteredSupervisorDoctors(): Observable<ListUserVM[]> {
    return this.httpClient.get<ListUserVM[]>(`${environment.listOfRegisteredSupervisorDoctors}`, this.httpHeader);
  }



  listOfRegisteredDoctorsBySpecialityId(specialityId:number): Observable<ListUserVM[]> {
    return this.httpClient.get<ListUserVM[]>(`${environment.listOfRegisteredDoctorsBySpecialityId}${specialityId}`, this.httpHeader);
  }

    
  listOfRegisteredSupervisorDoctorsBySpecialityId(specialityId:number): Observable<ListUserVM[]> {
    return this.httpClient.get<ListUserVM[]>(`${environment.listOfRegisteredSupervisorDoctorsBySpecialityId}${specialityId}`, this.httpHeader);
  }
}


