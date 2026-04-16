import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libro.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LibrosService {
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  obtenerDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.api}/libros/disponibles`);
  }
}