import { Component, OnInit } from '@angular/core';

interface ReservaSimulada {
  id: number;
  tituloLibro: string;
  estado: string;
}

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html'
})
export class MisReservasComponent implements OnInit {

  reservas: ReservaSimulada[] = [];

  ngOnInit(): void {
    // Datos simulados aceptados en el examen
    this.reservas = [
      { id: 1, tituloLibro: 'Clean Architecture', estado: 'RESERVADO' },
      { id: 2, tituloLibro: 'Node.js Essentials', estado: 'RESERVADO' }
    ];
  }

  cancelarReserva(id: number) {
    alert(`Reserva ${id} cancelada (simulado)`);
  }

  devolverLibro(id: number) {
    alert(`Libro de la reserva ${id} devuelto (simulado)`);
  }
}