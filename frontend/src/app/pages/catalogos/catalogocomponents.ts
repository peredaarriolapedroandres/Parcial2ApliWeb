import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../../services/libro.service';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { LibroDTO } from '../../models/libro.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, OnDestroy {
  libros: LibroDTO[] = [];
  reservaForm: FormGroup;
  selectedLibro: LibroDTO | null = null;
  showReservaModal = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private libroService: LibroService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.reservaForm = this.fb.group({
      libro_id: ['', Validators.required],
      usuario_id: [this.authService.getUserId()]
    });
  }

  ngOnInit(): void {
    this.cargarLibrosDisponibles();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  cargarLibrosDisponibles(): void {
    this.subscriptions.add(
      this.libroService.getLibrosDisponibles().subscribe({
        next: (data) => {
          this.libros = data;
        },
        error: (error) => {
          console.error('Error al cargar libros:', error);
        }
      })
    );
  }

  abrirModalReserva(libro: LibroDTO): void {
    this.selectedLibro = libro;
    this.reservaForm.patchValue({ libro_id: libro.id });
    this.showReservaModal = true;
  }

  cerrarModal(): void {
    this.showReservaModal = false;
    this.selectedLibro = null;
    this.reservaForm.reset({ usuario_id: this.authService.getUserId() });
  }

  reservar(): void {
    if (this.reservaForm.valid) {
      this.subscriptions.add(
        this.reservaService.crearReserva(this.reservaForm.value).subscribe({
          next: () => {
            alert('✅ Libro reservado exitosamente');
            this.cerrarModal();
            this.cargarLibrosDisponibles();
          },
          error: (error) => {
            alert('❌ Error al reservar: ' + (error.error?.error || 'Intente nuevamente'));
          }
        })
      );
    }
  }

  logout(): void {
    this.authService.logout();
  }
}