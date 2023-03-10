import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
//import { User } from './../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/user';

  getAll() {
    return this.http.get(this.apiUrl);
  }
  getAllRole() {
    return this.http.get('http://localhost:3000/role');
  }
  getByCode(code: any) {
    return this.http.get(this.apiUrl + '/' + code);
  }
  proceedRegister(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }
  updateUser(id: any, inputData: any) {
    return this.http.put(this.apiUrl + '/' + id, inputData);
  }
  isLoggedIn() {
    return sessionStorage.getItem('userName') != null;
  }
  getUserRole() {
    return sessionStorage.getItem('userRole') != null
      ? sessionStorage.getItem('userRole')?.toString()
      : '';
  }
}
