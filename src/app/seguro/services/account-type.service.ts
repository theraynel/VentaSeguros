import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountTypes } from '../interfaces/accountTypes';
import { environment } from 'environment';
import { BaseService } from 'src/app/shared/common/baseService';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService extends BaseService {
  url: string = `${environment.apiUrl}/TipoCuenta`;

  constructor(private _http: HttpClient) {
    super();
  }

  getAccountType(): Observable<AccountTypes> {
    return this._http.get<AccountTypes>(this.url, this.getHttpOptions()).pipe(
      map((account) => account),
      catchError(() => of())
    );
  }

  addAccountType(account: AccountTypes): Observable<AccountTypes> {
    return this._http
      .post<AccountTypes>(this.url, account, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }

  editAccountType(id: number, account: AccountTypes): Observable<AccountTypes> {
    return this._http
      .put<AccountTypes>(`${this.url}/${id}`, account, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }

  deleteAccountType(id: number): Observable<AccountTypes> {
    return this._http
      .delete<AccountTypes>(`${this.url}/${id}`, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }
}
