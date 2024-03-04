import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { Observable, catchError, of } from 'rxjs';
import { LoginUsers } from '../interfaces/loginUser';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url: string = 'https://localhost:44330/api/Users';
  public isLoggedIn : boolean = false;

  constructor(private http: HttpClient) {}

  register(user: Users): Observable<Users> {
    return this.http.post<Users>(this.url, user, httpOption).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  login(login: LoginUsers): Observable<any>{

    const url1: string = `${this.url}${'/login'}`;

    console.log("Data", login);

    console.log("url",url1);

    return this.http.post<LoginUsers>(url1, login, httpOption).pipe(
      catchError((error: HttpErrorResponse) => {
         return of(error.error);
      })
    );
  }

}
