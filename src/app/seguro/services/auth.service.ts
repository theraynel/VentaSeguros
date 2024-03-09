import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    const currentUser = sessionStorage.getItem('currentUser');
    return currentUser !== null && !this.isTokenExpired(JSON.parse((currentUser)).token);
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
  }
}
