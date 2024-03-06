import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { Observable, catchError, of } from 'rxjs';
import { LoginUsers } from '../interfaces/loginUser';
import { LoginUsersDTO } from '../interfaces/loginUserDTO';
import { environment } from 'environment';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  register(user: Users): Observable<Users> {
    const url: string = `${environment.apiUrl}${'/Users/registro'}`;

    return this.http.post<Users>(url, user, httpOption).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  login(login: LoginUsers): Observable<LoginUsersDTO> {
    const url: string = `${environment.apiUrl}${'/Users/login'}`;

    console.log('Data', login);

    return this.http.post<LoginUsers>(url, login, httpOption).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }
}
