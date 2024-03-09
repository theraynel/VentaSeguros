import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Plans } from '../interfaces/plans';
import { environment } from 'environment';
import { BaseService } from 'src/app/shared/common/baseService';

@Injectable({
  providedIn: 'root',
})
export class PlansService extends BaseService {
  url: string = `${environment.apiUrl}/planes`;

  constructor(private _http: HttpClient) {
    super();
  }

  getPlans(): Observable<Plans> {
    return this._http.get<Plans>(this.url, this.getHttpOptions()).pipe(
      map((plan) => plan),
      catchError(() => of())
    );
  }

  addPlan(plan: Plans): Observable<Plans> {
    return this._http.post<Plans>(this.url, plan, this.getHttpOptions()).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }

  editPlan(id: number, plan: Plans): Observable<Plans> {
    return this._http
      .put<Plans>(`${this.url}/${id}`, plan, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }

  deletePlan(id: number): Observable<Plans> {
    return this._http
      .delete<Plans>(`${this.url}/${id}`, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }
}
