import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {
  private signUpUrl: string;

  clearLocalStorage(): void {
    localStorage.removeItem('token');
  }

  constructor(private http: HttpClient) {
    this.signUpUrl = 'http://localhost:8080/register';
  }

  public signUp(signUpData: {}) {
    return this.http.post<any>(this.signUpUrl, signUpData);
  }
}
