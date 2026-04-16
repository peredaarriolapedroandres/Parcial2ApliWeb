import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReservasService {
  private api = 'http://localhost:3000/api';

  reservar(libroId: number) {
    return this.http.post(`${this.api}/reservas`, {
      libro_id: libroId,
      usuario_id: 1
    });
  }
}