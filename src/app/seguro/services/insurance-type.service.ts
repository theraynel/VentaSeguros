import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InsuranceTypes } from '../interfaces/insuranceTypes';
import { environment } from 'environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Contend-Type': 'aplication/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InsuranceTypeService {

  url: string = `${environment.apiUrl}/TipoSeguro`;

  constructor( private _http: HttpClient) { }

  getInsurenceType() : Observable<InsuranceTypes>{
     return this._http.get<InsuranceTypes>(this.url);
  }

  addInsuranceType(type: InsuranceTypes) : Observable<InsuranceTypes>{
    return this._http.post<InsuranceTypes>(this.url, type, httpOptions);
  }

  editInsuranceType(id: number, type: InsuranceTypes): Observable<InsuranceTypes> {
     return this._http.put<InsuranceTypes>(`${this.url}/${id}`, type, httpOptions);
  }

  deleteInsuranceType(id: number):Observable<InsuranceTypes>{
    return this._http.delete<InsuranceTypes>(`${this.url}/${id}`);
  }
}
