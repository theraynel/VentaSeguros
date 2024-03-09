import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor() {}

  // Método para obtener las opciones HTTP con el token incluido en el encabezado
  getHttpOptions() {
    const currentUser = sessionStorage.getItem('currentUser');

    const token = currentUser?.length ? JSON.parse(currentUser).token : null;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return { headers };
  }
}
