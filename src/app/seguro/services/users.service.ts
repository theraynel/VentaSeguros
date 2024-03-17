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
import { ChangePassword } from '../interfaces/changerPassword';
import { BaseService } from 'src/app/shared/common/baseService';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {

  constructor(private http: HttpClient) {
    super();
   }

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

  forgotPassword(email: string): Observable<LoginUsersDTO> {
    const url: string = `${environment.apiUrl}${'/Users/ForgotPassword'}`;
    return this.http.post<string>(`${url}${"?email="}${email} `, httpOption).pipe(
      map((res) => res),
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  changerPassword(changer: ChangePassword): Observable<LoginUsersDTO> {
    const url: string = `${environment.apiUrl}${'/Users/ChangePassword'}`;

    return this.http.post<ChangePassword>(url, changer, httpOption).pipe(
      map((res) => res),
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    )

  }
}
