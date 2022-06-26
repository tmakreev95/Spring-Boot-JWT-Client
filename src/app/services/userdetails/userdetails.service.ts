import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';


import { HttpClient } from '@angular/common/http';

import { UserDetails } from '../../model/userdetails/userdetails';
import { Address } from '../../model/userdetails/address/address';
import { Contact } from '../../model/userdetails/contact/contact';
import { User } from '../../model/auth/user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private requestUrl = 'http://localhost:8080/user/profile';
  private requestAddressUrl = 'http://localhost:8080/user/profile/address';
  private requestContactUrl = 'http://localhost:8080/user/profile/contact';
  private updateUserDetailsUrl = 'http://localhost:8080/user/profile/update';
  private registerAddressUrl = 'http://localhost:8080/user/profile/register/address';
  private registerContactUrl = 'http://localhost:8080/user/profile/register/contact';
  private checkUserDetailsRequestUrl = "http://localhost:8080/user/role";

  constructor(private http: HttpClient) { }

  getUserDetails(): Observable<any> {  
    return this.http.post<UserDetails>(this.requestUrl, {});
  }

  getUserAddress(): Observable<any> {  
    return this.http.post<Address>(this.requestAddressUrl, {});
  }
  getUserContact(): Observable<any> {  
    return this.http.post<Contact>(this.requestContactUrl, {});
  }

  updateUserDetails(userDetailsForUpdate: {}) {
    return this.http.put<any>(this.updateUserDetailsUrl, userDetailsForUpdate);
  }

  registerAddress(address: Address) {
    return this.http.post<any>(this.registerAddressUrl, address);
  }

  registerContact(contact: Contact) {
    return this.http.post<any>(this.registerContactUrl, contact);
  }

  checkUserDetails(): Observable<User> {
    return this.http.post<any>(this.checkUserDetailsRequestUrl, {});
  }
  
}
