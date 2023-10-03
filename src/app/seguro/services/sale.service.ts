import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { InsuranceSale } from '../interfaces/insuranceSale';
import { ConsultSales } from '../interfaces/consultSales';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  url: string = 'https://localhost:44330/api/VentaSeguro';

  constructor(private http: HttpClient) {}

  getSales(): Observable<ConsultSales> {
    return this.http.get<ConsultSales>(this.url).pipe(
      map((sales) => sales),
      catchError(() => of())
    );
  }

  addSales(sale: InsuranceSale): Observable<InsuranceSale> {
    return this.http.post<InsuranceSale>(this.url, sale, httpOption);
  }

  editSales(id: number, sale: InsuranceSale): Observable<InsuranceSale> {
    console.log("Id and Sale recibido", id, sale);
    const urls = `${this.url}/${id}`;

    console.log(urls);


    return this.http.put<InsuranceSale>(urls, sale, httpOption);
  }
}
