import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { ReservaDTO } from '../../models/libro.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit, OnDestroy {
  reservas: ReservaDTO[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarReservas();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  cargarReservas(): void {
    const usuarioId = this.authService.getUserId();
    this.subscriptions.add(
      this.reservaService.getReservasByUsuario(usuarioId).subscribe({
        next: (data) => {
          this.reservas = data;
        },
        error: (error) => {
          console.error('Error al cargar reservas:', error);
        }
      })
    );
  }

  cancelarReserva(id: number): void {
    if (confirm('¿Estás seguro de cancelar esta reserva?')) {
      this.subscriptions.add(
        this.reservaService.cancelarReserva(id).subscribe({
          next: () => {
            alert('✅ Reserva cancelada exitosamente');
            this.cargarReservas();
          },
          error: (error) => {
            alert('❌ Error al cancelar: ' + (error.error?.error || 'Intente nuevamente'));
          }
        })
      );
    }
  }

  devolverLibro(id: number): void {
    if (confirm('¿Estás seguro de devolver este libro?')) {
      this.subscriptions.add(
        this.reservaService.devolverLibro(id).subscribe({
          next: () => {
            alert('✅ Libro devuelto exitosamente');
            this.cargarReservas();
          },
          error: (error) => {
            alert('❌ Error al devolver: ' + (error.error?.error || 'Intente nuevamente'));
          }
        })
      );
    }
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'ACTIVA': return 'primary';
      case 'DEVUELTA': return 'accent';
      case 'CANCELADA': return 'warn';
      default: return '';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}