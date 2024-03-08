import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginUsers } from '../interfaces/loginUser';
import { LoginUsersDTO } from '../interfaces/loginUserDTO';
import { environment } from 'environment';
import { RegisterDTO } from '../interfaces/registerDTO';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private http: HttpClient) {}

  register(user: Users): Observable<RegisterDTO> {
    const url: string = `${environment.apiUrl}${'/Users/registro'}`;

    return this.http.post<RegisterDTO>(url, user, httpOption).pipe(
      map((sales) => sales),
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  login(login: LoginUsers): Observable<LoginUsersDTO> {
    const url: string = `${environment.apiUrl}${'/Users/login'}`;
    return this.http.post<LoginUsers>(url, login, httpOption).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }
}
