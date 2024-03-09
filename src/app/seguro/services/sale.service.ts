import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { InsuranceSale } from '../interfaces/insuranceSale';
import { ConsultSales } from '../interfaces/consultSales';
import { environment } from 'environment';
import { BaseService } from 'src/app/shared/common/baseService';

@Injectable({
  providedIn: 'root',
})
export class SaleService extends BaseService {
  url: string = `${environment.apiUrl}/VentaSeguro`;

  constructor(private http: HttpClient) {
    super();
  }

  getSales(): Observable<ConsultSales> {
    return this.http.get<ConsultSales>(this.url, this.getHttpOptions()).pipe(
      map((sales) => sales),
      catchError(() => of())
    );
  }

  addSales(sale: InsuranceSale): Observable<InsuranceSale> {
    return this.http
      .post<InsuranceSale>(this.url, sale, this.getHttpOptions())
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of(error.error);
        })
      );
  }

  editSales(id: number, sale: InsuranceSale): Observable<InsuranceSale> {
    const urls = `${this.url}/${id}`;

    return this.http.put<InsuranceSale>(urls, sale, this.getHttpOptions()).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error);
      })
    );
  }
}
