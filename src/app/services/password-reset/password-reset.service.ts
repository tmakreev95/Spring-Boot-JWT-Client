import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private resetPasswordRequestUrl = "http://localhost:8080/password-reset";
  private resetPasswordValidateTokenUrl = "http://localhost:8080/password-reset/verify-token";
  private resetPasswordSaveRequestUrl = "http://localhost:8080/password-reset/verify-token/save-password";
  
  constructor(private http: HttpClient) {}

  public sendPasswordResetRequest(email: string) {
    return this.http.post<any>(this.resetPasswordRequestUrl,  { email } );
  }

  public resetPasswordRequest(token: string, password: string) {
    return this.http.post<any>(this.resetPasswordSaveRequestUrl,  { token, password } );
  }

  public resetPasswordValidateToken(token: string) {
    return this.http.post<any>(this.resetPasswordValidateTokenUrl,  { token } );
  }
}
