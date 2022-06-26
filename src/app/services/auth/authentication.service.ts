import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/auth/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private requestUrl = 'http://localhost:8080/authenticate';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }  

  authenticate(email: string, password: string): Observable<any> {  
    return this.http.post<User>(this.requestUrl, {email, password});
  }

  // TODO: userDetails to client
  // getStatus(): Observable<User> {
  //   const url = `${this.BASE_URL}/status`;
  //   return this.http.get<User>(url);
  // }
}

