import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { Plans } from '../interfaces/plans';

const httpOption = {
  headers: new HttpHeaders({
      'Contend-Type': 'aplication/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  url: string = 'https://localhost:44330/api/planes';

  constructor( private _http : HttpClient ) { }

  getPlans(): Observable<Plans>{
     return this._http.get<Plans>(this.url);
  }

  addPlan(plan: Plans): Observable<Plans>{
    return this._http.post<Plans>(this.url, plan, httpOption)
  }
}
