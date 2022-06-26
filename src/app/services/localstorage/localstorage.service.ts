import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  constructor() { }

  public clearToken() {
    localStorage.removeItem('token');
  }
}
