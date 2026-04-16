import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../interfaces/libro.interface';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {
  libros: Libro[] = [];

  constructor(private librosService: LibrosService) {}

  ngOnInit() {
    this.librosService.obtenerDisponibles()
      .subscribe(data => this.libros = data);
  }
}