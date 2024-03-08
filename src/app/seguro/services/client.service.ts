import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as ObservableThrowError, of, catchError, map, throwError } from 'rxjs';
import { Clients } from '../interfaces/clients';
import { environment } from 'environment';
// import { catchError } from 'rxjs/operators';


const httpOption = {
  headers: new HttpHeaders({
      'Contend-Type': 'aplication/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url:string = `${environment.apiUrl}/Cliente`

  constructor( private http: HttpClient ) { }

  getClients(): Observable<Clients>{
    return this.http.get<Clients>(this.url)
                    .pipe(
                       map( clientes => clientes),
                       catchError( () => of())
                    );
  }

  addClient(client: Clients):Observable<Clients>{
    return this.http.post<Clients>(this.url, client, httpOption)
    .pipe(
      catchError((error: HttpErrorResponse) => {
         return of(error.error)
      })
    )
  }

  editClient(id: number, client: Clients):Observable<Clients>{
    return this.http.put<Clients>(`${this.url}/${id}`, client, httpOption)
    .pipe(
      catchError((error: HttpErrorResponse) =>{
        return of(error.error)
      })
    );
  }

  deleteClient(id: number): Observable<Clients>{
    return this.http.delete<Clients>(`${this.url}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error)
      })
    )
    ;
  }


}
