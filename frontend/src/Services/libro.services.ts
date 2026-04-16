import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LibroDTO } from '../models/libro.dto';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getLibros(): Observable<LibroDTO[]> {
    return this.http.get<LibroDTO[]>(`${this.apiUrl}/libros`);
  }

  getLibrosDisponibles(): Observable<LibroDTO[]> {
    return this.http.get<LibroDTO[]>(`${this.apiUrl}/libros/disponibles`);
  }

  getLibroById(id: number): Observable<LibroDTO> {
    return this.http.get<LibroDTO>(`${this.apiUrl}/libros/${id}`);
  }

  crearLibro(libro: Partial<LibroDTO>): Observable<LibroDTO> {
    return this.http.post<LibroDTO>(`${this.apiUrl}/libros`, libro);
  }

  actualizarLibro(id: number, libro: Partial<LibroDTO>): Observable<LibroDTO> {
    return this.http.put<LibroDTO>(`${this.apiUrl}/libros/${id}`, libro);
  }

  eliminarLibro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/libros/${id}`);
  }
}