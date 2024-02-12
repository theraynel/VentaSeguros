import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Billing } from '../interfaces/billings';


const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  url: string = 'https://localhost:44330/api/Facturacion';

  constructor( private http: HttpClient) { }

  getBillings(): Observable<Billing> {
    return this.http.get<Billing>(this.url).pipe(
      map((billing) => billing),
      catchError(() => of())
    );
  }
}
