import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountTypes } from '../interfaces/accountTypes';
import { environment } from 'environment';

const httpOption = {
  headers: new HttpHeaders({
      'Contend-Type': 'aplication/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  url: string = `${environment.apiUrl}/TipoCuenta`;

  constructor( private _http: HttpClient) { }

  getAccountType(): Observable<AccountTypes>{
    return this._http.get<AccountTypes>(this.url);
  }

  addAccountType(account: AccountTypes): Observable<AccountTypes>{
     return this._http.post<AccountTypes>(this.url, account, httpOption);
  }

  editAccountType(id: number, account: AccountTypes): Observable<AccountTypes>{
    return this._http.put<AccountTypes>(`${this.url}/${id}`, account, httpOption);
  }

  deleteAccountType(id: number):Observable<AccountTypes>{
    return this._http.delete<AccountTypes>(`${this.url}/${id}`);
  }
}
