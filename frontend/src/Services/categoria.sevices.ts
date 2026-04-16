import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaDTO } from '../models/libro.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${this.apiUrl}/categorias`);
  }

  crearCategoria(categoria: Partial<CategoriaDTO>): Observable<CategoriaDTO> {
    return this.http.post<CategoriaDTO>(`${this.apiUrl}/categorias`, categoria);
  }

  actualizarCategoria(id: number, categoria: Partial<CategoriaDTO>): Observable<CategoriaDTO> {
    return this.http.put<CategoriaDTO>(`${this.apiUrl}/categorias/${id}`, categoria);
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categorias/${id}`);
  }
}