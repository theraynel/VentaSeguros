import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as ObservableThrowError, of, catchError, map, throwError } from 'rxjs';
import { Clients } from '../interfaces/clients';
import { environment } from 'environment';
import { BaseService } from 'src/app/shared/common/baseService';


@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService {

  url:string = `${environment.apiUrl}/Cliente`

  constructor( private http: HttpClient) {
    super();
  }

  getClients(): Observable<Clients>{
    return this.http.get<Clients>(this.url, this.getHttpOptions())
                    .pipe(
                       map( clientes => clientes),
                       catchError( () => of())
                    );
  }

  addClient(client: Clients):Observable<Clients>{
    return this.http.post<Clients>(this.url, client, this.getHttpOptions())
    .pipe(
      catchError((error: HttpErrorResponse) => {
         return of(error.error)
      })
    )
  }

  editClient(id: number, client: Clients):Observable<Clients>{
    return this.http.put<Clients>(`${this.url}/${id}`, client, this.getHttpOptions())
    .pipe(
      catchError((error: HttpErrorResponse) =>{
        return of(error.error)
      })
    );
  }

  deleteClient(id: number): Observable<Clients>{
    return this.http.delete<Clients>(`${this.url}/${id}`, this.getHttpOptions())
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error)
      })
    )
    ;
  }


}
