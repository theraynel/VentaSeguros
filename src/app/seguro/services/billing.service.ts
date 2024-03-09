import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Billing } from '../interfaces/billings';
import { ConsultSales } from '../interfaces/consultSales';
import { environment } from 'environment';
import { BaseService } from 'src/app/shared/common/baseService';

@Injectable({
  providedIn: 'root',
})
export class BillingService extends BaseService {
  url: string = `${environment.apiUrl}/Facturacion`;

  constructor(private http: HttpClient) {
    super();
  }

  getBillings(): Observable<Billing> {
    return this.http.get<Billing>(this.url, this.getHttpOptions()).pipe(
      map((billing) => billing),
      catchError(() => of())
    );
  }

  addBilling(sale: ConsultSales) {
    return this.http
      .post<ConsultSales>(this.url, sale, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }

  editBilling(id: number, sale: Billing): Observable<Billing> {
    const urls = `${this.url}/${id}`;

    return this.http.put<Billing>(urls, sale, this.getHttpOptions()).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }
}
