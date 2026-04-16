export interface LibroDTO {
  id: number;
  titulo: string;
  isbn: string | null;
  anio_publicacion: number | null;
  categoria_id: number;
}

export interface ReservaDTO {
  id: number;
  libro_id: number;
  usuario_id: number;
  fecha_reserva: Date;
  fecha_devolucion: Date | null;
  estado: string;
  Libro?: LibroDTO;
}

export interface CategoriaDTO {
  id: number;
  nombre: string;
  descripcion: string | null;
}

export interface UsuarioDTO {
  id: number;
  nombre: string;
  email: string;
}