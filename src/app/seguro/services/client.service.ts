import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as ObservableThrowError, of, catchError, map, throwError } from 'rxjs';
import { Clients } from '../interfaces/clients';
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

  url:string = 'https://localhost:44330/api/Cliente'

  constructor( private http: HttpClient ) { }

  getClients(): Observable<Clients>{
    return this.http.get<Clients>(this.url)
                    .pipe(
                       map( clientes => clientes),
                       catchError( () => of())
                    );
  }

  addClient(client: Clients):Observable<Clients>{
    return this.http
               .post<Clients>(this.url, client, httpOption);
  }

  editClient(id: number, client: Clients):Observable<Clients>{
    return this.http.put<Clients>(`${this.url}/${id}`, client, httpOption);
  }

  deleteClient(id: number): Observable<Clients>{
    return this.http.delete<Clients>(`${this.url}/${id}`);
  }


}
