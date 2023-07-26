import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clients } from '../interfaces/clients';

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

  constructor( private http: HttpClient) { }

  getClients(): Observable<Clients>{
    return this.http.get<Clients>(this.url);
  }

  addClient(client: Clients):Observable<Clients>{
    return this.http.post<Clients>(this.url, client, httpOption);
  }

  editClient(id: number, client: Clients):Observable<Clients>{
    return this.http.put<Clients>(`${this.url}/${id}`, client, httpOption);
  }

  deleteClient(id: number): Observable<Clients>{
    return this.http.delete<Clients>(`${this.url}/${id}`);
  }
}
