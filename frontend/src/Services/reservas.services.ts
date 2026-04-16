import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservaDTO } from '../models/libro.dto';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getReservasByUsuario(usuarioId: number): Observable<ReservaDTO[]> {
    return this.http.get<ReservaDTO[]>(`${this.apiUrl}/reservas?usuarioId=${usuarioId}`);
  }

  crearReserva(reserva: { libro_id: number; usuario_id: number }): Observable<ReservaDTO> {
    return this.http.post<ReservaDTO>(`${this.apiUrl}/reservas`, reserva);
  }

  cancelarReserva(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservas/${id}/cancelar`, {});
  }

  devolverLibro(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservas/${id}/devolver`, {});
  }
}