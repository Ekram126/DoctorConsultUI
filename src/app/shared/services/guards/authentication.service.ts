import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoggedUser, User } from '../../models/userVM';
import { jwtDecode } from 'jwt-decode';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    loggingUserObj: User;
    httpHeader = new HttpHeaders({
        'Accept': '*/*'
    });
    userData: any = new BehaviorSubject(null);
    private currentUserSubject: BehaviorSubject<LoggedUser>;
    public currentUser: Observable<LoggedUser>;
    public loggedUserCookie: Observable<LoggedUser>;
    lstRoleNames: string[] = [];
    cookieValue: string = "";
    public userName: string;
    private isLoggedIn = false;
    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<LoggedUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): LoggedUser {
        return this.currentUserSubject.value;
    }

    login(userObj: User): Observable<LoggedUser> {
        return this.http.post<LoggedUser>(`${environment.Login}`, userObj, { headers: this.httpHeader })
            .pipe(map(user => {
                localStorage.setItem('lang', "en");
                localStorage.setItem('dir', "ltr");
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
                this.currentUser["roleNames"].forEach(element => {
                    this.lstRoleNames.push(element["name"]);
                });
                this.isLoggedIn = true;
                return user;
            }));
    }
    saveUserData() {
        let token = JSON.stringify(localStorage.getItem("userToken"));
        let decode = jwtDecode(token);
        this.userData.next(decode);
    }
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.userName = "";
        this.currentUserSubject.next(null);
        localStorage.setItem('lang', "en");
        localStorage.setItem('dir', "ltr");
        this.isLoggedIn = false;
        this.router.navigate(['/']);
    }
    addPatient() {
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.userName = "";
        this.currentUserSubject.next(null);
        localStorage.setItem('lang', "en");
        localStorage.setItem('dir', "ltr");
        this.isLoggedIn = false;
    }


    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }

    deleteUser(userId: string): Observable<any> {
        const url = `${environment.DeleteUser}/${userId}`;
        return this.http.delete<any>(url);
      }
}