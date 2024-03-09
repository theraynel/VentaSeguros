import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceTypes } from '../interfaces/insuranceTypes';
import { environment } from 'environment';
import { BaseService } from 'src/app/shared/common/baseService';

@Injectable({
  providedIn: 'root',
})
export class InsuranceTypeService extends BaseService {
  url: string = `${environment.apiUrl}/TipoSeguro`;

  constructor(private _http: HttpClient) {
    super();
  }

  getInsurenceType(): Observable<InsuranceTypes> {
    return this._http.get<InsuranceTypes>(this.url, this.getHttpOptions()).pipe(
      map((type) => type),
      catchError(() => of())
    );
  }

  addInsuranceType(type: InsuranceTypes): Observable<InsuranceTypes> {
    return this._http
      .post<InsuranceTypes>(this.url, type, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }

  editInsuranceType(
    id: number,
    type: InsuranceTypes
  ): Observable<InsuranceTypes> {
    return this._http
      .put<InsuranceTypes>(`${this.url}/${id}`, type, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }

  deleteInsuranceType(id: number): Observable<InsuranceTypes> {
    return this._http
      .delete<InsuranceTypes>(`${this.url}/${id}`, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }
}
